import { useState } from 'react';
import { genres } from '../data/genres';
import { useStudyStore } from '../store/useStudyStore';
import { ProgressBar } from '../components/ProgressBar';

export function Stats() {
  const streak = useStudyStore((s) => s.streak);
  const settings = useStudyStore((s) => s.settings);
  const setSettings = useStudyStore((s) => s.setSettings);
  const resetProgress = useStudyStore((s) => s.resetProgress);
  const getGlobalStats = useStudyStore((s) => s.getGlobalStats);
  const getCategoryStats = useStudyStore((s) => s.getCategoryStats);

  const [confirmReset, setConfirmReset] = useState(false);
  const global = getGlobalStats();

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-slate-800">学習記録</h1>

      <section className="grid grid-cols-3 gap-3">
        {[
          { label: '連続日数', value: `🔥 ${streak.current}` },
          { label: '最高記録', value: `${streak.best}日` },
          { label: '学習日数', value: `${streak.totalDays}日` },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-slate-200 bg-white p-3 text-center shadow-sm"
          >
            <div className="text-xl font-bold text-slate-800">{s.value}</div>
            <div className="text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-slate-800">全体の習得状況</h2>
        <div className="mt-3 flex justify-between text-sm text-slate-500">
          <span>習得 {global.mastered} / 学習 {global.studied} / 全 {global.total}</span>
          <span>{global.total > 0 ? Math.round((global.mastered / global.total) * 100) : 0}%</span>
        </div>
        <ProgressBar value={global.mastered} max={global.total} className="mt-2" />
      </section>

      <section className="space-y-3">
        <h2 className="font-bold text-slate-800">ジャンル別</h2>
        {genres
          .filter((g) => g.status === 'available')
          .map((genre) => (
            <div
              key={genre.id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="mb-2 flex items-center gap-2 font-semibold text-slate-700">
                <span>{genre.icon}</span> {genre.title}
              </div>
              <div className="space-y-2">
                {genre.categories.map((cat) => {
                  const st = getCategoryStats(cat.items);
                  return (
                    <div key={cat.id}>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>
                          {cat.icon} {cat.title}
                        </span>
                        <span>
                          {st.mastered}/{st.total}
                        </span>
                      </div>
                      <ProgressBar value={st.mastered} max={st.total} className="mt-1" />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="font-bold text-slate-800">設定</h2>
        <label className="mt-4 block text-sm text-slate-600">
          読み上げ速度: {settings.speechRate.toFixed(1)}x
          <input
            type="range"
            min={0.5}
            max={1.2}
            step={0.1}
            value={settings.speechRate}
            onChange={(e) => setSettings({ speechRate: Number(e.target.value) })}
            className="mt-1 w-full accent-brand-500"
          />
        </label>
      </section>

      <section className="rounded-2xl border border-rose-200 bg-rose-50/50 p-5">
        <h2 className="font-bold text-rose-700">進捗のリセット</h2>
        <p className="mt-1 text-sm text-rose-600/80">
          学習履歴とストリークをすべて消去します。元に戻せません。
        </p>
        {confirmReset ? (
          <div className="mt-3 flex gap-2">
            <button
              onClick={() => {
                resetProgress();
                setConfirmReset(false);
              }}
              className="flex-1 rounded-xl bg-rose-500 py-2.5 font-semibold text-white"
            >
              本当に消去する
            </button>
            <button
              onClick={() => setConfirmReset(false)}
              className="flex-1 rounded-xl border border-slate-200 bg-white py-2.5 font-semibold text-slate-600"
            >
              キャンセル
            </button>
          </div>
        ) : (
          <button
            onClick={() => setConfirmReset(true)}
            className="mt-3 rounded-xl border border-rose-300 bg-white px-4 py-2 text-sm font-semibold text-rose-600"
          >
            進捗をリセット
          </button>
        )}
      </section>

      <p className="pb-2 text-center text-xs text-slate-400">
        進捗はこの端末のブラウザ内（localStorage）にのみ保存されます。
      </p>
    </div>
  );
}
