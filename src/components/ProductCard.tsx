import type { Product } from '../data/products';
import { formatPrice } from '../format';

interface Props {
  product: Product;
  onAdd: (product: Product) => void;
}

export function ProductCard({ product, onAdd }: Props) {
  return (
    <article className="card">
      <div className="card-image" style={{ background: product.tint }}>
        <span className="card-emoji" aria-hidden="true">{product.emoji}</span>
        {product.isNew && <span className="badge">Novità</span>}
      </div>
      <div className="card-body">
        <div className="card-top">
          <h3>{product.name}</h3>
          <span className="rating" title={`Valutazione ${product.rating} su 5`}>★ {product.rating.toFixed(1)}</span>
        </div>
        <p>{product.description}</p>
        <div className="card-footer">
          <strong>{formatPrice(product.price)}</strong>
          <button className="btn btn-primary" onClick={() => onAdd(product)}>
            Aggiungi
          </button>
        </div>
      </div>
    </article>
  );
}
