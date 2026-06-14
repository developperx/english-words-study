import type { Category } from '../../types';

// トラブル・緊急シーンのオリジナル学習コンテンツ。
export const trouble: Category = {
  id: 'trouble',
  title: 'トラブル・緊急',
  icon: '🆘',
  description: '紛失、体調不良、助けを求める表現',
  items: [
    {
      id: 'travel-trouble-001',
      kind: 'word',
      en: 'emergency',
      ja: '緊急事態',
      pron: 'エマージェンシー',
      pos: '名詞',
      examples: [{ en: 'This is an emergency!', ja: 'これは緊急事態です！' }],
    },
    {
      id: 'travel-trouble-002',
      kind: 'word',
      en: 'pharmacy',
      ja: '薬局',
      pron: 'ファーマシー',
      pos: '名詞',
      examples: [
        { en: 'Where is the nearest pharmacy?', ja: '一番近い薬局はどこですか？' },
      ],
    },
    {
      id: 'travel-trouble-003',
      kind: 'word',
      en: 'embassy',
      ja: '大使館',
      pron: 'エンバシー',
      pos: '名詞',
      examples: [
        { en: 'I need to contact the Japanese embassy.', ja: '日本大使館に連絡する必要があります。' },
      ],
    },
    {
      id: 'travel-trouble-004',
      kind: 'word',
      en: 'insurance',
      ja: '保険',
      pron: 'インシュアランス',
      pos: '名詞',
      examples: [
        { en: 'I have travel insurance.', ja: '私は旅行保険に入っています。' },
      ],
    },
    {
      id: 'travel-trouble-005',
      kind: 'phrase',
      en: 'Could you help me?',
      ja: '助けてもらえますか？',
      examples: [
        { en: 'Excuse me, could you help me?', ja: 'すみません、助けてもらえますか？' },
      ],
    },
    {
      id: 'travel-trouble-006',
      kind: 'phrase',
      en: 'I lost my passport.',
      ja: 'パスポートをなくしました。',
      examples: [
        {
          en: 'I lost my passport. What should I do?',
          ja: 'パスポートをなくしました。どうすればいいですか？',
        },
      ],
    },
    {
      id: 'travel-trouble-007',
      kind: 'phrase',
      en: 'My wallet was stolen.',
      ja: '財布を盗まれました。',
      examples: [
        {
          en: 'My wallet was stolen on the train.',
          ja: '電車で財布を盗まれました。',
        },
      ],
    },
    {
      id: 'travel-trouble-008',
      kind: 'phrase',
      en: 'Please call the police.',
      ja: '警察を呼んでください。',
      examples: [{ en: 'Please call the police!', ja: '警察を呼んでください！' }],
    },
    {
      id: 'travel-trouble-009',
      kind: 'phrase',
      en: 'I need a doctor.',
      ja: '医者に診てもらいたいです。',
      examples: [
        { en: 'I need a doctor. I feel very sick.', ja: '医者に診てもらいたいです。とても気分が悪いです。' },
      ],
    },
    {
      id: 'travel-trouble-010',
      kind: 'phrase',
      en: 'I do not feel well.',
      ja: '気分が良くありません。',
      examples: [
        {
          en: 'I do not feel well. I have a headache.',
          ja: '気分が良くありません。頭痛がします。',
        },
      ],
    },
    {
      id: 'travel-trouble-011',
      kind: 'phrase',
      en: 'Where is the nearest hospital?',
      ja: '一番近い病院はどこですか？',
      examples: [
        { en: 'Where is the nearest hospital?', ja: '一番近い病院はどこですか？' },
      ],
    },
    {
      id: 'travel-trouble-012',
      kind: 'phrase',
      en: 'I missed my train.',
      ja: '電車に乗り遅れました。',
      examples: [
        {
          en: 'I missed my train. When is the next one?',
          ja: '電車に乗り遅れました。次はいつですか？',
        },
      ],
    },
    {
      id: 'travel-trouble-013',
      kind: 'phrase',
      en: 'Can you speak slowly, please?',
      ja: 'ゆっくり話してもらえますか？',
      examples: [
        { en: 'Can you speak slowly, please?', ja: 'ゆっくり話してもらえますか？' },
      ],
    },
    {
      id: 'travel-trouble-014',
      kind: 'phrase',
      en: 'I do not understand.',
      ja: '理解できません。',
      examples: [
        { en: "I'm sorry, I do not understand.", ja: 'すみません、理解できません。' },
      ],
    },
  ],
};
