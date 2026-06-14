import { Link, useNavigate, useParams } from 'react-router-dom';
import { getGenre } from '../data/genres';
import { useStudyStore } from '../store/useStudyStore';
import { ProgressBar } from '../components/ProgressBar';
import type { Category } from '../types';

const MODES: { id: string; label: string; icon: string }[] = [
  { id: 'flashcard', label: 'カード', icon: '🃏' },
  { id: 'quiz', label: 'クイズ', icon: '✅' },
  { id: 'listening', label: 'リスニング', icon: '🎧' },
];

function CategoryCard({ genreId, category }: { genreId: string; category: Category }) {
  const getCategoryStats = useStudyStore((s) => s.getCategoryStats);
  const stats = getCategoryStats(category.items);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <span className="text-2xl">{category.icon}</span>
        <div className="min-w-0 flex-1">
          <h2 className="font-bold text-slate-800">{category.title}</h2>
          <p className="truncate text-xs text-slate-500">{category.description}</p>
        </div>
        <span className="text-xs text-slate-400">{category.items.length}項目</span>
      </div>

      <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
        <span>習得 {stats.mastered}/{stats.total}</span>
        {stats.due > 0 && (
          <span className="font-semibold text-orange-500">復習 {stats.due}件</span>
        )}
      </div>
      <ProgressBar value={stats.mastered} max={stats.total} className="mt-1.5" />

      <div className="mt-3 grid grid-cols-3 gap-2">
        {MODES.map((mode) => (
          <Link
            key={mode.id}
            to={`/study/${genreId}/${category.id}/${mode.id}`}
            className="flex flex-col items-center gap-0.5 rounded-xl bg-slate-100 py-2 text-xs font-medium text-slate-600 transition hover:bg-brand-50 hover:text-brand-600 active:scale-95"
          >
            <span className="text-lg">{mode.icon}</span>
            {mode.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export function CategorySelect() {
  const { genreId = '' } = useParams();
  const navigate = useNavigate();
  const genre = getGenre(genreId);

  if (!genre || genre.status !== 'available') {
    return (
      <div className="space-y-4 text-center">
        <p className="text-slate-500">このジャンルはまだ準備中です。</p>
        <button
          onClick={() => navigate('/genres')}
          className="rounded-xl bg-brand-500 px-5 py-2 font-semibold text-white"
        >
          ジャンル一覧へ戻る
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Link to="/genres" className="text-slate-400 hover:text-slate-600">
          ‹
        </Link>
        <h1 className="text-xl font-bold text-slate-800">
          {genre.icon} {genre.title}のシーン
        </h1>
      </div>
      <p className="text-sm text-slate-500">
        シーンと学習モード（カード／クイズ／リスニング）を選びましょう。
      </p>

      <div className="grid gap-3">
        {genre.categories.map((category) => (
          <CategoryCard key={category.id} genreId={genreId} category={category} />
        ))}
      </div>
    </div>
  );
}
