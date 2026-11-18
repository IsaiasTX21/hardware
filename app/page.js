import HeroCarousel from "@/components/HeroCarousel";
import ProductCard from "@/components/ProductCard";
import ProductTile from "@/components/ProductTile";
import SectionHead from "@/components/SectionHead";
import SpotCard from "@/components/SpotCard";
import { buildHome } from "@/lib/home";
import { t } from "@/lib/i18n";
import { site } from "@/site.config";

export default async function Home() {
  const { slides, sections } = await buildHome();

  return (
    <>
      <h1 className="sr-only">{site.name}</h1>
      <HeroCarousel slides={slides} interval={site.hero.interval} />

      {sections.map((s) => (
        <section key={s.id} className="wrap section" aria-label={s.title}>
          <SectionHead title={s.title} href={s.href} plain={s.plainTitle} />
          {s.layout === "spotlight" ? (
            <div className="spotlight">{s.products.map((p) => <SpotCard key={p.id} product={p} />)}</div>
          ) : s.layout === "grid" ? (
            <div className="grid">{s.products.map((p) => <ProductCard key={p.id} product={p} />)}</div>
          ) : (
            <div className="essentials">{s.products.map((p) => <ProductTile key={p.id} product={p} />)}</div>
          )}
        </section>
      ))}

      {sections.length === 0 && <p className="wrap empty-note">{t("home.empty")}</p>}
    </>
  );
}
