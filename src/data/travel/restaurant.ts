import type { Category } from '../../types';

// レストラン・飲食シーンのオリジナル学習コンテンツ。
export const restaurant: Category = {
  id: 'restaurant',
  title: 'レストラン・飲食',
  icon: '🍽️',
  description: '予約、注文、会計でよく使う表現',
  items: [
    {
      id: 'travel-restaurant-001',
      kind: 'word',
      en: 'menu',
      ja: 'メニュー',
      pron: 'メニュー',
      pos: '名詞',
      examples: [{ en: 'Could I see the menu, please?', ja: 'メニューを見せてください。' }],
    },
    {
      id: 'travel-restaurant-002',
      kind: 'word',
      en: 'appetizer',
      ja: '前菜',
      pron: 'アペタイザー',
      pos: '名詞',
      examples: [
        { en: 'What do you recommend for an appetizer?', ja: '前菜のおすすめは何ですか？' },
      ],
    },
    {
      id: 'travel-restaurant-003',
      kind: 'word',
      en: 'bill',
      ja: '会計・伝票',
      pron: 'ビル',
      pos: '名詞',
      examples: [{ en: 'Could we have the bill, please?', ja: 'お会計をお願いします。' }],
    },
    {
      id: 'travel-restaurant-004',
      kind: 'word',
      en: 'tip',
      ja: 'チップ',
      pron: 'ティップ',
      pos: '名詞',
      examples: [{ en: 'Is the tip included?', ja: 'チップは含まれていますか？' }],
    },
    {
      id: 'travel-restaurant-005',
      kind: 'word',
      en: 'leftovers',
      ja: '食べ残し（持ち帰る分）',
      pron: 'レフトオーバーズ',
      pos: '名詞',
      examples: [
        { en: 'Can I take the leftovers home?', ja: '残りを持ち帰ってもいいですか？' },
      ],
    },
    {
      id: 'travel-restaurant-006',
      kind: 'phrase',
      en: 'A table for two, please.',
      ja: '2名でお願いします。',
      examples: [
        { en: 'A table for two, please. Non-smoking.', ja: '2名、禁煙席でお願いします。' },
      ],
    },
    {
      id: 'travel-restaurant-007',
      kind: 'phrase',
      en: 'Do you have a table available?',
      ja: '空いている席はありますか？',
      examples: [
        {
          en: 'Do you have a table available right now?',
          ja: '今、空いている席はありますか？',
        },
      ],
    },
    {
      id: 'travel-restaurant-008',
      kind: 'phrase',
      en: "I'll have this one, please.",
      ja: 'これをください。',
      examples: [
        { en: "I'll have this one, please. (pointing)", ja: 'これをください。（指さして）' },
      ],
    },
    {
      id: 'travel-restaurant-009',
      kind: 'phrase',
      en: 'What do you recommend?',
      ja: 'おすすめは何ですか？',
      examples: [
        {
          en: 'What do you recommend on the menu?',
          ja: 'メニューの中でおすすめは何ですか？',
        },
      ],
    },
    {
      id: 'travel-restaurant-010',
      kind: 'phrase',
      en: "I'm allergic to nuts.",
      ja: 'ナッツアレルギーがあります。',
      examples: [
        {
          en: "I'm allergic to nuts. Does this contain any?",
          ja: 'ナッツアレルギーがあります。これには入っていますか？',
        },
      ],
    },
    {
      id: 'travel-restaurant-011',
      kind: 'phrase',
      en: 'Could I get some water, please?',
      ja: 'お水をいただけますか？',
      examples: [
        { en: 'Could I get some water, please?', ja: 'お水をいただけますか？' },
      ],
    },
    {
      id: 'travel-restaurant-012',
      kind: 'phrase',
      en: 'Can we split the bill?',
      ja: '会計は別々にできますか？',
      examples: [
        { en: 'Can we split the bill evenly?', ja: '会計を均等に分けられますか？' },
      ],
    },
    {
      id: 'travel-restaurant-013',
      kind: 'phrase',
      en: 'Could I have the check, please?',
      ja: 'お会計をお願いします。',
      examples: [
        { en: 'Could I have the check, please?', ja: 'お会計をお願いします。' },
      ],
    },
    {
      id: 'travel-restaurant-014',
      kind: 'phrase',
      en: 'That was delicious, thank you.',
      ja: 'とても美味しかったです、ありがとう。',
      examples: [
        { en: 'That was delicious, thank you very much.', ja: 'とても美味しかったです、本当にありがとう。' },
      ],
    },
    {
      id: 'travel-restaurant-015',
      kind: 'phrase',
      en: 'Could I get this to go?',
      ja: 'これを持ち帰りにできますか？',
      examples: [
        { en: 'Could I get this to go, please?', ja: 'これを持ち帰りにできますか？' },
      ],
    },
  ],
};
