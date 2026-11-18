import { localHref } from "./links";
import { getSaleProducts } from "./sale";
import { getBanners, getCollection, getCollections, getProducts } from "./shopify";
import { site } from "@/site.config";

// "Hardware|Insights" ou "Hardware Insights": a última parte vira o destaque verde
function splitTitle(title = "") {
  if (title.includes("|")) { const [a, ...b] = title.split("|"); return { line1: a.trim(), line2: b.join(" ").trim() }; }
  const w = title.trim().split(/\s+/);
  return w.length === 1 ? { line1: "", line2: w[0] } : { line1: w.slice(0, -1).join(" "), line2: w[w.length - 1] };
}
const short = (s = "", n = 140) => (s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s);

async function resolveSource(def) {
  const src = def.source || "best-selling";
  if (src === "best-selling" || src === "newest") return getProducts({ first: 24, sort: src });
  if (src === "sale") return getSaleProducts();
  if (src.startsWith("collection:")) return (await getCollection(src.slice(11)))?.products?.nodes ?? [];
  return [];
}

export async function buildHome() {
  const [collections, meta] = await Promise.all([
    getCollections(20).catch(() => []),
    getBanners().catch(() => []),
  ]);

  // Slides: metaobjetos "banner" (se existirem) ou uma coleção por slide
  let slides = meta.filter((m) => m.title).map((m) => {
    const l = m.link ? localHref(m.link) : { href: "/shop", external: false };
    return { ...splitTitle(m.title), badge: m.badge || site.hero.badge, text: m.subtitle || "", button: m.button || site.hero.cta,
      href: l.href, external: l.external, image: m.image && typeof m.image === "object" ? m.image : null };
  });
  if (!slides.length) {
    slides = collections.map((c) => ({
      ...splitTitle(c.title), badge: site.hero.badge, text: short(c.description) || site.hero.subtitle, button: site.hero.cta,
      href: `/collections/${c.handle}`, external: false, image: c.image || c.products.nodes[0]?.featuredImage || null,
    })).filter((s) => s.image).slice(0, 6);
  }
  if (!slides.length) slides = [{ line1: "", line2: site.name, badge: site.hero.badge, text: site.hero.subtitle, button: site.hero.cta, href: "/shop", external: false, image: null }];

  const sections = [];
  for (const def of site.sections) {
    const products = await resolveSource(def).catch(() => []);
    if (products.length) sections.push({ ...def, products: products.slice(0, def.limit ?? 6) });
  }
  return { slides, sections };
}
