import { useEffect, useState } from 'react';
import type { StudyItem } from '../types';
import { isSpeechSupported, speak } from '../lib/speech';
import { useStudyStore } from '../store/useStudyStore';

interface Props {
  item: StudyItem;
  /** 4択の選択肢（正解を含む、シャッフル済み） */
  options: StudyItem[];
  onAnswer: (correct: boolean) => void;
}

/** リスニング：英語を聞いて意味を当てる（音声→意味の結びつけを強化） */
export function ListeningView({ item, options, onAnswer }: Props) {
  const rate = useStudyStore((s) => s.settings.speechRate);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const supported = isSpeechSupported();

  // 新しい問題になったら自動で読み上げ
  useEffect(() => {
    setSelected(null);
    setRevealed(false);
    if (supported) {
      const t = setTimeout(() => speak(item.en, rate), 300);
      return () => clearTimeout(t);
    }
  }, [item.id, rate, supported, item.en]);

  const answered = selected !== null;

  return (
    <div className="space-y-4">
      <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
        {!supported && (
          <p className="mb-3 rounded-lg bg-amber-50 p-2 text-xs text-amber-700">
            お使いのブラウザは音声読み上げに未対応です。テキストで学習できます。
          </p>
        )}
        <button
          onClick={() => speak(item.en, rate)}
          disabled={!supported}
          className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-500 text-4xl text-white shadow transition hover:bg-brand-600 active:scale-95 disabled:opacity-40"
          aria-label="もう一度聞く"
        >
          🔊
        </button>
        <p className="mt-3 text-sm text-slate-500">音声を聞いて意味を選ぼう</p>

        {(revealed || answered || !supported) && (
          <p className="mt-3 text-lg font-bold text-slate-800">{item.en}</p>
        )}
        {!answered && supported && (
          <button
            onClick={() => setRevealed((r) => !r)}
            className="mt-2 text-xs text-brand-600 underline"
          >
            {revealed ? '英文を隠す' : '英文を表示'}
          </button>
        )}
      </div>

      <div className="grid gap-2">
        {options.map((opt) => {
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
              {opt.ja}
              {answered && isCorrect && <span className="ml-2">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}
