import Image from "next/image";
import Link from "next/link";
import { money } from "@/lib/format";
import { discountPct, isOnSale } from "@/lib/sale";
import { site } from "@/site.config";

// Cartão compacto (seção "Essentials")
export default function ProductTile({ product }) {
  const price = product.priceRange.minVariantPrice;
  const compare = product.compareAtPriceRange.minVariantPrice;
  const sale = isOnSale(product);
  return (
    <Link href={`/products/${product.handle}`} className="ptile">
      <div className={`ptile-img ${site.imagePlate ? "plate" : ""}`}>
        {product.featuredImage && (
          <Image src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} fill sizes="(max-width: 700px) 45vw, (max-width: 1100px) 30vw, 200px" />
        )}
        {sale && <span className="ptile-off">-{discountPct(product)}%</span>}
      </div>
      <h3>{product.title}</h3>
      <p className="ptile-price">{money(price)}{sale && <s>{money(compare)}</s>}</p>
    </Link>
  );
}
