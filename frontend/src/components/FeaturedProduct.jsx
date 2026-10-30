import ProductViewer from "./ProductViewer";
import { Send } from "lucide-react";
export default function FeaturedProduct({ product: p, onEnquire }) {
  return (
    <article className="featured" aria-live="polite">
      <ProductViewer images={p.images} spin={p.spin} alt={p.name} />
      <div className="featured-info" key={p.id}>
        <p className="pid">Product ID · {p.id}</p>
        <h3>{p.name}</h3>
        <dl>
          <div><dt>Dimensions</dt><dd>{p.dimensions}</dd></div>
          <div><dt>Material</dt><dd>{p.material}</dd></div>
          <div><dt>Price</dt><dd className="price">{p.price}</dd></div>
        </dl>
        <button className="btn btn-primary" onClick={() => onEnquire(p)}><Send size={16} aria-hidden="true" /> Enquire About This Product</button>
      </div>
    </article>
  );
}
