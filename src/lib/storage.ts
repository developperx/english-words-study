// 学習進捗の永続化（localStorage）。サーバー不要・個人情報を収集しない。
import type { ReviewState } from '../types';

const PROGRESS_KEY = 'ews:progress:v1';
const STREAK_KEY = 'ews:streak:v1';
const SETTINGS_KEY = 'ews:settings:v1';

export type ProgressMap = Record<string, ReviewState>;

export interface StreakData {
  /** 連続学習日数 */
  current: number;
  /** 最高連続記録 */
  best: number;
  /** 最後に学習した日付（YYYY-MM-DD） */
  lastStudyDate: string | null;
  /** 学習した日付の合計 */
  totalDays: number;
}

export interface Settings {
  /** 読み上げ速度 */
  speechRate: number;
  /** 1セッションあたりの新規カード上限 */
  newPerSession: number;
}

const DEFAULT_SETTINGS: Settings = {
  speechRate: 0.9,
  newPerSession: 10,
};

const DEFAULT_STREAK: StreakData = {
  current: 0,
  best: 0,
  lastStudyDate: null,
  totalDays: 0,
};

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return { ...fallback, ...(JSON.parse(raw) as object) } as T;
  } catch {
    return fallback;
  }
}

export function loadProgress(): ProgressMap {
  if (typeof localStorage === 'undefined') return {};
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) ?? '{}') as ProgressMap;
  } catch {
    return {};
  }
}

export function saveProgress(map: ProgressMap): void {
  localStorage.setItem(PROGRESS_KEY, JSON.stringify(map));
}

export function loadStreak(): StreakData {
  return safeParse(localStorage.getItem(STREAK_KEY), DEFAULT_STREAK);
}

export function saveStreak(data: StreakData): void {
  localStorage.setItem(STREAK_KEY, JSON.stringify(data));
}

export function loadSettings(): Settings {
  return safeParse(localStorage.getItem(SETTINGS_KEY), DEFAULT_SETTINGS);
}

export function saveSettings(data: Settings): void {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(data));
}

/** ローカル日付を YYYY-MM-DD で返す */
export function todayKey(now = new Date()): string {
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/** 学習イベントを記録してストリークを更新する */
export function registerStudyDay(streak: StreakData, now = new Date()): StreakData {
  const today = todayKey(now);
  if (streak.lastStudyDate === today) return streak; // 同日内は据え置き

  const yesterday = todayKey(new Date(now.getTime() - 24 * 60 * 60 * 1000));
  const current = streak.lastStudyDate === yesterday ? streak.current + 1 : 1;

  return {
    current,
    best: Math.max(streak.best, current),
    lastStudyDate: today,
    totalDays: streak.totalDays + 1,
  };
}

export function resetAllProgress(): void {
  localStorage.removeItem(PROGRESS_KEY);
  localStorage.removeItem(STREAK_KEY);
}
