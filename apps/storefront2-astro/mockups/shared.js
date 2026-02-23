/* ===== RAFIA SHARED JS ===== */

// --- Cart State (persisted in localStorage) ---
const RafiaCart = {
  _key: 'rafia_cart',
  get items() {
    try { return JSON.parse(localStorage.getItem(this._key)) || []; }
    catch { return []; }
  },
  set items(val) { localStorage.setItem(this._key, JSON.stringify(val)); },

  add(product) {
    const items = this.items;
    const existing = items.find(i => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ ...product, qty: 1 });
    }
    this.items = items;
    this.updateBadge();
    this.animateBadge();
    this.showNotification(product.name);
  },
  remove(id) {
    this.items = this.items.filter(i => i.id !== id);
    this.updateBadge();
  },
  updateQty(id, qty) {
    const items = this.items;
    const item = items.find(i => i.id === id);
    if (item) {
      item.qty = Math.max(1, qty);
      this.items = items;
    }
  },
  get total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },
  get count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },
  clear() {
    this.items = [];
    this.updateBadge();
  },
  updateBadge() {
    document.querySelectorAll('.cart-count').forEach(el => {
      const c = this.count;
      el.textContent = c;
      el.style.display = c > 0 ? 'flex' : 'none';
    });
  },
  animateBadge() {
    document.querySelectorAll('.cart-count').forEach(el => {
      el.classList.remove('bump');
      void el.offsetWidth;
      el.classList.add('bump');
    });
  },
  showNotification(name) {
    let n = document.getElementById('cartNotification');
    if (!n) {
      n = document.createElement('div');
      n.id = 'cartNotification';
      n.style.cssText = `
        position: fixed; top: 5.5rem; right: 2rem; z-index: 2000;
        background: var(--espresso); color: var(--sand-light);
        padding: 1rem 2rem; font-size: 0.78rem; letter-spacing: 0.1em;
        box-shadow: 0 10px 40px rgba(44,24,16,0.2);
        transform: translateX(120%); transition: transform 0.5s cubic-bezier(0.16,1,0.3,1);
        font-family: 'Outfit', sans-serif;
      `;
      document.body.appendChild(n);
    }
    n.innerHTML = `<span style="color:var(--gold);">✓</span>&ensp;${name} added to bag`;
    n.style.transform = 'translateX(0)';
    clearTimeout(n._timer);
    n._timer = setTimeout(() => { n.style.transform = 'translateX(120%)'; }, 2800);
  }
};

// --- Init on DOM ready ---
document.addEventListener('DOMContentLoaded', () => {
  RafiaCart.updateBadge();
  initCursor();
  initNav();
  initReveal();
});

// --- Custom Cursor ---
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx - 4 + 'px';
    dot.style.top = my - 4 + 'px';
  });
  (function anim() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx - 20 + 'px';
    ring.style.top = ry - 20 + 'px';
    requestAnimationFrame(anim);
  })();
  document.querySelectorAll('a, button, .product-card, .dot, .cart-icon, input, select').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.transform = 'scale(1.5)'; dot.style.transform = 'scale(0.5)'; });
    el.addEventListener('mouseleave', () => { ring.style.transform = 'scale(1)'; dot.style.transform = 'scale(1)'; });
  });
}

// --- Navbar scroll ---
function initNav() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  if (!navbar.classList.contains('nav-light')) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 80);
    });
  }
}

// --- Scroll Reveal ---
function initReveal() {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
}
