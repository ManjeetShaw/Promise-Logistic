export default function ProductSelector({ products, selectedId, onSelect }) {
  return (
    <div className="selector" role="listbox" aria-label="Choose a product" tabIndex={-1}>
      {products.map((p) => (
        <button key={p.id} role="option" aria-selected={p.id === selectedId}
          className={`sel-card ${p.id === selectedId ? "active" : ""}`} onClick={() => onSelect(p.id)}>
          <img src={p.thumb || p.images[0]} alt="" loading="lazy" />
          <span><strong>{p.name}</strong><small>{p.short}</small><em>{p.id}</em></span>
        </button>
      ))}
    </div>
  );
}
