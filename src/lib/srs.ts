// SM-2 ベースの間隔反復(SRS)アルゴリズム。
// 参考: SuperMemo SM-2。4段階評価(again/hard/good/easy)を品質スコアに対応させる。
import type { Grade, ReviewState } from '../types';

const DAY = 24 * 60 * 60 * 1000;
const MIN_EF = 1.3;
const DEFAULT_EF = 2.5;

/** 評価 → SM-2の品質スコア(0-5) */
const GRADE_QUALITY: Record<Grade, number> = {
  again: 2,
  hard: 3,
  good: 4,
  easy: 5,
};

/** 新規項目の初期状態を作る */
export function createInitialState(itemId: string, now = Date.now()): ReviewState {
  return {
    itemId,
    easeFactor: DEFAULT_EF,
    interval: 0,
    reps: 0,
    lapses: 0,
    dueDate: now,
    lastReviewed: 0,
  };
}

/**
 * 評価を反映して次の状態を返す（純粋関数）。
 * - again: 失敗扱い。間隔をリセットして当日中に再出題。
 * - hard/good/easy: 成功扱い。reps と interval を伸ばす。
 */
export function applyGrade(
  state: ReviewState,
  grade: Grade,
  now = Date.now(),
): ReviewState {
  const quality = GRADE_QUALITY[grade];

  // EF更新（SM-2の式）。下限1.3。
  let ef =
    state.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  if (ef < MIN_EF) ef = MIN_EF;

  if (grade === 'again') {
    return {
      ...state,
      easeFactor: ef,
      interval: 0,
      reps: 0,
      lapses: state.lapses + 1,
      // 10分後に再出題（同セッション内で復習）
      dueDate: now + 10 * 60 * 1000,
      lastReviewed: now,
    };
  }

  const reps = state.reps + 1;
  let interval: number;
  if (reps === 1) {
    interval = grade === 'easy' ? 2 : 1;
  } else if (reps === 2) {
    interval = grade === 'easy' ? 6 : grade === 'hard' ? 3 : 4;
  } else {
    const factor = grade === 'hard' ? 1.2 : ef;
    interval = Math.round(state.interval * factor);
    if (interval < 1) interval = 1;
  }

  return {
    ...state,
    easeFactor: ef,
    interval,
    reps,
    dueDate: now + interval * DAY,
    lastReviewed: now,
  };
}

/** 復習期限が到来しているか */
export function isDue(state: ReviewState, now = Date.now()): boolean {
  return state.dueDate <= now;
}

/** まだ一度も学習していないか */
export function isNew(state: ReviewState | undefined): boolean {
  return !state || state.reps === 0;
}

/** 習得済みとみなすか（intervalが一定以上） */
export function isMastered(state: ReviewState | undefined): boolean {
  return !!state && state.interval >= 21;
}

/** 各評価を選んだ場合、次回がいつになるかの目安ラベル（UI表示用） */
export function nextIntervalLabel(state: ReviewState, grade: Grade): string {
  const next = applyGrade(state, grade);
  if (grade === 'again') return '10分後';
  if (next.interval <= 1) return '1日後';
  if (next.interval < 30) return `${next.interval}日後`;
  const months = Math.round(next.interval / 30);
  return `約${months}ヶ月後`;
}
