import { useMemo, useState } from 'react';
import { CATEGORIES, PRODUCTS, type Category, type Product } from './data/products';
import { useCart } from './hooks/useCart';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';

type SortKey = 'consigliati' | 'prezzo-asc' | 'prezzo-desc' | 'valutazione';

export default function App() {
  const cart = useCart();
  const [category, setCategory] = useState<Category | 'tutti'>('tutti');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('consigliati');
  const [cartOpen, setCartOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const visibleProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        (category === 'tutti' || p.category === category) &&
        (q === '' || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)),
    );
    const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
      consigliati: (a, b) => Number(!!b.isNew) - Number(!!a.isNew) || a.id - b.id,
      'prezzo-asc': (a, b) => a.price - b.price,
      'prezzo-desc': (a, b) => b.price - a.price,
      valutazione: (a, b) => b.rating - a.rating,
    };
    return [...filtered].sort(sorters[sort]);
  }, [category, query, sort]);

  const addToCart = (product: Product) => {
    cart.add(product);
    setToast(`${product.emoji} ${product.name} aggiunto al carrello`);
    window.setTimeout(() => setToast(null), 2000);
  };

  return (
    <>
      <header className="navbar">
        <a className="logo" href="#">bloom<span>.</span></a>
        <button className="cart-btn" onClick={() => setCartOpen(true)} aria-label="Apri carrello">
          🛍️ <span className="cart-count">{cart.count}</span>
        </button>
      </header>

      <section className="hero">
        <p className="eyebrow">🌿 Fiori freschi · consegna in 24h</p>
        <h1>Porta un po' di <em>primavera</em> a casa tua</h1>
        <p className="hero-sub">Bouquet, piante e piccoli regali scelti con cura. Spedizione gratuita sopra i 50 €.</p>
      </section>

      <main className="container">
        <div className="toolbar">
          <div className="chips" role="tablist">
            {CATEGORIES.map((c) => (
              <button
                key={c.value}
                role="tab"
                aria-selected={category === c.value}
                className={`chip ${category === c.value ? 'active' : ''}`}
                onClick={() => setCategory(c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>
          <div className="filters">
            <input
              type="search"
              placeholder="Cerca peonie, candele…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Cerca prodotti"
            />
            <select value={sort} onChange={(e) => setSort(e.target.value as SortKey)} aria-label="Ordina">
              <option value="consigliati">Consigliati</option>
              <option value="prezzo-asc">Prezzo crescente</option>
              <option value="prezzo-desc">Prezzo decrescente</option>
              <option value="valutazione">Più amati</option>
            </select>
          </div>
        </div>

        {visibleProducts.length > 0 ? (
          <div className="grid">
            {visibleProducts.map((p) => (
              <ProductCard key={p.id} product={p} onAdd={addToCart} />
            ))}
          </div>
        ) : (
          <div className="empty">
            <span className="empty-emoji">🥀</span>
            <h3>Nessun prodotto trovato</h3>
            <p>Prova con un'altra parola o categoria.</p>
          </div>
        )}
      </main>

      <footer className="site-footer">
        Progetto demo di <a href="https://github.com/tisaaaaa">Anna Tiso</a> · React + TypeScript 🌸
      </footer>

      <CartDrawer
        open={cartOpen}
        items={cart.items}
        subtotal={cart.subtotal}
        onClose={() => setCartOpen(false)}
        onQuantity={cart.setQuantity}
        onRemove={cart.remove}
        onCheckout={cart.clear}
      />

      {toast && <div className="toast" role="status">{toast}</div>}
    </>
  );
}
