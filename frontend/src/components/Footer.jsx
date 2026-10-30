import { useEffect, useRef } from "react";
import { Phone, PhoneCall, Mail, MapPin, Clock, MessageCircle, FileText, ArrowRight, Link2 } from "lucide-react";
import { company as c } from "../data/company";

const fmt = (n) => (n.length === 10 ? `+${c.countryCode} ${n.slice(0, 5)} ${n.slice(5)}` : n);
const links = [
  { label: "Product Catalogue", href: "#catalogue" },
  { label: "Enquire / Order", href: "#enquiry" },
  { label: "Terms & Conditions", href: "#terms" },
];

export default function Footer() {
  const footerRef = useRef(null);
  const sceneRef = useRef(null);

  // One passive scroll listener → one CSS variable (--p: 0..1). No React re-renders, fully reversible.
  useEffect(() => {
    const footer = footerRef.current, scene = sceneRef.current;
    if (!footer || !scene) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    const update = () => {
      raf = 0;
      if (reduce.matches) { scene.style.setProperty("--p", "1"); return; }
      const vh = window.innerHeight;
      const r = footer.getBoundingClientRect();
      const start = vh + 250;                          // starts appearing before the footer is on screen
      const end = vh - Math.min(350, r.height * 0.5);  // fully visible once the footer is well inside
      const t = Math.min(1, Math.max(0, (start - r.top) / (start - end)));
      scene.style.setProperty("--p", (t * t * (3 - 2 * t)).toFixed(4));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    reduce.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      reduce.removeEventListener("change", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <footer className="pf" ref={footerRef}>
      <div className="pf-scene" ref={sceneRef} aria-hidden="true">
        <img src="/images/footer-jute-bg.webp" alt="" width="1672" height="480" loading="lazy" decoding="async" />
      </div>

      <div className="pf-body">
        <div className="pf-cols">
          <div className="pf-col">
            <h2 className="pf-name">{c.name}</h2>
            <p className="pf-tag">{c.tagline}</p>
            <div className="pf-rule" />
            {c.about && <p className="pf-about">{c.about}</p>}
            {c.gst && <div className="pf-item"><FileText size={16} aria-hidden="true" /><span>{c.gst}</span></div>}
          </div>

          <div className="pf-col">
            <h3><PhoneCall size={20} aria-hidden="true" /> Contact</h3>
            <ul>
              {c.phones.map((p) => (
                <li key={p} className="pf-item">
                  <Phone size={16} aria-hidden="true" />
                  <a href={`tel:+${c.countryCode}${p}`}>{fmt(p)}</a>
                  <a className="pf-wa" href={`https://wa.me/${c.countryCode}${p}`} target="_blank" rel="noreferrer" aria-label={`WhatsApp ${fmt(p)}`}>
                    <MessageCircle size={19} aria-hidden="true" />
                  </a>
                </li>
              ))}
              {c.emails.map((e) => (
                <li key={e} className="pf-item"><Mail size={16} aria-hidden="true" /><a href={`mailto:${e}`}>{e}</a></li>
              ))}
              {c.address && <li className="pf-item"><MapPin size={16} aria-hidden="true" /><span>{c.address}</span></li>}
              {c.hours && <li className="pf-item"><Clock size={16} aria-hidden="true" /><span>{c.hours}</span></li>}
            </ul>
          </div>

          <div className="pf-col">
            <h3><Link2 size={20} aria-hidden="true" /> Quick Links</h3>
            <ul>
              {links.map((l) => (
                <li key={l.href} className="pf-item">
                  <ArrowRight size={16} aria-hidden="true" />
                  <a href={l.href} onClick={l.href === "#terms" ? (e) => e.preventDefault() : undefined}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pf-copy">© {new Date().getFullYear()} {c.name}. All rights reserved.</div>
      </div>
    </footer>
  );
}
