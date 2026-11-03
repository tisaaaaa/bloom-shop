export type Category = 'fiori' | 'piante' | 'casa' | 'regali';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: Category;
  emoji: string;
  /** Colore di sfondo della card (al posto della foto) */
  tint: string;
  rating: number;
  isNew?: boolean;
}

export const CATEGORIES: { value: Category | 'tutti'; label: string }[] = [
  { value: 'tutti', label: 'Tutto' },
  { value: 'fiori', label: 'Fiori' },
  { value: 'piante', label: 'Piante' },
  { value: 'casa', label: 'Casa' },
  { value: 'regali', label: 'Regali' },
];

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Bouquet Peonia', description: 'Peonie rosa cipria raccolte a mano, legate con nastro di seta.', price: 39.9, category: 'fiori', emoji: '🌸', tint: '#F6D6DE', rating: 4.9, isNew: true },
  { id: 2, name: 'Tulipani di Primavera', description: 'Dieci tulipani misti, perfetti per un tavolo luminoso.', price: 24.5, category: 'fiori', emoji: '🌷', tint: '#F9E1E6', rating: 4.7 },
  { id: 3, name: 'Girasoli Solari', description: 'Tre girasoli grandi per portare il sole in casa.', price: 18.0, category: 'fiori', emoji: '🌻', tint: '#FBEBC8', rating: 4.6 },
  { id: 4, name: 'Rosa Singola', description: 'Una rosa rossa a stelo lungo, classica e senza tempo.', price: 6.5, category: 'fiori', emoji: '🌹', tint: '#F4CFCF', rating: 4.8 },
  { id: 5, name: 'Monstera Deliciosa', description: 'La pianta da appartamento più amata, vaso in ceramica incluso.', price: 45.0, category: 'piante', emoji: '🪴', tint: '#D5E5D8', rating: 4.8 },
  { id: 6, name: 'Mini Cactus Trio', description: 'Tre piccoli cactus che chiedono pochissima acqua.', price: 15.9, category: 'piante', emoji: '🌵', tint: '#DCE8D2', rating: 4.5 },
  { id: 7, name: 'Lavanda in Vaso', description: 'Profumo di Provenza sul balcone, fiorisce tutta l\'estate.', price: 12.0, category: 'piante', emoji: '💜', tint: '#E4DDF0', rating: 4.6, isNew: true },
  { id: 8, name: 'Candela Fiori di Ciliegio', description: 'Cera di soia, 40 ore di profumo delicato.', price: 19.9, category: 'casa', emoji: '🕯️', tint: '#F8E3E0', rating: 4.7 },
  { id: 9, name: 'Vaso in Ceramica Salvia', description: 'Fatto a mano, smaltato verde salvia opaco.', price: 29.0, category: 'casa', emoji: '🏺', tint: '#D9E4DA', rating: 4.4 },
  { id: 10, name: 'Annaffiatoio Vintage', description: 'In metallo color crema, 1,5 litri.', price: 22.0, category: 'casa', emoji: '🚿', tint: '#EFE8DC', rating: 4.3 },
  { id: 11, name: 'Box Regalo "Ti penso"', description: 'Mini bouquet, candela e biglietto scritto a mano.', price: 49.0, category: 'regali', emoji: '🎁', tint: '#F3D9E4', rating: 5.0, isNew: true },
  { id: 12, name: 'Kit Semi del Giardino', description: 'Semi di margherite, nontiscordardimé e camomilla.', price: 9.9, category: 'regali', emoji: '🌼', tint: '#F6EFCF', rating: 4.5 },
];

export const FREE_SHIPPING_THRESHOLD = 50;
