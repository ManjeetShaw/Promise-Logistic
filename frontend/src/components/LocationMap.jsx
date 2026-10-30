import { MapPin } from "lucide-react";
// TODO: replace with the real Google Maps embed URL (Google Maps → Share → Embed a map → copy src).
const MAP_EMBED_URL = "https://www.google.com/maps?q=India&z=4&output=embed";
export default function LocationMap() {
  return (
    <div className="panel map">
      <h3>Our Location</h3>
      <div className="map-frame">
        <iframe title="Promise Logistics location map (placeholder)" src={MAP_EMBED_URL} loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
      </div>
      <p className="map-note"><MapPin size={16} aria-hidden="true" /> Placeholder map — our business address will be added here soon.</p>
    </div>
  );
}
