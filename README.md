# موقع ريم التفاعلي

تجربة تفاعلية شخصية مخصصة لريم (ريم)، تم بناؤها باستخدام أحدث تقنيات الويب لإنشاء موقع هدايا ديناميكي وجميل.

## حزمة التقنيات

| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| React | 19 | بناء واجهة المستخدم |
| TypeScript | 6 | الكتلة النوعية |
| Vite | 8 | بناء وأداء التطوير |
| Tailwind CSS | 4 | التنسيق |
| Framer Motion | 12 | الحركات والتأثيرات |
| Three.js | 0.185 | الرسوم ثلاثية الأبعاد |
| Wrangler | 4 | النشر على Cloudflare Pages |

## التثبيت والتشغيل

### المتطلبات

- Node.js >= 20.0.0
- npm >= 10.0.0

### التثبيت

```bash
npm install
```

### تشغيل خادم التطوير

```bash
npm run dev
```

### بناء المشروع للإنتاج

```bash
npm run build
```

### معاينة الإنتاج

```bash
npm run preview
```

## الأوامر المتاحة

| الأمر | الوصف |
|-------|-------|
| `npm run dev` | تشغيل خادم التطوير المحلي |
| `npm run build` | بناء المشروع للإنتاج (TypeScript + Vite) |
| `npm run lint` | فحص الأخطاء البرمجية باستخدام oxlint |
| `npm run preview` | معاينة بناء الإنتاج محلياً |
| `npm run format` | تنسيق الملفات باستخدام Prettier |
| `npm run format:check` | التحقق من تنسيق الملفات |

## هيكل المشروع

```
src/
├── components/    # مكونات React
├── stages/        # مراحل التجربة التفاعلية
├── hooks/         # خطافات مخصصة
├── context/       # سياق React
├── config/        # إعدادات المشروع
├── types/         # تعريفات TypeScript
├── utils/        # دوال مساعدة
├── audio/        # ملفات الصوت
├── App.tsx       # المكون الرئيسي
├── main.tsx      # نقطة الدخول
└── index.css     # الأنماط العامة
```

## النشر

يتم نشر المشروع على **Cloudflare Pages** باستخدام Wrangler.

```bash
# بناء ونشر
npm run build && npx wrangler pages deploy dist
```

## المساهمة

1. Fork المشروع
2. أنشئ فرع جديد (`git checkout -b feature/اسم-الميزة`)
3. قم بالتعديلات-commit (`git commit -m 'إضافة ميزة جديدة'`)
4. ادفع التغييرات (`git push origin feature/اسم-الميزة`)
5. افتح Pull Request

## الترخيص

هذا مشروع خاص.
