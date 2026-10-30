import { products } from "../data/products";
import FeaturedProduct from "./FeaturedProduct";
import ProductSelector from "./ProductSelector";
export default function ProductCatalogue({ selectedId, onSelect, onEnquire }) {
  const product = products.find((p) => p.id === selectedId) || products[0];
  return (
    <section className="section" id="catalogue">
      <div className="container">
        <p className="eyebrow dark">OUR RANGE</p>
        <h2>Jute Bag Catalogue</h2>
        <p className="sub">Select a bag to view its details. Sample specifications and prices shown for demonstration.</p>
        <div className="catalogue">
          <FeaturedProduct product={product} onEnquire={onEnquire} />
          <ProductSelector products={products} selectedId={product.id} onSelect={onSelect} />
        </div>
      </div>
    </section>
  );
}
