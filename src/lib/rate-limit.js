// #region rate-limit
// حد بسيط في الذاكرة: 5 رسائل لكل عنوان IP كل 10 دقائق.
// يكفي لخادم واحد. على استضافة serverless قد تعمل عدة نسخ من الخادم،
// ولكل نسخة ذاكرتها، فاستخدم مخزناً مشتركاً أو حماية الاستضافة.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map();

export function isRateLimited(key) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > LIMIT;
}
// #endregion rate-limit
