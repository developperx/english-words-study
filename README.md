# 旅たび英語 — 旅行英会話・英単語学習アプリ

様々なシーンに対応した英単語・実用英会話を、**記憶に残りやすい形**で学べるブラウザ学習アプリです。
まずは「旅行」に特化し、他ジャンルは枠だけ用意してあるので後から拡張できます。

- ✅ **完全無料・サーバー不要**（クライアント完結。GitHub Pages で公開）
- ✅ **合法**：単語・例文はすべてオリジナル、外部有料APIなし
- ✅ **ブラウザからアクセス**（PC・スマホ対応）
- ✅ **PWA**：ホーム画面に追加でき、オフラインでも学習可能（旅行先で便利）
- ✅ **プライバシー配慮**：進捗は端末内（localStorage）にのみ保存

## 記憶に残る学習のしくみ

- **間隔反復（SRS / SM-2 アルゴリズム）**：忘却曲線に合わせて最適なタイミングで再出題
- **能動的想起**：3つの学習モードで「思い出す」訓練
  - 🃏 フラッシュカード（英⇔日、4段階で自己評価）
  - ✅ 4択クイズ（即時フィードバック）
  - 🎧 リスニング（音声を聞いて意味を当てる。Web Speech API で読み上げ）
- **今日の復習**：全ジャンル横断で復習期限が来た項目だけを出題
- **記録の可視化**：連続学習日数（ストリーク）、習得済み数、シーン別達成率

## 収録コンテンツ（初期：旅行ジャンル）

空港・出入国 / ホテル・宿泊 / レストラン・飲食 / 交通・移動 / 買い物 / 観光 / トラブル・緊急
（各シーン 単語＋会話文で構成）

## 技術スタック

React + TypeScript + Vite / Tailwind CSS / Zustand / vite-plugin-pwa / Web Speech API

## 開発

```bash
npm install            # 依存をインストール
node scripts/generate-icons.mjs   # PWAアイコンを生成（初回のみ）
npm run dev            # 開発サーバー（http://localhost:5173/english-words-study/）
npm run build          # 型チェック＋本番ビルド（dist/）
npm run preview        # ビルド結果をプレビュー
```

## デプロイ（GitHub Pages・無料）

`.github/workflows/deploy.yml` により、`main` ブランチへ push すると自動でビルド・公開されます。

初回のみリポジトリ設定が必要です：
1. GitHub の **Settings → Pages → Build and deployment → Source** を **GitHub Actions** に設定
2. `main` に push すると Actions が走り、`https://<ユーザー名>.github.io/english-words-study/` に公開

> リポジトリ名を変える／ユーザーページ（`<user>.github.io`）で配信する場合は、
> `vite.config.ts` の `repoBase` を合わせて変更してください。

## ジャンルの拡張方法

データは「ジャンル → シーン（カテゴリ）→ 学習項目」の3階層です（型は `src/types/index.ts`）。

新ジャンルを開放するには、`src/data/genres.ts` で対象ジャンルの `status` を
`'coming-soon'` → `'available'` に変え、シーン別コンテンツを追加するだけです。
SRS・学習モード・UI はすべて共通で再利用されます。

```ts
// 例：src/data/business/email.ts を作り、genres.ts の business ジャンルに追加
{
  id: 'business',
  status: 'available',           // ← 'coming-soon' から変更
  categories: [email, meeting],  // ← コンテンツを追加
}
```

学習項目の最小例：

```ts
{
  id: 'travel-airport-001',  // 一意ID（進捗の紐付けに使うので変更しない）
  kind: 'phrase',            // 'word' | 'phrase'
  en: 'May I see your boarding pass?',
  ja: '搭乗券を見せていただけますか？',
  examples: [{ en: '...', ja: '...' }],
}
```

## ライセンス・コンテンツについて

収録している英単語・例文はすべて本プロジェクトのために書き起こしたオリジナルです。
発音はブラウザ標準の Web Speech API を使用しており、外部の有料サービスや
著作物の転載は行っていません。
