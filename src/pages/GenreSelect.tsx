import { Link } from 'react-router-dom';
import { genres } from '../data/genres';

export function GenreSelect() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-bold text-slate-800">ジャンルを選ぶ</h1>
        <p className="mt-1 text-sm text-slate-500">
          まずは「旅行」から。他ジャンルは順次追加予定です。
        </p>
      </div>

      <div className="grid gap-3">
        {genres.map((genre) => {
          const available = genre.status === 'available';
          const itemCount = genre.categories.reduce(
            (sum, c) => sum + c.items.length,
            0,
          );

          const inner = (
            <div
              className={`flex items-center gap-4 rounded-2xl border p-4 shadow-sm transition ${
                available
                  ? 'border-slate-200 bg-white hover:border-brand-300 hover:shadow'
                  : 'border-slate-200 bg-slate-100 opacity-70'
              }`}
            >
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-2xl text-white ${
                  genre.accent ?? 'from-slate-400 to-slate-600'
                }`}
              >
                {genre.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-slate-800">{genre.title}</h2>
                  {!available && (
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs font-medium text-slate-500">
                      準備中
                    </span>
                  )}
                </div>
                <p className="truncate text-sm text-slate-500">{genre.description}</p>
                {available && (
                  <p className="mt-0.5 text-xs text-brand-600">
                    {genre.categories.length} シーン・{itemCount} 項目
                  </p>
                )}
              </div>
              <span className="text-slate-300">{available ? '›' : '🔒'}</span>
            </div>
          );

          return available ? (
            <Link key={genre.id} to={`/genre/${genre.id}`}>
              {inner}
            </Link>
          ) : (
            <div key={genre.id} aria-disabled className="cursor-not-allowed">
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}
