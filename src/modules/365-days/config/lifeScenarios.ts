import type { Scenario } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'hard_day',
    title: 'يوم صعب',
    description: 'وصلت البيت بعد يوم طويل وكانت طاقتك صفر. أنا موجود/ة بجانبك. ماذا تفضل أن أفعل؟',
    choices: [
      { label: 'تجلس بجانبي بصمت وتحتضنني', value: 'silent_hug' },
      { label: 'تسألني وش صار وتحاول تفهم', value: 'ask' },
      {
        label: 'تقول لي "خلص عادي" وتكمل سوالفك 😂',
        value: 'ignore',
        isComedy: true,
        comedyAnalysis: '😂 أها! تقولي عادي وتمشي! هذا تهرب يا ياشيخة.',
      },
    ],
    solution:
      'في الأيام الصعبة، مجرد وجودك بجانبي بصمت هو كل ما أحتاج. لا كلمات كثيرة، فقط حضور دافئ.',
  },
  {
    id: 'difference',
    title: 'اختلاف',
    description: 'عندنا رأي مختلف في شيء بسيط. أنا مصر على رأيي وأنتِ مصرّة على رأيك. شو الحل؟',
    choices: [
      { label: 'نتفاهم وكل واحد يشرح وجهة نظره', value: 'talk' },
      { label: 'أحاول أفهم وجهة نظرك أكثر', value: 'understand' },
      {
        label: 'أقول "خلاص أنا الصح" وأمشي 😤',
        value: 'stubborn',
        isComedy: true,
        comedyAnalysis: '😂 أنا الصح وأمشي! واضح إنش عنيده والعناد يجري في الدم.',
      },
    ],
    solution: 'الاختلاف طبيعي. ليس المهم من الصح، المهم إننا نخرج من النقاش ونحن أقرب لبعض.',
  },
  {
    id: 'space',
    title: 'مساحة شخصية',
    description: 'أطلب منك مساحة يوم أو يومين. هل هذا يخوفك؟ كيف تتصرفين؟',
    choices: [
      { label: 'أحترم طلبك وأعطيك مساحة بثقة', value: 'respect_space' },
      { label: 'أتواصل معك برسالة بسيطة بدون إلحاح', value: 'gentle_message' },
      {
        label: 'أقعد أرسلك ٥٠ رسالة "تمام عليك؟" 😂',
        value: 'spam',
        isComedy: true,
        comedyAnalysis: '😂 ٥٠ رسالة! هذا مو حب هذا تحقيق.',
      },
    ],
    solution: 'طلب المساحة ليس بعدًا. أحيانًا يحتاج الإنسان يتنفس ليعود أقوى. ثقتك بي هي أكبر دعم.',
  },
];
