import { ViewTransition } from "react";

// #region page-transition
// يلف محتوى كل صفحة (وليس الـ layout: الـ layout لا يُعاد تركيبه فلا تعمل enter/exit فيه).
// نوع الانتقال يأتي من transitionTypes على الرابط، والاتجاه الفعلي يحدده CSS حسب dir.
export default function PageTransition({ children }) {
  const types = { "nav-forward": "nav-forward", "nav-back": "nav-back", default: "none" };
  return (
    <ViewTransition enter={types} exit={types} default="none">
      {children}
    </ViewTransition>
  );
}
// #endregion page-transition
