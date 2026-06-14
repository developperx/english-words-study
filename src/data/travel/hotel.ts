import type { Category } from '../../types';

// ホテル・宿泊シーンのオリジナル学習コンテンツ。
export const hotel: Category = {
  id: 'hotel',
  title: 'ホテル・宿泊',
  icon: '🏨',
  description: 'チェックイン、リクエスト、チェックアウトの表現',
  items: [
    {
      id: 'travel-hotel-001',
      kind: 'word',
      en: 'reservation',
      ja: '予約',
      pron: 'レザベーション',
      pos: '名詞',
      examples: [
        { en: 'I have a reservation under Tanaka.', ja: '田中で予約しています。' },
      ],
    },
    {
      id: 'travel-hotel-002',
      kind: 'word',
      en: 'check-in',
      ja: 'チェックイン',
      pron: 'チェックイン',
      pos: '名詞',
      examples: [{ en: 'What time is check-in?', ja: 'チェックインは何時ですか？' }],
    },
    {
      id: 'travel-hotel-003',
      kind: 'word',
      en: 'vacancy',
      ja: '空室',
      pron: 'ベイカンシー',
      pos: '名詞',
      examples: [
        { en: 'Do you have any vacancies tonight?', ja: '今夜空室はありますか？' },
      ],
    },
    {
      id: 'travel-hotel-004',
      kind: 'word',
      en: 'amenities',
      ja: '備品・アメニティ',
      pron: 'アメニティーズ',
      pos: '名詞',
      examples: [
        { en: 'Are toiletries included in the amenities?', ja: '洗面用具はアメニティに含まれますか？' },
      ],
    },
    {
      id: 'travel-hotel-005',
      kind: 'word',
      en: 'deposit',
      ja: '保証金・デポジット',
      pron: 'ディポジット',
      pos: '名詞',
      examples: [
        { en: 'Is there a deposit for the room?', ja: '部屋に保証金は必要ですか？' },
      ],
    },
    {
      id: 'travel-hotel-006',
      kind: 'phrase',
      en: 'I have a reservation for tonight.',
      ja: '今夜の予約をしています。',
      examples: [
        {
          en: 'I have a reservation for tonight under the name Sato.',
          ja: '佐藤の名前で今夜の予約をしています。',
        },
      ],
    },
    {
      id: 'travel-hotel-007',
      kind: 'phrase',
      en: 'Could I have a wake-up call at seven?',
      ja: '7時にモーニングコールをお願いできますか？',
      examples: [
        {
          en: 'Could I have a wake-up call at seven tomorrow?',
          ja: '明日7時にモーニングコールをお願いできますか？',
        },
      ],
    },
    {
      id: 'travel-hotel-008',
      kind: 'phrase',
      en: 'Is breakfast included?',
      ja: '朝食は含まれていますか？',
      examples: [
        {
          en: 'Is breakfast included in the price?',
          ja: '料金に朝食は含まれていますか？',
        },
      ],
    },
    {
      id: 'travel-hotel-009',
      kind: 'phrase',
      en: 'Could you keep my luggage until check-in?',
      ja: 'チェックインまで荷物を預かってもらえますか？',
      examples: [
        {
          en: 'Could you keep my luggage until check-in time?',
          ja: 'チェックインの時間まで荷物を預かってもらえますか？',
        },
      ],
    },
    {
      id: 'travel-hotel-010',
      kind: 'phrase',
      en: 'The air conditioner is not working.',
      ja: 'エアコンが動きません。',
      examples: [
        {
          en: 'The air conditioner in my room is not working.',
          ja: '部屋のエアコンが動きません。',
        },
      ],
    },
    {
      id: 'travel-hotel-011',
      kind: 'phrase',
      en: 'Could I get extra towels?',
      ja: 'タオルを追加でもらえますか？',
      examples: [
        { en: 'Could I get extra towels, please?', ja: 'タオルを追加でいただけますか？' },
      ],
    },
    {
      id: 'travel-hotel-012',
      kind: 'phrase',
      en: 'Can I check out late?',
      ja: 'レイトチェックアウトはできますか？',
      examples: [
        {
          en: 'Can I check out late, around 1 p.m.?',
          ja: '午後1時ごろのレイトチェックアウトはできますか？',
        },
      ],
    },
    {
      id: 'travel-hotel-013',
      kind: 'phrase',
      en: 'Is there free Wi-Fi in the room?',
      ja: '部屋に無料Wi-Fiはありますか？',
      examples: [
        { en: 'Is there free Wi-Fi in the room?', ja: '部屋に無料Wi-Fiはありますか？' },
      ],
    },
    {
      id: 'travel-hotel-014',
      kind: 'phrase',
      en: 'Could you call a taxi for me?',
      ja: 'タクシーを呼んでもらえますか？',
      examples: [
        {
          en: 'Could you call a taxi for me to the airport?',
          ja: '空港までのタクシーを呼んでもらえますか？',
        },
      ],
    },
    {
      id: 'travel-hotel-015',
      kind: 'phrase',
      en: 'I would like to check out, please.',
      ja: 'チェックアウトをお願いします。',
      examples: [
        {
          en: 'I would like to check out, please. Here is my key.',
          ja: 'チェックアウトをお願いします。これが鍵です。',
        },
      ],
    },
  ],
};
