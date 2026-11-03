import { useEffect, useState } from 'react';
import type { CartItem } from '../hooks/useCart';
import { FREE_SHIPPING_THRESHOLD } from '../data/products';
import { formatPrice } from '../format';

interface Props {
  open: boolean;
  items: CartItem[];
  subtotal: number;
  onClose: () => void;
  onQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

const SHIPPING_COST = 5.9;

export function CartDrawer({ open, items, subtotal, onClose, onQuantity, onRemove, onCheckout }: Props) {
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    if (!open) setOrdered(false);
  }, [open]);

  const missing = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  const shipping = items.length === 0 || missing === 0 ? 0 : SHIPPING_COST;

  const checkout = () => {
    onCheckout();
    setOrdered(true);
  };

  return (
    <>
      <div className={`overlay ${open ? 'visible' : ''}`} onClick={onClose} />
      <aside className={`drawer ${open ? 'open' : ''}`} aria-hidden={!open} aria-label="Carrello">
        <header className="drawer-header">
          <h2>Il tuo carrello</h2>
          <button className="icon-btn" onClick={onClose} aria-label="Chiudi carrello">✕</button>
        </header>

        {ordered ? (
          <div className="empty">
            <span className="empty-emoji">💐</span>
            <h3>Grazie per l'ordine!</h3>
            <p>I tuoi fiori stanno per partire. (È una demo, nessun pagamento reale.)</p>
          </div>
        ) : items.length === 0 ? (
          <div className="empty">
            <span className="empty-emoji">🌱</span>
            <h3>Il carrello è vuoto</h3>
            <p>Aggiungi qualcosa di bello!</p>
          </div>
        ) : (
          <>
            <div className="shipping">
              <p>
                {missing > 0
                  ? <>Ti mancano <strong>{formatPrice(missing)}</strong> per la spedizione gratuita</>
                  : <>🎉 Spedizione gratuita sbloccata!</>}
              </p>
              <div className="progress"><div style={{ width: `${progress}%` }} /></div>
            </div>

            <ul className="cart-list">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="cart-item">
                  <span className="cart-thumb" style={{ background: product.tint }}>{product.emoji}</span>
                  <div className="cart-info">
                    <strong>{product.name}</strong>
                    <span>{formatPrice(product.price)}</span>
                    <button className="link-btn" onClick={() => onRemove(product.id)}>Rimuovi</button>
                  </div>
                  <div className="qty">
                    <button onClick={() => onQuantity(product.id, quantity - 1)} aria-label="Diminuisci">−</button>
                    <span>{quantity}</span>
                    <button onClick={() => onQuantity(product.id, quantity + 1)} aria-label="Aumenta">+</button>
                  </div>
                </li>
              ))}
            </ul>

            <footer className="drawer-footer">
              <div className="row"><span>Subtotale</span><span>{formatPrice(subtotal)}</span></div>
              <div className="row"><span>Spedizione</span><span>{shipping === 0 ? 'Gratis' : formatPrice(shipping)}</span></div>
              <div className="row total"><span>Totale</span><span>{formatPrice(subtotal + shipping)}</span></div>
              <button className="btn btn-primary btn-block" onClick={checkout}>Vai al pagamento</button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}
