import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStudyStore } from '../store/useStudyStore';
import { FlashcardView } from '../components/FlashcardView';
import { ProgressBar } from '../components/ProgressBar';
import type { Grade, StudyItem } from '../types';

/** 今日の復習：全ジャンル横断でSRS期限到来分をフラッシュカードで復習 */
export function Review() {
  const grade = useStudyStore((s) => s.grade);
  const getDueItems = useStudyStore((s) => s.getDueItems);
  const getState = useStudyStore((s) => s.getState);

  // マウント時の期限到来分を固定
  const initial = useMemo(() => getDueItems(), []); // eslint-disable-line react-hooks/exhaustive-deps
  const [queue, setQueue] = useState<StudyItem[]>(initial);
  const [done, setDone] = useState(0);

  const total = initial.length;
  const current = queue[0];

  function advance(item: StudyItem, g: Grade) {
    grade(item.id, g);
    setQueue((q) => {
      const rest = q.slice(1);
      return g === 'again' ? [...rest, item] : rest;
    });
    if (g !== 'again') setDone((n) => n + 1);
  }

  if (total === 0) {
    return (
      <div className="space-y-6 text-center">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="text-5xl">✨</div>
          <h1 className="mt-3 text-xl font-bold text-slate-800">復習はすべて完了！</h1>
          <p className="mt-2 text-sm text-slate-500">
            今は復習の時期が来た項目はありません。新しいシーンを学びましょう。
          </p>
        </div>
        <Link
          to="/genres"
          className="block rounded-xl bg-brand-500 py-3 font-semibold text-white"
        >
          新しく学習する
        </Link>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="space-y-6 text-center">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-8 text-white shadow-sm">
          <div className="text-5xl">🎉</div>
          <h1 className="mt-3 text-2xl font-bold">復習完了！</h1>
          <p className="mt-1 opacity-90">{total} 項目を復習しました。</p>
        </div>
        <Link
          to="/"
          className="block rounded-xl bg-brand-500 py-3 font-semibold text-white"
        >
          ホームへ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <h1 className="font-bold text-slate-800">🔁 今日の復習</h1>
        <div className="flex-1">
          <ProgressBar value={done} max={total} />
        </div>
        <span className="text-xs text-slate-400">
          {done}/{total}
        </span>
      </div>

      <FlashcardView
        item={current}
        front="en"
        state={getState(current.id)}
        onGrade={(g) => advance(current, g)}
      />
    </div>
  );
}
