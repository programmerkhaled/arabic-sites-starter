// مختبر الفصل 1: عشرة أخطاء RTL شهيرة، كل خطأ بجانب إصلاحه.
// الصفحة عربية دائماً (dir="rtl") حتى تظهر الأخطاء حتى لو فُتحت من /en.
// احذف مجلد lab من مشروعك الحقيقي قبل النشر.

export const metadata = {
  title: "مختبر أخطاء RTL",
  robots: { index: false },
};

function Case({ n, title, broken, fixed, note }) {
  return (
    <section className="rounded-2xl border border-line bg-surface p-5">
      <h2 className="mbe-4 flex items-center gap-3 text-lg font-bold">
        <span className="grid size-8 place-items-center rounded-full bg-ink text-sm text-paper">
          {n}
        </span>
        {title}
      </h2>
      {/* عمودان دائماً: الخطأ والإصلاح متجاوران حتى على الشاشات الضيقة */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border-2 border-dashed border-ink/30 bg-paper p-4">
          <p className="mbe-2 text-xs font-bold text-ink/60">✕ الخطأ</p>
          {broken}
        </div>
        <div className="rounded-xl border-2 border-ink bg-paper p-4">
          <p className="mbe-2 text-xs font-bold text-ink/60">✓ الإصلاح</p>
          {fixed}
        </div>
      </div>
      <p className="mbs-3 text-sm text-ink/70">{note}</p>
    </section>
  );
}

// #region arrow
function ArrowIcon({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}
      aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
// #endregion arrow

// #region split-chars
function SplitChars({ text }) {
  // تقسيم النص لحروف منفصلة: كل حرف في عنصر مستقل
  return text.split("").map((char, i) => (
    <span key={i} className="inline-block">
      {char === " " ? " " : char}
    </span>
  ));
}
// #endregion split-chars

export default function RtlLab() {
  return (
    <main dir="rtl" lang="ar" className="mx-auto max-w-5xl space-y-6 px-4 py-12">
      <header className="mbe-8">
        <h1 className="text-3xl font-bold">مختبر أخطاء RTL</h1>
        <p className="mbs-2 text-ink/70">عشرة أخطاء تظهر في أغلب المواقع العربية، وإصلاح كل واحد منها.</p>
      </header>

      <Case
        n="1"
        title="سهم «التالي» يشير للخلف"
        broken={
          <button className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-paper">
            التالي <ArrowIcon />
          </button>
        }
        fixed={
          // #region arrow-fixed
          <button className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-paper">
            التالي <ArrowIcon className="rtl:-scale-x-100" />
          </button>
          // #endregion arrow-fixed
        }
        note="الأسهم تعني «للأمام» و«للخلف»، والأمام في العربية جهة اليسار. اعكس الأيقونات الاتجاهية فقط."
      />

      <Case
        n="2"
        title="رقم الهاتف مقلوب"
        broken={<p>الجوال: +970 59 123 4567</p>}
        fixed={
          // #region phone-fixed
          <p>
            الجوال: <bdi dir="ltr" className="whitespace-nowrap">+970 59 123 4567</bdi>
          </p>
          // #endregion phone-fixed
        }
        note="الأرقام المفصولة بمسافات وعلامة + تُعامل كمقاطع منفصلة، فيُعاد ترتيبها من اليمين. اعزل الرقم كمقطع LTR واحد."
      />

      <Case
        n="3"
        title="هامش ثابت على اليسار"
        broken={
          <p className="flex items-center">
            <span className="size-3 rounded-full bg-accent ring-2 ring-ink" />
            <span className="ml-3">متصل الآن</span>
          </p>
        }
        fixed={
          // #region margin-fixed
          <p className="flex items-center">
            <span className="size-3 rounded-full bg-accent ring-2 ring-ink" />
            <span className="ms-3">متصل الآن</span>
          </p>
          // #endregion margin-fixed
        }
        note="ml-3 يبقى على اليسار في الاتجاهين. ms-3 تعني «بداية السطر»: يمين في العربية، يسار في الإنجليزية."
      />

      <Case
        n="4"
        title="محاذاة لليسار"
        broken={<p className="text-left">هذه الفقرة محاذاة لليسار في صفحة عربية.</p>}
        fixed={<p className="text-start">هذه الفقرة محاذاة لبداية السطر.</p>}
        note="text-left يكسر العربية، وtext-right يكسر الإنجليزية. text-start يعمل في الاتجاهين."
      />

      <Case
        n="5"
        title="علامة التعجب قفزت لأول الجملة"
        broken={<p>رسالة العميل: Great work!</p>}
        fixed={
          // #region punctuation-fixed
          <p>
            رسالة العميل: <span dir="ltr" lang="en">Great work!</span>
          </p>
          // #endregion punctuation-fixed
        }
        note="علامات الترقيم «محايدة» وتأخذ اتجاه ما حولها. في آخر جملة داخل سياق RTL تذهب لأقصى اليسار."
      />

      <Case
        n="6"
        title="علامة @ تقفز أثناء كتابة الإيميل"
        broken={
          <input
            type="email"
            defaultValue="khaled@"
            className="w-full rounded-lg border border-line bg-surface px-3 py-2"
          />
        }
        fixed={
          // #region email-fixed
          <input
            type="email"
            dir="ltr"
            defaultValue="khaled@"
            className="w-full rounded-lg border border-line bg-surface px-3 py-2 text-start"
          />
          // #endregion email-fixed
        }
        note="في حقل RTL، العلامة في آخر النص (@ أو .) تظهر في أوله حتى تكتب الحرف التالي. الإيميل والرابط والهاتف تُكتب من اليسار دائماً."
      />

      <Case
        n="7"
        title="شارة «جديد» في الزاوية الخطأ"
        broken={
          <div className="relative rounded-lg bg-surface p-6">
            <span className="absolute left-2 top-2 rounded-full bg-ink px-2 text-xs text-paper">جديد</span>
            بطاقة منتج
          </div>
        }
        fixed={
          // #region inset-fixed
          <div className="relative rounded-lg bg-surface p-6">
            <span className="absolute inset-s-2 top-2 rounded-full bg-ink px-2 text-xs text-paper">جديد</span>
            بطاقة منتج
          </div>
          // #endregion inset-fixed
        }
        note="left-2 مكان ثابت. inset-s-2 يضع الشارة في زاوية بداية القراءة."
      />

      <Case
        n="8"
        title="شريط التقدم يمتلئ من الجهة الخطأ"
        broken={
          <div className="h-3 overflow-hidden rounded-full bg-line">
            <div className="h-full origin-left scale-x-60 bg-ink" />
          </div>
        }
        fixed={
          // #region progress-fixed
          <div className="h-3 overflow-hidden rounded-full bg-line">
            <div className="h-full origin-left scale-x-60 bg-ink rtl:origin-right" />
          </div>
          // #endregion progress-fixed
        }
        note="transform-origin ليس له قيمة منطقية (start/end)، فهنا تحتاج rtl: فعلاً. نفس الشيء مع scaleX في GSAP."
      />

      <Case
        n="9"
        title="تقسيم النص لحروف للحركة"
        broken={
          <p className="text-xl font-bold">
            <SplitChars text="مرحباً بك" />
          </p>
        }
        fixed={<p className="text-xl font-bold">مرحباً بك</p>}
        note="كل حرف في عنصر منفصل يفقد شكله المتصل. حرّك الكلمات أو الأسطر بدل الحروف (الفصل 6)."
      />

      <Case
        n="10"
        title="flex-row-reverse لعكس الاتجاه"
        broken={
          <nav className="flex flex-row-reverse gap-4">
            <span className="font-bold">الرئيسية</span>
            <span>خدماتنا</span>
            <span>تواصل</span>
          </nav>
        }
        fixed={
          <nav className="flex gap-4">
            <span className="font-bold">الرئيسية</span>
            <span>خدماتنا</span>
            <span>تواصل</span>
          </nav>
        }
        note="dir=rtl يعكس ترتيب flex تلقائياً. إضافة row-reverse فوقه تعكسه مرة ثانية، فيرجع الترتيب للمقلوب."
      />
    </main>
  );
}
