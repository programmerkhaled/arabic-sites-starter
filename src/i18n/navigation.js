import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// نسخ من Link وuseRouter تضيف اللغة الحالية للمسار تلقائياً
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
