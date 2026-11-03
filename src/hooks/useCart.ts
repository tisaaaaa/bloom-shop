import { useEffect, useMemo, useReducer } from 'react';
import type { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

type Action =
  | { type: 'add'; product: Product }
  | { type: 'setQuantity'; id: number; quantity: number }
  | { type: 'remove'; id: number }
  | { type: 'clear' };

const STORAGE_KEY = 'bloom-cart';

function cartReducer(state: CartItem[], action: Action): CartItem[] {
  switch (action.type) {
    case 'add': {
      const existing = state.find((item) => item.product.id === action.product.id);
      if (existing) {
        return state.map((item) =>
          item.product.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...state, { product: action.product, quantity: 1 }];
    }
    case 'setQuantity':
      if (action.quantity <= 0) return state.filter((item) => item.product.id !== action.id);
      return state.map((item) =>
        item.product.id === action.id ? { ...item, quantity: action.quantity } : item,
      );
    case 'remove':
      return state.filter((item) => item.product.id !== action.id);
    case 'clear':
      return [];
  }
}

function loadCart(): CartItem[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? (JSON.parse(saved) as CartItem[]) : [];
  } catch {
    return [];
  }
}

/** Carrello con useReducer, salvato in localStorage così resta dopo il refresh. */
export function useCart() {
  const [items, dispatch] = useReducer(cartReducer, [], loadCart);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage non disponibile (es. navigazione privata): il carrello resta in memoria
    }
  }, [items]);

  const totals = useMemo(() => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
    return { count, subtotal };
  }, [items]);

  return {
    items,
    ...totals,
    add: (product: Product) => dispatch({ type: 'add', product }),
    setQuantity: (id: number, quantity: number) => dispatch({ type: 'setQuantity', id, quantity }),
    remove: (id: number) => dispatch({ type: 'remove', id }),
    clear: () => dispatch({ type: 'clear' }),
  };
}
