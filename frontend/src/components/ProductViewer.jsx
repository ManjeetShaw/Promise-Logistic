import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Move } from "lucide-react";

// If `spin` (a real turntable sequence) is given → drag-to-rotate viewer.
// Otherwise → honest photo gallery with thumbnails.
export default function ProductViewer({ images, spin, alt }) {
  const frames = spin && spin.length > 1 ? spin : null;
  const list = frames || images;
  const n = list.length;
  const [i, setI] = useState(0);
  const drag = useRef(null);
  useEffect(() => setI(0), [images, spin]);
  const wrap = (k) => ((k % n) + n) % n;

  const onDown = (e) => { if (!frames) return; e.currentTarget.setPointerCapture(e.pointerId); drag.current = { x: e.clientX, f: i }; };
  const onMove = (e) => { if (drag.current) setI(wrap(drag.current.f - Math.round((e.clientX - drag.current.x) / 24))); };
  const onUp = () => (drag.current = null);
  const onKey = (e) => {
    if (n < 2) return;
    if (e.key === "ArrowLeft") setI((k) => wrap(k - 1));
    if (e.key === "ArrowRight") setI((k) => wrap(k + 1));
  };

  return (
    <div className="viewer-wrap">
      <div className={`viewer ${frames ? "rotatable" : ""}`} tabIndex={n > 1 ? 0 : -1} onKeyDown={onKey}
        aria-label={n > 1 ? `${alt} — use arrow keys to change view` : undefined}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <img src={list[i]} alt={`${alt} — view ${i + 1}`} draggable={false} />
      </div>
      {n > 1 && (
        <div className="viewer-ctrl">
          <button aria-label="Previous view" onClick={() => setI(wrap(i - 1))}><ChevronLeft size={18} /></button>
          {frames ? (
            <span><Move size={14} aria-hidden="true" /> Drag to rotate · {i + 1}/{n}</span>
          ) : (
            <div className="thumbs">
              {images.map((src, k) => (
                <button key={src} className={k === i ? "on" : ""} aria-label={`Show photo ${k + 1}`} onClick={() => setI(k)}>
                  <img src={src} alt="" />
                </button>
              ))}
            </div>
          )}
          <button aria-label="Next view" onClick={() => setI(wrap(i + 1))}><ChevronRight size={18} /></button>
        </div>
      )}
    </div>
  );
}
