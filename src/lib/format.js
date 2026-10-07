// #region format
// تنسيق الأرقام والعملة والتواريخ حسب اللغة، عبر Intl المدمج في المتصفح وNode.
// "ar-u-nu-latn": عربي بأرقام لاتينية (0-9). احذف "-u-nu-latn" للأرقام العربية (٠-٩).
const LOCALES = { ar: "ar-u-nu-latn", en: "en" };

export function formatNumber(value, locale, options) {
  return new Intl.NumberFormat(LOCALES[locale], options).format(value);
}

export function formatCurrency(value, locale, currency = "SAR") {
  return formatNumber(value, locale, { style: "currency", currency, maximumFractionDigits: 0 });
}

export function formatDate(date, locale) {
  return new Intl.DateTimeFormat(LOCALES[locale], { dateStyle: "long" }).format(date);
}
// #endregion format
