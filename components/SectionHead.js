import Link from "next/link";
import { t } from "@/lib/i18n";

export default function SectionHead({ title, href, plain = false }) {
  return (
    <div className="sec-head">
      <h2 className={plain ? "is-plain" : ""}>{title}</h2>
      <span className="sec-line" aria-hidden="true" />
      {href && (
        <Link href={href} className="sec-more">
          {t("home.viewAll")}
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
        </Link>
      )}
    </div>
  );
}
