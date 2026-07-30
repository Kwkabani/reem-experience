export const BOTTLE_MESSAGE_1 = `إذا وصلت إليك هذه الرسالة...
فهذا يعني أن الجزيرة اختارتك.`;

export const BOTTLE_MESSAGE_2 = `هنا لا تُبنى الأماكن بالحجارة فقط...
بل بالذكريات والاختيارات.`;

export interface PersonalityInfo {
  id: string;
  label: string;
  icon: string;
  description: string;
}

export const PERSONALITIES: PersonalityInfo[] = [
  {
    id: 'explorer',
    label: 'المستكشفة',
    icon: '🧭',
    description: 'تحبين اكتشاف كل شيء بنفسك، وتؤمنين أن المغامرة هي أجمل طريقة للتعلم.',
  },
  {
    id: 'dreamer',
    label: 'الحالمة',
    icon: '🌙',
    description: 'ترين الجمال في التفاصيل الصغيرة، وتؤمنين أن الأحلام هي بداية كل شيء جميل.',
  },
  {
    id: 'funny',
    label: 'المرحة',
    icon: '🌟',
    description: 'الضحكة الحلوة اللي بتنور أي مكان، والمرح هو أسلوب حياتك.',
  },
];

export const AVATARS = [
  { id: 'explorer', label: 'المستكشفة', icon: '🧭' },
  { id: 'dreamer', label: 'الحالمة', icon: '🌙' },
  { id: 'funny', label: 'المرحة', icon: '🌟' },
];

export const STARTER_MESSAGES = [
  'ليلٌ هادئ على شاطئ الجزيرة...',
  'في مكان بعيد، حيث تلتقي السماء بالماء...',
  'حيث تروي الأمواج قصصًا قديمة...',
  'تنتظرك رسالة...',
];

export const ISLAND_WELCOME = `هذه هي الجزيرة.
مكان غامض ينتظر من يكتشف أسراره.
كل زاوية هنا تحمل ذكرى...
كل مكان يروي قصة.`;
