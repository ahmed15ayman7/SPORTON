# SPORTON Frontend

تطبيق الواجهة الأمامية لـ SPORTON، مبني باستخدام Next.js و TypeScript.

## المتطلبات

- Node.js 18.x أو أحدث
- npm 9.x أو أحدث

## التثبيت

1. قم بنسخ المستودع:
```bash
git clone https://github.com/yourusername/sporton.git
cd sporton/apps/frontend
```

2. قم بتثبيت التبعيات:
```bash
npm install
```

3. قم بإنشاء ملف `.env.local` وأضف المتغيرات البيئية المطلوبة:
```env
# Next Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth
FACEBOOK_CLIENT_ID=your-facebook-client-id
FACEBOOK_CLIENT_SECRET=your-facebook-client-secret

# Discord OAuth
DISCORD_CLIENT_ID=your-discord-client-id
DISCORD_CLIENT_SECRET=your-discord-client-secret

# API
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## التطوير

لتشغيل التطبيق في وضع التطوير:

```bash
npm run dev
```

سيتم فتح التطبيق تلقائياً على [http://localhost:3000](http://localhost:3000).

## البناء

لبناء التطبيق للإنتاج:

```bash
npm run build
```

## التشغيل

لتشغيل التطبيق في وضع الإنتاج:

```bash
npm start
```

## الميزات

- ✅ المصادقة متعددة الموفرين (Google, Facebook, Discord)
- ✅ التحقق من رقم الهاتف
- ✅ واجهة مستخدم متجاوبة
- ✅ دعم الوضع المظلم
- ✅ نظام إشعارات متقدم
- ✅ تحسين الأداء
- ✅ دعم اللغة العربية
- ✅ حماية CSRF
- ✅ حماية HPP
- ✅ رؤوس HTTP الأمنية

## المساهمة

نرحب بمساهماتكم! يرجى اتباع الخطوات التالية:

1. قم بعمل Fork للمستودع
2. قم بإنشاء فرع جديد (`git checkout -b feature/amazing-feature`)
3. قم بعمل Commit للتغييرات (`git commit -m 'Add some amazing feature'`)
4. قم بعمل Push إلى الفرع (`git push origin feature/amazing-feature`)
5. قم بفتح طلب Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT - انظر ملف [LICENSE](LICENSE) للمزيد من التفاصيل.

## هيكل المشروع

- `app/`: صفحات التطبيق
- `components/`: المكونات القابلة لإعادة الاستخدام
- `features/`: الميزات الرئيسية
- `hooks/`: Hooks مخصصة
- `lib/`: مكتبات وأدوات مساعدة
- `services/`: خدمات API
- `store/`: إدارة الحالة
- `types/`: التعريفات النوعية

## التقنيات المستخدمة

- Next.js
- React
- TypeScript
- TailwindCSS
- Ant Design
- Redux Toolkit
- Zustand
- Next-Auth
- Socket.IO
- AWS Services
- Stripe
- Next-Intl

## المساهمة

يرجى قراءة [دليل المساهمة](CONTRIBUTING.md) للمزيد من المعلومات حول كيفية المساهمة في المشروع. 