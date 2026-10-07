// #region find-overflow
// الصقه في كونسول المتصفح: يطبع العناصر التي تخرج عن عرض الصفحة وتسبب تمريراً أفقياً.
// في RTL يأتي التمرير مما يخرج من اليسار، وفي LTR مما يخرج من اليمين، والجهة الأخرى لا تُمرَّر.
// العناصر داخل حاوية تقص المحتوى (overflow: hidden أو clip) لا تسبب تمريراً، فتُستثنى.
(() => {
  const root = document.documentElement;
  const width = root.clientWidth;
  const rtl = getComputedStyle(root).direction === "rtl";
  const clipped = (el) => {
    for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
      if (["hidden", "clip"].includes(getComputedStyle(p).overflowX)) return true;
    }
    return false;
  };
  const found = [...document.body.querySelectorAll("*")]
    .map((el) => ({ el, box: el.getBoundingClientRect() }))
    .filter(({ el, box }) => box.width && (rtl ? box.left < -1 : box.right > width + 1) && !clipped(el));

  console.log(`dir=${root.dir} scrollWidth=${root.scrollWidth} clientWidth=${width}`);
  console.table(
    found.slice(0, 15).map(({ el, box }) => ({
      element: el.tagName.toLowerCase() + (el.id ? `#${el.id}` : ""),
      class: String(el.className).slice(0, 40),
      left: Math.round(box.left),
      right: Math.round(box.right),
    })),
  );
})();
// #endregion find-overflow
