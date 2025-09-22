# GrooveGear — E‑commerce (Music Store)

A simple, client-side e‑commerce application for managing and purchasing music tracks/albums. Products and cart data persist in the browser via localStorage. Built with HTML, Tailwind CSS (via a prebuilt script), and vanilla JavaScript.

## Features

- Product management
  - Add, edit, and delete music items (name, artist, genre, release date, price, image URL)
  - Inline validation with alert feedback
  - Persists products to localStorage
- Product catalog
  - Responsive product grid with image, price badge, and genre tag
  - Product detail page with larger image and add-to-cart action
- Shopping cart
  - Add to cart from catalog and product detail pages
  - Increment/decrement quantity, remove items, and clear the cart
  - Subtotal per line and total calculation
  - Persists cart to localStorage
- UI/UX
  - Active navigation highlighting based on current page
  - Responsive layout using Tailwind CSS

## Tech Stack

- HTML5
- CSS (Tailwind CSS via `tailwind.js` script)
- JavaScript (Vanilla)
- Web Storage API (localStorage)

## Project Structure

- index.html — Home/catalog grid
- manageProducts.html — Admin-like page to add/edit/delete products
- addCart.html — Shopping cart view and controls
- viewProduct.html — Product detail view
- assets/css/fonts.css — Inter font-face declarations
- assets/fonts/\* — Inter font files
- tailwind.js — Tailwind CSS (prebuilt script include)
- script.js — All application logic (products, cart, rendering)

## Data Model and Storage

- localStorage keys:

  - `NewMusic`: Array of product objects
  - `Cart`: Array of cart item objects

- Product object shape:

  - `{ pname, aname, genre, date, price, song_image }`

- Cart item object shape:
  - Product fields plus `qty` (quantity)
  - Duplicate detection for cart is based on `pname`

## Pages and How They Work

- Home (index.html)

  - Renders product cards from `NewMusic` via `renderCards()`
  - Cards link to product details (`viewProduct.html?index={i}`)
  - “Add to Cart” button on each card

- Manage Products (manageProducts.html)

  - Form to add/update products using `addMusic()`
  - Product table rendered by `renderTable()` with Edit/Delete actions

- Cart (addCart.html)

  - Table of items with quantity controls, subtotal, and total via `renderCart()`
  - Buttons to clear cart or continue to checkout (placeholder)

- Product Detail (viewProduct.html)
  - Shows the selected product information using `renderProducts()`
  - Add to cart action available on the page

## Function Reference (script.js)

Persistence

- saveProducts(): Persist `newMusic` to localStorage under `NewMusic`
- saveCart(): Persist `cart` to localStorage under `Cart`

Product Management

- addMusic(): Attaches a single submit handler to `#product_form` (guards with `dataset.listenerAdded`)
  - Validates inputs (music_name, artist_name, genre, release_date, price, song_image)
  - Adds a new product or updates existing when `data-edit-index` is present
  - Shows alert via `#alert`, `#alertTxt`, `#alertBg`; updates table and persists
- editMusic(index): Pre-fills the form for editing and switches button text to “Update Song”
- deleteMusic(index): Removes the product, saves, and re-renders list/grid
- renderTable(): Populates `#songTable` with product rows or a friendly empty state

Catalog and Product Detail

- renderCards(): Renders product cards into `#cardContainer` with price and genre tags
- renderProducts(): Renders detail view based on `?index=` in the URL; sets `document.title`

Cart

- addCart(index): Adds the selected product to the cart (increment quantity if the same `pname` exists)
- renderCart(): Renders cart rows with quantity controls and updates `#cartTotal`
- deleteCart(index): Removes an item from the cart and updates the view
- increment(index): Increases quantity, saves, and re-renders
- decrement(index): Decreases quantity; when reaching 1 → 0, removes the item; saves and re-renders
- clearCart(): Confirmation dialog and then empties the cart

UI Utilities

- closeAlert(): Hides the alert container used on Manage Products
- Navigation highlight: On load, adds active styles to the current `.nav-item` based on `window.location.pathname`

## Quick Start

- Open manageProducts.html in a browser to add a few sample music products
- Navigate to index.html to see the catalog grid and add items to the cart
- Go to addCart.html to review your cart, adjust quantities, and clear the cart
- Open viewProduct.html?index=0 (or via card link) to see a product detail page

No build step is required. The app runs entirely in the browser.

## Notes and Known Issues

- `index.html` executes `addCart()` without an index argument; this call is unnecessary and can be removed safely.
- Duplicate detection in the cart uses `pname` (product name). Consider switching to a unique ID for robustness.

## Possible Improvements

- Add search, sort, and filter for the catalog
- Replace `alert()` with toast notifications
- Add image URL validation and graceful fallbacks
- Extract script into modules and add basic tests
- Persist unique product IDs; use them everywhere (edit/delete/cart)
- Enhance accessibility (labels, focus states, alt text review)
- Add a checkout flow (address, payment simulation)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes with clear messages
4. Open a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

Happy Coding! 🚀
