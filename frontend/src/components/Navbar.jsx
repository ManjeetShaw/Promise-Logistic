import { Leaf } from "lucide-react";
export default function Navbar({ onContact }) {
  return (
    <header className="navbar">
      <a className="brand" href="#top" aria-label="Promise Logistics home"><Leaf size={20} aria-hidden="true" />Promise Logistics</a>
      <button className="btn btn-primary btn-sm" onClick={onContact}>Contact Us</button>
    </header>
  );
}
