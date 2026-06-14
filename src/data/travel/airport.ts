import type { Category } from '../../types';

// 空港・出入国シーンのオリジナル学習コンテンツ。
export const airport: Category = {
  id: 'airport',
  title: '空港・出入国',
  icon: '✈️',
  description: 'チェックイン、保安検査、入国審査でよく使う表現',
  items: [
    {
      id: 'travel-airport-001',
      kind: 'word',
      en: 'boarding pass',
      ja: '搭乗券',
      pron: 'ボーディング パス',
      pos: '名詞',
      examples: [
        { en: 'May I see your boarding pass?', ja: '搭乗券を見せていただけますか？' },
      ],
    },
    {
      id: 'travel-airport-002',
      kind: 'word',
      en: 'departure',
      ja: '出発',
      pron: 'ディパーチャー',
      pos: '名詞',
      examples: [
        { en: 'The departure gate is on the second floor.', ja: '出発ゲートは2階です。' },
      ],
    },
    {
      id: 'travel-airport-003',
      kind: 'word',
      en: 'arrival',
      ja: '到着',
      pron: 'アライバル',
      pos: '名詞',
      examples: [{ en: 'What time is your arrival?', ja: '到着は何時ですか？' }],
    },
    {
      id: 'travel-airport-004',
      kind: 'word',
      en: 'luggage',
      ja: '手荷物・荷物',
      pron: 'ラゲッジ',
      pos: '名詞',
      examples: [
        { en: 'Where can I pick up my luggage?', ja: '荷物はどこで受け取れますか？' },
      ],
    },
    {
      id: 'travel-airport-005',
      kind: 'word',
      en: 'aisle seat',
      ja: '通路側の席',
      pron: 'アイル シート',
      pos: '名詞',
      examples: [
        { en: 'I would like an aisle seat, please.', ja: '通路側の席をお願いします。' },
      ],
    },
    {
      id: 'travel-airport-006',
      kind: 'word',
      en: 'window seat',
      ja: '窓側の席',
      pron: 'ウィンドウ シート',
      pos: '名詞',
      examples: [{ en: 'Can I have a window seat?', ja: '窓側の席にできますか？' }],
    },
    {
      id: 'travel-airport-007',
      kind: 'word',
      en: 'customs',
      ja: '税関',
      pron: 'カスタムズ',
      pos: '名詞',
      examples: [
        { en: 'Do I need to go through customs?', ja: '税関を通る必要はありますか？' },
      ],
    },
    {
      id: 'travel-airport-008',
      kind: 'phrase',
      en: "I'd like to check in for my flight.",
      ja: 'フライトのチェックインをしたいのですが。',
      examples: [
        {
          en: "I'd like to check in for my flight to London.",
          ja: 'ロンドン行きのフライトのチェックインをしたいのですが。',
        },
      ],
    },
    {
      id: 'travel-airport-009',
      kind: 'phrase',
      en: 'How many bags can I check?',
      ja: '荷物は何個まで預けられますか？',
      examples: [
        { en: 'How many bags can I check for free?', ja: '無料で何個まで預けられますか？' },
      ],
    },
    {
      id: 'travel-airport-010',
      kind: 'phrase',
      en: 'Where is the security checkpoint?',
      ja: '保安検査場はどこですか？',
      examples: [
        {
          en: 'Excuse me, where is the security checkpoint?',
          ja: 'すみません、保安検査場はどこですか？',
        },
      ],
    },
    {
      id: 'travel-airport-011',
      kind: 'phrase',
      en: 'What is the purpose of your visit?',
      ja: '訪問の目的は何ですか？（入国審査で聞かれる）',
      examples: [
        {
          en: 'What is the purpose of your visit? — Sightseeing.',
          ja: '訪問の目的は？ ― 観光です。',
        },
      ],
    },
    {
      id: 'travel-airport-012',
      kind: 'phrase',
      en: "I'm here on vacation.",
      ja: '休暇で来ました。',
      examples: [
        { en: "I'm here on vacation for ten days.", ja: '10日間の休暇で来ました。' },
      ],
    },
    {
      id: 'travel-airport-013',
      kind: 'phrase',
      en: 'How long will you be staying?',
      ja: 'どのくらい滞在しますか？',
      examples: [
        {
          en: 'How long will you be staying? — About a week.',
          ja: 'どのくらい滞在しますか？ ― 1週間ほどです。',
        },
      ],
    },
    {
      id: 'travel-airport-014',
      kind: 'phrase',
      en: 'My flight has been delayed.',
      ja: '私のフライトは遅延しています。',
      examples: [
        {
          en: 'My flight has been delayed by two hours.',
          ja: '私のフライトは2時間遅れています。',
        },
      ],
    },
    {
      id: 'travel-airport-015',
      kind: 'phrase',
      en: 'Which gate does my flight leave from?',
      ja: '私のフライトは何番ゲートから出発しますか？',
      examples: [
        {
          en: 'Which gate does my flight leave from?',
          ja: '私のフライトは何番ゲートから出発しますか？',
        },
      ],
    },
    {
      id: 'travel-airport-016',
      kind: 'phrase',
      en: 'I missed my connecting flight.',
      ja: '乗り継ぎ便に乗り遅れました。',
      examples: [
        {
          en: 'I missed my connecting flight. What should I do?',
          ja: '乗り継ぎ便に乗り遅れました。どうすればいいですか？',
        },
      ],
    },
  ],
};
