import { useState, useEffect } from "react";
import { products } from "../data/products";

const API = (import.meta.env.VITE_API_URL || "http://localhost:5000").replace(/\/$/, "");
const empty = { name: "", company: "", email: "", phone: "", product: "", quantity: "", message: "" };

const validate = (v) => {
  const e = {};
  if (!v.name.trim()) e.name = "Please enter your full name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) e.email = "Please enter a valid email address.";
  if (!v.phone.trim()) e.phone = "Please enter a phone number.";
  else if (v.phone.replace(/\D/g, "").length < 7) e.phone = "Phone number looks too short.";
  if (!v.product) e.product = "Please choose a product.";
  if (!v.quantity || Number(v.quantity) < 1) e.quantity = "Enter a quantity of at least 1.";
  return e;
};

// Defined OUTSIDE the form component so inputs keep focus while typing.
function Field({ id, label, required, error, children }) {
  return (
    <div className={`field ${error ? "has-error" : ""}`}>
      <label htmlFor={id}>{label}{required ? <span aria-hidden="true"> *</span> : <span className="opt"> (optional)</span>}</label>
      {children}
      {error && <p className="err" id={`${id}-err`} role="alert">{error}</p>}
    </div>
  );
}

export default function EnquiryForm({ productId }) {
  const [v, setV] = useState(empty);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | error | sending | sent | failed

  useEffect(() => { if (productId) setV((s) => ({ ...s, product: productId })); }, [productId]);

  const set = (k) => (e) => {
    setV((s) => ({ ...s, [k]: e.target.value }));
    if (errors[k]) setErrors((s) => ({ ...s, [k]: undefined }));
  };
  const a = (k) => ({ id: k, value: v[k], onChange: set(k), "aria-invalid": !!errors[k], "aria-describedby": errors[k] ? `${k}-err` : undefined });

  const submit = async (e) => {
    e.preventDefault();
    const er = validate(v);
    setErrors(er);
    if (Object.keys(er).length) { setStatus("error"); return; }
    setStatus("sending");
    try {
      const productName = products.find((p) => p.id === v.product)?.name || "";
      const res = await fetch(`${API}/api/enquiries`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...v, productName }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("sent");
      setV({ ...empty, product: v.product });
    } catch {
      setStatus("failed");
    }
  };

  return (
    <form className="panel form" onSubmit={submit} noValidate>
      <h3>Send an Enquiry</h3>
      {status === "sent" && <div className="notice ok" role="status"><strong>Thank you!</strong> Your enquiry has been received. We will contact you shortly.</div>}
      {status === "failed" && <div className="notice bad" role="alert">Sorry, we couldn’t send your enquiry. Please try again or contact us by phone.</div>}
      {status === "error" && <div className="notice bad" role="alert">Please fix the highlighted fields and try again.</div>}
      <div className="row">
        <Field id="name" label="Full name" required error={errors.name}><input {...a("name")} autoComplete="name" /></Field>
        <Field id="company" label="Company name"><input {...a("company")} autoComplete="organization" /></Field>
      </div>
      <div className="row">
        <Field id="email" label="Email address" required error={errors.email}><input type="email" {...a("email")} autoComplete="email" /></Field>
        <Field id="phone" label="Phone number" required error={errors.phone}><input type="tel" {...a("phone")} autoComplete="tel" /></Field>
      </div>
      <div className="row">
        <Field id="product" label="Product of interest" required error={errors.product}>
          <select {...a("product")}>
            <option value="">Select a product…</option>
            {products.map((p) => <option key={p.id} value={p.id}>{p.name} ({p.id})</option>)}
          </select>
        </Field>
        <Field id="quantity" label="Required quantity" required error={errors.quantity}><input type="number" min="1" {...a("quantity")} placeholder="e.g. 500" /></Field>
      </div>
      <Field id="message" label="Message or special requirements"><textarea rows="4" {...a("message")} placeholder="Size, print, colours, delivery timeline…" /></Field>
      <button className="btn btn-primary" type="submit" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Submit Enquiry"}</button>
    </form>
  );
}
