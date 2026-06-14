import type { Category } from '../../types';

// 交通・移動シーンのオリジナル学習コンテンツ。
export const transportation: Category = {
  id: 'transportation',
  title: '交通・移動',
  icon: '🚇',
  description: '電車・バス・タクシー・道案内の表現',
  items: [
    {
      id: 'travel-transportation-001',
      kind: 'word',
      en: 'one-way ticket',
      ja: '片道切符',
      pron: 'ワンウェイ チケット',
      pos: '名詞',
      examples: [
        { en: 'One one-way ticket, please.', ja: '片道切符を1枚ください。' },
      ],
    },
    {
      id: 'travel-transportation-002',
      kind: 'word',
      en: 'round-trip ticket',
      ja: '往復切符',
      pron: 'ラウンドトリップ チケット',
      pos: '名詞',
      examples: [
        { en: 'How much is a round-trip ticket?', ja: '往復切符はいくらですか？' },
      ],
    },
    {
      id: 'travel-transportation-003',
      kind: 'word',
      en: 'platform',
      ja: 'プラットフォーム・乗り場',
      pron: 'プラットフォーム',
      pos: '名詞',
      examples: [
        { en: 'Which platform does the train leave from?', ja: '電車は何番ホームから出ますか？' },
      ],
    },
    {
      id: 'travel-transportation-004',
      kind: 'word',
      en: 'transfer',
      ja: '乗り換え',
      pron: 'トランスファー',
      pos: '名詞・動詞',
      examples: [
        { en: 'Do I need to transfer trains?', ja: '電車を乗り換える必要がありますか？' },
      ],
    },
    {
      id: 'travel-transportation-005',
      kind: 'word',
      en: 'fare',
      ja: '運賃',
      pron: 'フェア',
      pos: '名詞',
      examples: [{ en: 'What is the fare to downtown?', ja: '中心街までの運賃はいくらですか？' }],
    },
    {
      id: 'travel-transportation-006',
      kind: 'phrase',
      en: 'How do I get to the station?',
      ja: '駅へはどう行けばいいですか？',
      examples: [
        {
          en: 'Excuse me, how do I get to the station?',
          ja: 'すみません、駅へはどう行けばいいですか？',
        },
      ],
    },
    {
      id: 'travel-transportation-007',
      kind: 'phrase',
      en: 'Does this bus go downtown?',
      ja: 'このバスは中心街に行きますか？',
      examples: [
        { en: 'Excuse me, does this bus go downtown?', ja: 'すみません、このバスは中心街に行きますか？' },
      ],
    },
    {
      id: 'travel-transportation-008',
      kind: 'phrase',
      en: 'Could you take me to this address?',
      ja: 'この住所まで行ってもらえますか？',
      examples: [
        {
          en: 'Could you take me to this address, please?',
          ja: 'この住所まで行ってもらえますか？',
        },
      ],
    },
    {
      id: 'travel-transportation-009',
      kind: 'phrase',
      en: 'How long does it take to get there?',
      ja: 'そこまでどのくらいかかりますか？',
      examples: [
        {
          en: 'How long does it take to get there by train?',
          ja: '電車でそこまでどのくらいかかりますか？',
        },
      ],
    },
    {
      id: 'travel-transportation-010',
      kind: 'phrase',
      en: 'Where can I buy a ticket?',
      ja: '切符はどこで買えますか？',
      examples: [
        { en: 'Where can I buy a ticket for the subway?', ja: '地下鉄の切符はどこで買えますか？' },
      ],
    },
    {
      id: 'travel-transportation-011',
      kind: 'phrase',
      en: 'Please stop here.',
      ja: 'ここで止めてください。',
      examples: [
        { en: 'Please stop here. This is fine.', ja: 'ここで止めてください。ここで大丈夫です。' },
      ],
    },
    {
      id: 'travel-transportation-012',
      kind: 'phrase',
      en: 'Which line should I take?',
      ja: 'どの路線に乗ればいいですか？',
      examples: [
        {
          en: 'Which line should I take to the museum?',
          ja: '博物館に行くにはどの路線に乗ればいいですか？',
        },
      ],
    },
    {
      id: 'travel-transportation-013',
      kind: 'phrase',
      en: 'Is this seat taken?',
      ja: 'この席は空いていますか？',
      examples: [{ en: 'Excuse me, is this seat taken?', ja: 'すみません、この席は空いていますか？' }],
    },
    {
      id: 'travel-transportation-014',
      kind: 'phrase',
      en: 'Could you tell me when to get off?',
      ja: 'いつ降りればいいか教えてもらえますか？',
      examples: [
        {
          en: 'Could you tell me when to get off for the park?',
          ja: '公園に行くにはいつ降りればいいか教えてもらえますか？',
        },
      ],
    },
    {
      id: 'travel-transportation-015',
      kind: 'phrase',
      en: 'I think I am lost.',
      ja: '道に迷ったようです。',
      examples: [
        { en: 'I think I am lost. Could you help me?', ja: '道に迷ったようです。助けてもらえますか？' },
      ],
    },
  ],
};
