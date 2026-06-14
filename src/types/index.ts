// アプリ全体で使う型定義。
// データは「ジャンル → シーン(カテゴリ) → 学習項目」の3階層で構成する。

export type ItemKind = 'word' | 'phrase';

export interface Example {
  en: string;
  ja: string;
}

export interface StudyItem {
  /** 一意ID。SRS進捗の紐付けに使うので変更しないこと（例: 'travel-airport-001'） */
  id: string;
  /** 単語 or 会話文 */
  kind: ItemKind;
  /** 英語（学習対象） */
  en: string;
  /** 日本語訳 */
  ja: string;
  /** 発音の補助表記（カナ/IPAなど。任意・自作） */
  pron?: string;
  /** 品詞（単語のとき。例: 名詞, 動詞） */
  pos?: string;
  /** 例文（文脈で記憶を定着させる） */
  examples: Example[];
  /** 任意のタグ（検索・分類用） */
  tags?: string[];
}

export interface Category {
  id: string;
  title: string;
  /** 絵文字アイコン */
  icon: string;
  description?: string;
  items: StudyItem[];
}

export type GenreStatus = 'available' | 'coming-soon';

export interface Genre {
  id: string;
  title: string;
  icon: string;
  description?: string;
  /** 'coming-soon' は「枠だけ」用意した未開放ジャンル */
  status: GenreStatus;
  /** テーマ用のTailwindグラデーションクラス（任意） */
  accent?: string;
  categories: Category[];
}

/** SM-2 アルゴリズムで管理する1項目あたりの学習状態 */
export interface ReviewState {
  itemId: string;
  /** 難易度係数（SM-2のEF）。初期2.5 */
  easeFactor: number;
  /** 次回までの間隔（日） */
  interval: number;
  /** 連続正解回数 */
  reps: number;
  /** 失敗（忘却）回数 */
  lapses: number;
  /** 次回復習予定（エポックms） */
  dueDate: number;
  /** 最終学習日時（エポックms） */
  lastReviewed: number;
}

/** ユーザーの評価（フラッシュカードの4段階） */
export type Grade = 'again' | 'hard' | 'good' | 'easy';

export type StudyMode = 'flashcard' | 'quiz' | 'listening';
