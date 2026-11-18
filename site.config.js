// Edite aqui textos e visual. Produtos, coleções, preços, estoque e imagens vêm do painel da Shopify.
export const site = {
  name: process.env.NEXT_PUBLIC_STORE_NAME || "Minha Loja",
  lang: "en", // "en" | "pt" (veja lib/i18n.js)
  cartBadge: "products", // "products" | "units"

  // Tema: "dark" (padrão, verde neon) | "light" | "system" | "auto-time"
  theme: { default: "dark", darkFrom: 18, darkUntil: 6 },

  // Botão "Checkout": "direct" | "cn" | "password" (veja shopify-theme/LEIA-ME.md)
  checkout: { mode: "direct" },

  // true: fotos de produto (fundo branco) ficam sobre uma placa clara. false: use se suas fotos forem PNG sem fundo.
  imagePlate: true,

  announcement: null, // { text, linkLabel, href } para mostrar uma barra fina abaixo do menu

  // Capa: carrossel. Cada slide vem de (1) metaobjeto "banner" da Shopify ou, se não houver, (2) uma coleção com imagem.
  hero: { badge: "New arrivals", subtitle: "Discover the latest in tech and hardware, built for performance.", cta: "Explore More", interval: 6000 },

  // Seções da home, na ordem. source: "best-selling" | "newest" | "sale" | "collection:handle-da-colecao"
  // layout: "tiles" (cartões compactos) | "spotlight" (cartões largos) | "grid" (cartões de produto)
  sections: [
    { id: "essentials", title: "Essentials", source: "best-selling", limit: 6, layout: "tiles", href: "/shop" },
    { id: "spotlight", title: "Product Spotlight", source: "newest", limit: 4, layout: "spotlight", href: "/shop?sort=newest", plainTitle: true },
  ],

  // Rodapé. Menu "footer" da Shopify (Online Store > Navigation) manda; senão usa estas colunas (só páginas que existem).
  footer: {
    tagline: "Build. Play. Upgrade.",
    menuHandle: "footer",
    menuFallbackTitle: "Info",
    columns: [
      { title: "Info", links: [
        { label: "About Us", page: "about" },
        { label: "Contact", page: "contact" },
        { label: "FAQs", page: "faq" },
        { label: "Shipping", page: "shipping" },
      ] },
    ],
    social: { facebook: "", x: "", instagram: "", youtube: "", discord: "" },
  },

  // Newsletter: "shopify" (cadastra o e-mail como cliente da Shopify, experimental) | "external" (action do Mailchimp/Klaviyo) | "off"
  newsletter: { mode: "shopify", action: "", emailField: "EMAIL" },

  // Selos de pagamento no rodapé (só liste o que a loja realmente aceita). Ex.: ["Visa", "Mastercard", "PayPal"]
  payments: [],

  contact: { email: "", whatsapp: "" },

  // Especificações do produto (metacampos). namespace padrão = "shopify". "Marca" vem do Fornecedor.
  attributes: [
    { label: "Model", namespace: "custom", keys: ["model", "modelo"], headline: true },
    { label: "Warranty", namespace: "custom", keys: ["warranty", "garantia"] },
    { label: "Compatibility", namespace: "custom", keys: ["compatibility", "compatibilidade"] },
    { label: "Connection", namespace: "custom", keys: ["connection", "conexao"] },
    { label: "Technical specifications", namespace: "custom", keys: ["specs", "especificacoes"], block: true },
  ],
};
