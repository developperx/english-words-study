import { Link } from 'react-router-dom';
import { useStudyStore } from '../store/useStudyStore';
import { ProgressBar } from '../components/ProgressBar';

export function Home() {
  const streak = useStudyStore((s) => s.streak);
  const getGlobalStats = useStudyStore((s) => s.getGlobalStats);
  const getDueItems = useStudyStore((s) => s.getDueItems);

  const stats = getGlobalStats();
  const dueCount = getDueItems().length;

  return (
    <div className="space-y-6">
      <section className="rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 p-5 text-white shadow-sm">
        <p className="text-sm/relaxed opacity-90">記憶に残る学習で、旅をもっと自由に。</p>
        <h1 className="mt-1 text-2xl font-bold">今日も英語を続けよう 🌏</h1>
        <div className="mt-4 flex items-center gap-4">
          <div className="rounded-xl bg-white/20 px-4 py-2 text-center">
            <div className="text-2xl font-bold">🔥 {streak.current}</div>
            <div className="text-xs opacity-90">連続日数</div>
          </div>
          <div className="rounded-xl bg-white/20 px-4 py-2 text-center">
            <div className="text-2xl font-bold">{stats.mastered}</div>
            <div className="text-xs opacity-90">習得済み</div>
          </div>
          <div className="rounded-xl bg-white/20 px-4 py-2 text-center">
            <div className="text-2xl font-bold">{stats.studied}</div>
            <div className="text-xs opacity-90">学習した語</div>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-slate-800">今日の復習</h2>
          <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-sm font-semibold text-brand-600">
            {dueCount} 件
          </span>
        </div>
        <p className="mt-1 text-sm text-slate-500">
          {dueCount > 0
            ? '復習の時期が来た単語・フレーズがあります。忘れる前に思い出しましょう。'
            : '今は復習待ちの項目はありません。新しいシーンを学びましょう。'}
        </p>
        <Link
          to={dueCount > 0 ? '/review' : '/genres'}
          className="mt-4 block rounded-xl bg-brand-500 py-3 text-center font-semibold text-white transition hover:bg-brand-600 active:scale-[0.99]"
        >
          {dueCount > 0 ? '復習をはじめる' : '学習をはじめる'}
        </Link>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-slate-800">全体の進捗</h2>
        <div className="mt-3 flex items-center justify-between text-sm text-slate-500">
          <span>習得済み {stats.mastered} / {stats.total}</span>
          <span>{stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0}%</span>
        </div>
        <ProgressBar value={stats.mastered} max={stats.total} className="mt-2" />
      </section>

      <Link
        to="/genres"
        className="block rounded-2xl border border-dashed border-brand-300 bg-brand-50/50 p-5 text-center font-semibold text-brand-700 transition hover:bg-brand-50"
      >
        📚 ジャンル・シーンを選んで学習する
      </Link>
    </div>
  );
}
