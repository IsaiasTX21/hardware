"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { t } from "@/lib/i18n";
import { site } from "@/site.config";


export default function HeroCarousel({ slides, interval = 6000 }) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const touchX = useRef(null);
  const count = slides.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const playing = count > 1 && !userPaused && !hover && !reduced;
  useEffect(() => {
    if (!playing) return;
    const timer = setInterval(() => setI((n) => (n + 1) % count), interval);
    return () => clearInterval(timer);
  }, [playing, count, interval, i]);

  const go = (n) => setI(((n % count) + count) % count);
  function onTouchEnd(e) {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1));
  }

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label={t("hero.aria")}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={onTouchEnd}
    >
      {slides.map((s, k) => {
        const active = k === i;
        const Tag = s.external ? "a" : Link;
        const linkProps = s.external ? { href: s.href, target: "_blank", rel: "noopener noreferrer" } : { href: s.href };
        return (
          <div
            key={s.href + k}
            className={`hero-slide ${active ? "is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={t("hero.group", { i: k + 1, n: count })}
            aria-hidden={!active}
          >
            <div className="hero-inner">
              <div className="hero-copy">
                {s.badge && <span className="hero-badge">{s.badge}</span>}
                <h2 className="hero-title">
                  {s.line1 && <span>{s.line1}</span>}
                  <span className="accent">{s.line2}</span>
                </h2>
                {s.text && <p className="hero-text">{s.text}</p>}
                <Tag {...linkProps} className="hero-btn" tabIndex={active ? 0 : -1}>
                  {s.button || site.hero.cta}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </Tag>
              </div>
              <div className={`hero-media ${site.imagePlate ? "plate" : ""}`}>
                {s.image && <Image src={s.image.url} alt={s.image.altText || ""} fill priority={k === 0} sizes="(max-width: 700px) 300px, (max-width: 1024px) 400px, (max-width: 1199px) 480px, 560px" />}
              </div>
            </div>
          </div>
        );
      })}

      {count > 1 && (
        <>
          <div className="hero-ui">
       
            <div className="hero-dots">
              {slides.map((s, k) => (
                <button key={s.href + k} className={k === i ? "is-on" : ""} aria-label={t("hero.goto", { name: `${s.line1} ${s.line2}`.trim() })} aria-current={k === i} onClick={() => go(k)} />
              ))}
            </div>
          </div>
          <p className="sr-only" aria-live={playing ? "off" : "polite"}>{t("hero.slideOf", { i: i + 1, n: count, name: `${slides[i].line1} ${slides[i].line2}`.trim() })}</p>
        </>
      )}
    </section>
  );
}
