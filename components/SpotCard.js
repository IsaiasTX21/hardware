import Image from "next/image";
import Link from "next/link";
import { money } from "@/lib/format";
import { isOnSale } from "@/lib/sale";
import { site } from "@/site.config";

// Cartão largo (seção "Product Spotlight")
export default function SpotCard({ product }) {
  const price = product.priceRange.minVariantPrice;
  const compare = product.compareAtPriceRange.minVariantPrice;
  const sale = isOnSale(product);
  return (
    <Link href={`/products/${product.handle}`} className="spot">
      <div className={`spot-img ${site.imagePlate ? "plate" : ""}`}>
        {product.featuredImage && (
          <Image src={product.featuredImage.url} alt={product.featuredImage.altText || product.title} fill sizes="(max-width: 700px) 40vw, 180px" />
        )}
      </div>
      <div className="spot-info">
        <h3>{product.title}</h3>
        <p className="spot-price">{money(price)}{sale && <s>{money(compare)}</s>}</p>
      </div>
    </Link>
  );
}
