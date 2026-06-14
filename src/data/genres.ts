// ジャンル登録。旅行は実装済み(available)、他は「枠だけ」(coming-soon)。
// 新ジャンルを開放するときは status を 'available' にして categories を埋めるだけ。
import type { Genre, StudyItem } from '../types';
import { airport } from './travel/airport';
import { hotel } from './travel/hotel';
import { restaurant } from './travel/restaurant';
import { transportation } from './travel/transportation';
import { shopping } from './travel/shopping';
import { sightseeing } from './travel/sightseeing';
import { trouble } from './travel/trouble';

export const genres: Genre[] = [
  {
    id: 'travel',
    title: '旅行',
    icon: '🧳',
    description: '空港・ホテル・レストランなど、旅行で即使える英語',
    status: 'available',
    accent: 'from-sky-400 to-blue-500',
    categories: [
      airport,
      hotel,
      restaurant,
      transportation,
      shopping,
      sightseeing,
      trouble,
    ],
  },
  // --- 以下は拡張用の枠。コンテンツを追加して status を 'available' にすると開放される ---
  {
    id: 'business',
    title: 'ビジネス英語',
    icon: '💼',
    description: 'メール・会議・電話など仕事で使う英語（準備中）',
    status: 'coming-soon',
    accent: 'from-slate-400 to-slate-600',
    categories: [],
  },
  {
    id: 'daily',
    title: '日常会話',
    icon: '☕',
    description: 'あいさつ・雑談・友人との会話（準備中）',
    status: 'coming-soon',
    accent: 'from-amber-400 to-orange-500',
    categories: [],
  },
  {
    id: 'medical',
    title: '医療・健康',
    icon: '🩺',
    description: '病院・薬・症状の説明（準備中）',
    status: 'coming-soon',
    accent: 'from-rose-400 to-red-500',
    categories: [],
  },
  {
    id: 'study-abroad',
    title: '留学・学校',
    icon: '🎓',
    description: '授業・寮・キャンパスでの会話（準備中）',
    status: 'coming-soon',
    accent: 'from-violet-400 to-purple-600',
    categories: [],
  },
];

// --- 参照用ヘルパー ---

export function getGenre(genreId: string): Genre | undefined {
  return genres.find((g) => g.id === genreId);
}

export function getCategory(genreId: string, categoryId: string) {
  return getGenre(genreId)?.categories.find((c) => c.id === categoryId);
}

/** 全ジャンル横断で全学習項目を返す */
export function getAllItems(): StudyItem[] {
  return genres.flatMap((g) => g.categories.flatMap((c) => c.items));
}

/** IDから学習項目を引くためのマップ */
export const itemIndex: Map<string, StudyItem> = new Map(
  getAllItems().map((item) => [item.id, item]),
);
