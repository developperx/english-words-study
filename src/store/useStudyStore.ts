// 学習状態の中央ストア（Zustand）。進捗・ストリーク・設定を管理し localStorage に永続化する。
import { create } from 'zustand';
import type { Grade, ReviewState, StudyItem } from '../types';
import { applyGrade, createInitialState, isDue, isMastered } from '../lib/srs';
import {
  loadProgress,
  loadSettings,
  loadStreak,
  registerStudyDay,
  resetAllProgress,
  saveProgress,
  saveSettings,
  saveStreak,
  type ProgressMap,
  type Settings,
  type StreakData,
} from '../lib/storage';
import { getAllItems, itemIndex } from '../data/genres';

interface CategoryStats {
  total: number;
  studied: number;
  mastered: number;
  due: number;
}

interface StudyStore {
  progress: ProgressMap;
  streak: StreakData;
  settings: Settings;

  /** 項目を評価して進捗・ストリークを更新 */
  grade: (itemId: string, grade: Grade) => void;
  /** 指定項目の状態を取得（無ければundefined） */
  getState: (itemId: string) => ReviewState | undefined;
  /** 復習期限が来ている項目（全ジャンル横断） */
  getDueItems: () => StudyItem[];
  /** カテゴリ内の項目を、学習優先度順（未学習→期限到来→その他）に並べて返す */
  getStudyQueue: (items: StudyItem[]) => StudyItem[];
  /** カテゴリ統計 */
  getCategoryStats: (items: StudyItem[]) => CategoryStats;
  /** 全体統計 */
  getGlobalStats: () => CategoryStats;

  setSettings: (patch: Partial<Settings>) => void;
  resetProgress: () => void;
}

function computeStats(
  items: StudyItem[],
  progress: ProgressMap,
  now: number,
): CategoryStats {
  let studied = 0;
  let mastered = 0;
  let due = 0;
  for (const item of items) {
    const st = progress[item.id];
    if (st && st.reps > 0) studied += 1;
    if (isMastered(st)) mastered += 1;
    if (st && isDue(st, now)) due += 1;
  }
  return { total: items.length, studied, mastered, due };
}

export const useStudyStore = create<StudyStore>((set, get) => ({
  progress: loadProgress(),
  streak: loadStreak(),
  settings: loadSettings(),

  grade: (itemId, grade) => {
    const now = Date.now();
    set((state) => {
      const prev = state.progress[itemId] ?? createInitialState(itemId, now);
      const next = applyGrade(prev, grade, now);
      const progress = { ...state.progress, [itemId]: next };
      const streak = registerStudyDay(state.streak, new Date(now));
      saveProgress(progress);
      saveStreak(streak);
      return { progress, streak };
    });
  },

  getState: (itemId) => get().progress[itemId],

  getDueItems: () => {
    const now = Date.now();
    const { progress } = get();
    return getAllItems().filter((item) => {
      const st = progress[item.id];
      return st && st.reps >= 0 && isDue(st, now) && st.lastReviewed > 0;
    });
  },

  getStudyQueue: (items) => {
    const now = Date.now();
    const { progress } = get();
    const isNewItem = (i: StudyItem) => !progress[i.id] || progress[i.id].reps === 0;
    const isDueItem = (i: StudyItem) => {
      const st = progress[i.id];
      return !!st && st.reps > 0 && isDue(st, now);
    };
    const newItems = items.filter(isNewItem);
    const dueItems = items.filter(isDueItem);
    const rest = items.filter((i) => !isNewItem(i) && !isDueItem(i));
    return [...newItems, ...dueItems, ...rest];
  },

  getCategoryStats: (items) => computeStats(items, get().progress, Date.now()),

  getGlobalStats: () => computeStats(getAllItems(), get().progress, Date.now()),

  setSettings: (patch) => {
    set((state) => {
      const settings = { ...state.settings, ...patch };
      saveSettings(settings);
      return { settings };
    });
  },

  resetProgress: () => {
    resetAllProgress();
    set({ progress: {}, streak: loadStreak() });
  },
}));

// 未使用警告を避けつつ、IDマップを公開（他モジュールから参照可）。
export { itemIndex };
