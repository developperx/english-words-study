import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { getCategory, getGenre } from '../data/genres';
import { useStudyStore } from '../store/useStudyStore';
import { FlashcardView } from '../components/FlashcardView';
import { QuizView } from '../components/QuizView';
import { ListeningView } from '../components/ListeningView';
import { ProgressBar } from '../components/ProgressBar';
import type { Grade, StudyItem, StudyMode } from '../types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** 正解＋ダミー3つの4択を作る */
function buildOptions(item: StudyItem, pool: StudyItem[]): StudyItem[] {
  const distractors = shuffle(pool.filter((p) => p.id !== item.id)).slice(0, 3);
  return shuffle([item, ...distractors]);
}

export function Study() {
  const { genreId = '', categoryId = '', mode = 'flashcard' } = useParams();
  const navigate = useNavigate();
  const studyMode = mode as StudyMode;

  const genre = getGenre(genreId);
  const category = getCategory(genreId, categoryId);
  const pool = category?.items ?? [];

  const grade = useStudyStore((s) => s.grade);
  const getStudyQueue = useStudyStore((s) => s.getStudyQueue);
  const getState = useStudyStore((s) => s.getState);

  // セッション開始時の出題順を固定（学習優先度順）
  const initialQueue = useMemo(
    () => getStudyQueue(pool),
    // pool はカテゴリ確定時に固定。マウント時のみ算出。
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [categoryId],
  );

  const [queue, setQueue] = useState<StudyItem[]>(initialQueue);
  const [completed, setCompleted] = useState<Set<string>>(new Set());
  const [correctCount, setCorrectCount] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [pending, setPending] = useState<boolean | null>(null);

  const total = initialQueue.length;
  const current = queue[0];

  // クイズ/リスニング用の選択肢（現在の項目ごとに算出）
  const options = useMemo(
    () => (current ? buildOptions(current, pool) : []),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current?.id, studyMode],
  );

  if (!genre || !category) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-slate-500">シーンが見つかりませんでした。</p>
        <Link to="/genres" className="text-brand-600 underline">
          ジャンル一覧へ
        </Link>
      </div>
    );
  }

  function advance(item: StudyItem, g: Grade) {
    grade(item.id, g);
    setQueue((q) => {
      const rest = q.slice(1);
      // 「もう一度」は同セッション内で末尾に再挿入して復習
      return g === 'again' ? [...rest, item] : rest;
    });
    if (g !== 'again') {
      setCompleted((c) => new Set(c).add(item.id));
    }
    setPending(null);
  }

  function handleAnswer(correct: boolean) {
    setAnsweredCount((n) => n + 1);
    if (correct) setCorrectCount((n) => n + 1);
    setPending(correct);
  }

  // セッション完了
  if (!current) {
    const accuracy =
      answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : null;
    return (
      <div className="space-y-6 text-center">
        <div className="rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-500 p-8 text-white shadow-sm">
          <div className="text-5xl">🎉</div>
          <h1 className="mt-3 text-2xl font-bold">おつかれさま！</h1>
          <p className="mt-1 opacity-90">{total} 項目を学習しました。</p>
          {accuracy !== null && (
            <p className="mt-2 text-lg font-semibold">正答率 {accuracy}%</p>
          )}
        </div>
        <div className="grid gap-2">
          <button
            onClick={() => {
              setQueue(getStudyQueue(pool));
              setCompleted(new Set());
              setCorrectCount(0);
              setAnsweredCount(0);
            }}
            className="rounded-xl bg-brand-500 py-3 font-semibold text-white transition hover:bg-brand-600"
          >
            もう一度学習する
          </button>
          <button
            onClick={() => navigate(`/genre/${genreId}`)}
            className="rounded-xl border border-slate-200 bg-white py-3 font-semibold text-slate-600"
          >
            シーン一覧へ戻る
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() => navigate(`/genre/${genreId}`)}
          className="text-slate-400 hover:text-slate-600"
          aria-label="戻る"
        >
          ✕
        </button>
        <div className="flex-1">
          <ProgressBar value={completed.size} max={total} />
        </div>
        <span className="text-xs text-slate-400">
          {completed.size}/{total}
        </span>
      </div>

      {studyMode === 'flashcard' && (
        <FlashcardView
          item={current}
          front="en"
          state={getState(current.id)}
          onGrade={(g) => advance(current, g)}
        />
      )}

      {studyMode === 'quiz' && (
        <QuizView
          item={current}
          options={options}
          direction="ja-to-en"
          onAnswer={handleAnswer}
        />
      )}

      {studyMode === 'listening' && (
        <ListeningView item={current} options={options} onAnswer={handleAnswer} />
      )}

      {(studyMode === 'quiz' || studyMode === 'listening') && pending !== null && (
        <button
          onClick={() => advance(current, pending ? 'good' : 'again')}
          className="w-full rounded-xl bg-brand-500 py-3 font-semibold text-white transition hover:bg-brand-600 active:scale-[0.99]"
        >
          次へ →
        </button>
      )}
    </div>
  );
}
