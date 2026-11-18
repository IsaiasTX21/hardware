// Busca precisa: cada palavra digitada precisa aparecer (como início de palavra) no título, na marca, no tipo,
// nas tags ou na categoria do produto. A descrição NÃO conta (era ela que trazia resultados sem relação).
const norm = (s = "") => s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
const words = (s = "") => norm(s).split(/[^a-z0-9]+/).filter(Boolean);

export function rankProducts(products, query) {
  const tokens = words(query);
  if (!tokens.length) return products;
  const phrase = tokens.join(" ");
  const scored = [];

  products.forEach((p, idx) => {
    const title = words(p.title);
    const compactTitle = title.join("");
    const other = [
      ...words(p.vendor),
      ...words(p.productType),
      ...(p.tags ?? []).flatMap(words),
      ...(p.collections?.nodes ?? []).flatMap((c) => words(c.title)),
    ];

    let score = 0;
    for (const tk of tokens) {
      const pos = title.findIndex((w) => w.startsWith(tk));
      if (pos >= 0) score += 10 - Math.min(pos, 5);               // no título (quanto mais cedo, melhor)
      else if (tk.length >= 4 && compactTitle.includes(tk)) score += 6; // "rtx5070" acha "RTX 5070"
      else if (other.some((w) => w.startsWith(tk))) score += 3;    // marca, tipo, tag, categoria
      else return;                                                  // faltou uma palavra: fora
    }
    if (title.join(" ").includes(phrase)) score += 5;               // frase inteira no título
    if (title[0]?.startsWith(tokens[0])) score += 2;                // título começa com o termo
    scored.push({ p, score, idx });
  });

  return scored.sort((a, b) => b.score - a.score || a.idx - b.idx).map((x) => x.p);
}
