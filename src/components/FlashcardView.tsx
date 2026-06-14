import { useEffect, useState } from 'react';
import type { Grade, ReviewState, StudyItem } from '../types';
import { SpeakButton } from './SpeakButton';
import { createInitialState, nextIntervalLabel } from '../lib/srs';

interface Props {
  item: StudyItem;
  front: 'en' | 'ja';
  state?: ReviewState;
  onGrade: (grade: Grade) => void;
}

const RATINGS: { grade: Grade; label: string; color: string }[] = [
  { grade: 'again', label: 'もう一度', color: 'bg-rose-100 text-rose-700 hover:bg-rose-200' },
  { grade: 'hard', label: '難しい', color: 'bg-orange-100 text-orange-700 hover:bg-orange-200' },
  { grade: 'good', label: 'できた', color: 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200' },
  { grade: 'easy', label: '簡単', color: 'bg-sky-100 text-sky-700 hover:bg-sky-200' },
];

/** フラッシュカード：タップで反転し、4段階で自己評価（能動的想起＋SRS） */
export function FlashcardView({ item, front, state, onGrade }: Props) {
  const [flipped, setFlipped] = useState(false);

  // 項目が変わったら裏返しをリセット
  useEffect(() => setFlipped(false), [item.id]);

  const baseState = state ?? createInitialState(item.id);
  const frontText = front === 'en' ? item.en : item.ja;
  const backText = front === 'en' ? item.ja : item.en;

  return (
    <div className="space-y-4">
      <button
        type="button"
        onClick={() => setFlipped((f) => !f)}
        className="flip-card block h-64 w-full"
        aria-label="カードをめくる"
      >
        <div className={`flip-inner h-full w-full ${flipped ? 'is-flipped' : ''}`}>
          {/* 表 */}
          <div className="flip-face flex h-full w-full flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
            <span className="mb-2 rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
              {item.kind === 'word' ? '単語' : 'フレーズ'}
            </span>
            <p className="text-2xl font-bold text-slate-800">{frontText}</p>
            {front === 'en' && item.pron && (
              <p className="mt-1 text-sm text-slate-400">{item.pron}</p>
            )}
            <p className="mt-4 text-xs text-slate-400">タップで答えを表示</p>
          </div>
          {/* 裏 */}
          <div className="flip-face flip-back flex h-full w-full flex-col items-center justify-center rounded-2xl border border-brand-200 bg-brand-50 p-6 text-center shadow-sm">
            <p className="text-2xl font-bold text-brand-800">{backText}</p>
            {front === 'ja' && item.pron && (
              <p className="mt-1 text-sm text-brand-500">{item.pron}</p>
            )}
            {item.examples[0] && (
              <div className="mt-4 text-sm text-slate-600">
                <p>{item.examples[0].en}</p>
                <p className="text-slate-400">{item.examples[0].ja}</p>
              </div>
            )}
          </div>
        </div>
      </button>

      <div className="flex justify-center">
        <SpeakButton text={item.en} size="lg" />
      </div>

      {flipped ? (
        <div className="grid grid-cols-4 gap-2">
          {RATINGS.map((r) => (
            <button
              key={r.grade}
              onClick={() => onGrade(r.grade)}
              className={`flex flex-col items-center rounded-xl py-2.5 text-sm font-semibold transition active:scale-95 ${r.color}`}
            >
              {r.label}
              <span className="mt-0.5 text-[10px] font-normal opacity-70">
                {nextIntervalLabel(baseState, r.grade)}
              </span>
            </button>
          ))}
        </div>
      ) : (
        <button
          onClick={() => setFlipped(true)}
          className="w-full rounded-xl bg-brand-500 py-3 font-semibold text-white transition hover:bg-brand-600 active:scale-[0.99]"
        >
          答えを見る
        </button>
      )}
    </div>
  );
}
