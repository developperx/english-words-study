import { useEffect, useState } from 'react';
import type { StudyItem } from '../types';
import { SpeakButton } from './SpeakButton';

interface Props {
  item: StudyItem;
  /** 4択の選択肢（正解を含む、シャッフル済み） */
  options: StudyItem[];
  /** 出題方向: 'ja-to-en'=日本語を見て英語を選ぶ / 'en-to-ja'=英語を見て意味を選ぶ */
  direction: 'ja-to-en' | 'en-to-ja';
  onAnswer: (correct: boolean) => void;
}

/** 4択クイズ：選択肢から正解を選ぶ（即時フィードバック） */
export function QuizView({ item, options, direction, onAnswer }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => setSelected(null), [item.id]);

  const jaToEn = direction === 'ja-to-en';
  const prompt = jaToEn ? item.ja : item.en;
  const answered = selected !== null;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        <span className="mb-2 inline-block rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
          {jaToEn ? '英語を選ぼう' : '意味を選ぼう'}
        </span>
        <div className="flex items-center justify-center gap-2">
          <p className="text-xl font-bold text-slate-800">{prompt}</p>
          {!jaToEn && <SpeakButton text={item.en} size="sm" />}
        </div>
      </div>

      <div className="grid gap-2">
        {options.map((opt) => {
          const label = jaToEn ? opt.en : opt.ja;
          const isCorrect = opt.id === item.id;
          let style = 'border-slate-200 bg-white hover:border-brand-300';
          if (answered) {
            if (isCorrect) style = 'border-emerald-400 bg-emerald-50 text-emerald-800';
            else if (opt.id === selected) style = 'border-rose-300 bg-rose-50 text-rose-700';
            else style = 'border-slate-200 bg-white opacity-60';
          }
          return (
            <button
              key={opt.id}
              disabled={answered}
              onClick={() => {
                setSelected(opt.id);
                onAnswer(isCorrect);
              }}
              className={`rounded-xl border px-4 py-3 text-left font-medium transition active:scale-[0.99] ${style}`}
            >
              {label}
              {answered && isCorrect && <span className="ml-2">✓</span>}
            </button>
          );
        })}
      </div>

      {answered && (
        <div className="rounded-xl bg-slate-50 p-3 text-sm text-slate-600">
          <p className="font-semibold text-slate-700">
            {item.en} — {item.ja}
          </p>
          {item.examples[0] && (
            <p className="mt-1 text-slate-500">{item.examples[0].en}</p>
          )}
        </div>
      )}
    </div>
  );
}
