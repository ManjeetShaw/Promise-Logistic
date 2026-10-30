import { ArrowRight } from "lucide-react";
import { HERO_IMAGE } from "../data/products";
export default function Hero({ onOrder }) {
  const bg = HERO_IMAGE ? { backgroundImage: `url(${HERO_IMAGE})` } : undefined;
  return (
    <section className={`hero ${HERO_IMAGE ? "" : "hero-placeholder"}`} style={bg} id="top">
      <div className="hero-overlay" />
      <div className="hero-inner">
        <p className="eyebrow">SUSTAINABLE PACKAGING SOLUTIONS</p>
        <h1>Naturally Strong.<br />Thoughtfully Made.</h1>
        <p className="lead">Jute bags are durable, reusable and biodegradable — built to carry heavy loads again and again, and a smart, responsible packaging choice for retailers, brands and wholesale buyers.</p>
        <button className="btn btn-light" onClick={onOrder}>Order Now <ArrowRight size={18} aria-hidden="true" /></button>
      </div>
    </section>
  );
}
