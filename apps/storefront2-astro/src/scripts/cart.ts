export interface CartItem {
  id: string;
  name: string;
  price: number;
  type: string;
  color: string;
  gradient: string;
  svg: string;
  qty: number;
}

const CART_KEY = "rafia_cart";

function getItems(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
  } catch {
    return [];
  }
}

function setItems(items: CartItem[]): void {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

function updateBadge(): void {
  const count = getItems().reduce((sum, i) => sum + i.qty, 0);
  document.querySelectorAll<HTMLElement>(".cart-count").forEach((el) => {
    el.textContent = String(count);
    el.style.display = count > 0 ? "flex" : "none";
  });
}

function animateBadge(): void {
  document.querySelectorAll<HTMLElement>(".cart-count").forEach((el) => {
    el.classList.remove("bump");
    void el.offsetWidth;
    el.classList.add("bump");
  });
}

function showNotification(name: string): void {
  let n = document.getElementById("cartNotification") as HTMLElement | null;
  if (!n) {
    n = document.createElement("div");
    n.id = "cartNotification";
    n.className = "cart-toast";
    document.body.appendChild(n);
  }
  n.innerHTML = `<span style="color:var(--colors-gold, #B8956A);">✓</span>&ensp;${name} added to bag`;
  n.classList.add("visible");
  clearTimeout((n as any)._timer);
  (n as any)._timer = setTimeout(() => {
    n!.classList.remove("visible");
  }, 2800);
}

export const RafiaCart = {
  get items(): CartItem[] {
    return getItems();
  },

  add(product: Omit<CartItem, "qty">): void {
    const items = getItems();
    const existing = items.find((i) => i.id === product.id);
    if (existing) {
      existing.qty += 1;
    } else {
      items.push({ ...product, qty: 1 });
    }
    setItems(items);
    updateBadge();
    animateBadge();
    showNotification(product.name);
  },

  remove(id: string): void {
    setItems(getItems().filter((i) => i.id !== id));
    updateBadge();
  },

  updateQty(id: string, qty: number): void {
    const items = getItems();
    const item = items.find((i) => i.id === id);
    if (item) {
      item.qty = Math.max(1, qty);
      setItems(items);
    }
  },

  get total(): number {
    return getItems().reduce((sum, i) => sum + i.price * i.qty, 0);
  },

  get count(): number {
    return getItems().reduce((sum, i) => sum + i.qty, 0);
  },

  clear(): void {
    setItems([]);
    updateBadge();
  },

  updateBadge,
};
