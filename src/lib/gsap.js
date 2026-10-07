"use client";

// #region gsap-setup
// تسجيل الإضافات مرة واحدة في ملف واحد، وكل المكونات تستورد من هنا.
// GSAP مجاني بالكامل منذ 3.13، ومعه SplitText، وكلها في حزمة gsap العامة.
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

export { gsap, ScrollTrigger, SplitText, useGSAP };
// #endregion gsap-setup
