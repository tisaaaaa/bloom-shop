<h1 align="center">🌷 bloom-shop</h1>

<p align="center">
  Mini e-commerce di un negozio di fiori, fatto con <b>React + TypeScript</b>.<br/>
  <a href="https://tisaaaaa.github.io/bloom-shop/"><b>👉 Prova la demo live</b></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-E7A1B0?style=flat-square&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-strict-6F9A80?style=flat-square&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-5-213B38?style=flat-square&logo=vite&logoColor=white"/>
</p>

---

## ✨ Cosa fa

- **Catalogo** con filtro per categoria, ricerca testuale e ordinamento (prezzo, valutazione, novità)
- **Carrello** a scomparsa: aggiungi, cambia quantità, rimuovi
- Il carrello **resta salvato** anche dopo aver ricaricato la pagina (`localStorage`)
- **Barra della spedizione gratuita** che si riempie man mano (soglia 50 €)
- Prezzi formattati in euro con `Intl.NumberFormat`
- Responsive, con notifiche "toast" e animazioni leggere

## 🧠 Scelte tecniche

| Cosa | Perché |
|---|---|
| `useReducer` nel hook [`useCart`](src/hooks/useCart.ts) | Tutte le modifiche al carrello passano da un unico punto: più facile da leggere e da testare |
| `useMemo` per filtri e ordinamento | Il catalogo viene ricalcolato solo quando cambiano categoria, ricerca o ordinamento |
| Nessuna libreria UI | CSS scritto a mano con variabili, per avere il controllo completo sullo stile |
| GitHub Actions | A ogni push su `main` il sito viene compilato e pubblicato su GitHub Pages |

## 🚀 Avvio in locale

```bash
npm install
npm run dev
```

## 🌿 Progetto collegato

Il backend dello stesso negozio è in [**bloom-api**](https://github.com/tisaaaaa/bloom-api) (Node.js + PostgreSQL).

---

<p align="center"><sub>Fatto con 💚 da <a href="https://github.com/tisaaaaa">Anna Tiso</a></sub></p>
