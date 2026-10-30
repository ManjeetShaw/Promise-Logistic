import EnquiryForm from "./EnquiryForm";
import LocationMap from "./LocationMap";
export default function EnquirySection({ productId }) {
  return (
    <section className="section alt" id="enquiry">
      <div className="container">
        <p className="eyebrow dark">GET IN TOUCH</p>
        <h2>Enquire or Place an Order</h2>
        <p className="sub">Tell us what you need and we’ll get back to you with a quote.</p>
        <div className="enquiry-grid"><EnquiryForm productId={productId} /><LocationMap /></div>
      </div>
    </section>
  );
}
