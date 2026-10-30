import { useState } from "react";
import { products } from "./data/products";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ProductCatalogue from "./components/ProductCatalogue";
import EnquirySection from "./components/EnquirySection";
import Footer from "./components/Footer";

const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

export default function App() {
  const [selectedId, setSelectedId] = useState(products[0].id);
  const [enquiryProductId, setEnquiryProductId] = useState("");
  const enquire = (p) => { setEnquiryProductId(p.id); scrollTo("enquiry"); };
  return (
    <>
      <Navbar onContact={() => scrollTo("enquiry")} />
      <main>
        <Hero onOrder={() => scrollTo("catalogue")} />
        <ProductCatalogue selectedId={selectedId} onSelect={setSelectedId} onEnquire={enquire} />
        <EnquirySection productId={enquiryProductId} />
      </main>
      <Footer />
    </>
  );
}
