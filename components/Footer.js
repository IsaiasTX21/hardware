import Link from "next/link";
import Newsletter from "./Newsletter";
import { t } from "@/lib/i18n";
import { site } from "@/site.config";

const A = ({ l }) =>
  l.external ? (
    <a href={l.href} target="_blank" rel="noopener noreferrer">{l.label}</a>
  ) : (
    <Link href={l.href}>{l.label}</Link>
  );

const SVG = (p) => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...p} />
);
const ICONS = {
  facebook: <SVG><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></SVG>,
  x: <SVG><path d="M4 4l16 16M20 4L4 20" /></SVG>,
  instagram: <SVG><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></SVG>,
  youtube: <SVG><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></SVG>,
  discord: <SVG><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></SVG>,
};

export default function Footer({ columns = [], policies = [] }) {
  const socials = Object.entries(site.footer.social).filter(([, url]) => url);
  const nl = site.newsletter;

  return (
    <footer className="footer">
      <div className="wrap footer-grid">
        <div className="f-brand">
          <strong>{site.name}</strong>
          {site.footer.tagline && <p>{site.footer.tagline}</p>}
          {socials.length > 0 && (
            <div className="social">
              {socials.map(([n, url]) => (
                <a key={n} href={url} target="_blank" rel="noopener noreferrer" aria-label={n} title={n}>
                  {ICONS[n] || <span>{n.slice(0, 2)}</span>}
                </a>
              ))}
            </div>
          )}
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4>{col.title}</h4>
            <ul>{col.links.map((l) => <li key={l.href + l.label}><A l={l} /></li>)}</ul>
          </div>
        ))}

        <div>
          <h4>{t("footer.info")}</h4>
          <ul>
            <li><Link href="/search">{t("search.title")}</Link></li>
            {policies.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
          </ul>
        </div>

        {nl.mode !== "off" && (
          <Newsletter mode={nl.mode} shopDomain={process.env.SHOPIFY_STORE_DOMAIN} action={nl.action} emailField={nl.emailField} />
        )}
      </div>

      <div className="wrap footer-base">
        <p>© {new Date().getFullYear()} {site.name}. {t("footer.rights")}</p>
        {site.payments.length > 0 && (
          <div className="payments">{site.payments.map((p) => <span key={p}>{p}</span>)}</div>
        )}
      </div>
    </footer>
  );
}
