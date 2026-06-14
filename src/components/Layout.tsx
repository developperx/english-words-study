import { Link, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

const NAV = [
  { to: '/', label: 'ホーム', icon: '🏠' },
  { to: '/genres', label: '学習', icon: '📚' },
  { to: '/review', label: '復習', icon: '🔁' },
  { to: '/stats', label: '記録', icon: '📊' },
];

/** 共通レイアウト。上部ヘッダー＋下部タブナビ（モバイル最適化） */
export function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  return (
    <div className="mx-auto flex min-h-full max-w-2xl flex-col bg-slate-50">
      <header className="sticky top-0 z-10 flex items-center gap-2 border-b border-slate-200 bg-white/90 px-4 py-3 backdrop-blur">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-brand-700">
          <span className="text-xl">🌏</span> 旅たび英語
        </Link>
      </header>

      <main className="flex-1 px-4 py-5">{children}</main>

      <nav className="sticky bottom-0 z-10 grid grid-cols-4 border-t border-slate-200 bg-white/95 backdrop-blur safe-bottom">
        {NAV.map((item) => {
          const active =
            item.to === '/' ? pathname === '/' : pathname.startsWith(item.to);
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`flex flex-col items-center gap-0.5 py-2 text-xs font-medium transition ${
                active ? 'text-brand-600' : 'text-slate-400'
              }`}
            >
              <span className="text-xl">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
