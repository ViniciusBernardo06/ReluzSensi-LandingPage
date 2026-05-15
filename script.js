// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MOBILE MENU =====
const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
burger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// ===== CATALOG FILTER =====
const filterBtns = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    productCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter || card.dataset.category === 'all';
      card.style.display = match ? '' : 'none';
      card.style.animation = match ? 'fadeIn 0.4s ease' : '';
    });
  });
});

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll(
  '.benefit-card, .product-card, .step, .testimonial-card, .faq-item, .section-header'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => observer.observe(el));

// ===== WHATSAPP FORM =====
const form = document.getElementById('customForm');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const produto = document.getElementById('produto').value;
  const cor = document.getElementById('cor').value.trim();
  const descricao = document.getElementById('descricao').value.trim();

  if (!nome || !whatsapp || !produto) {
    alert('Por favor, preencha nome, WhatsApp e produto desejado!');
    return;
  }

  const msg = `Olá! Vim pelo site SensoPrint 🧩%0A%0A` +
    `👤 *Nome:* ${nome}%0A` +
    `📱 *WhatsApp:* ${whatsapp}%0A` +
    `🎁 *Produto:* ${produto}%0A` +
    (cor ? `🎨 *Cor:* ${cor}%0A` : '') +
    (descricao ? `📝 *Detalhes:* ${descricao}%0A` : '') +
    `%0AGostaria de saber mais sobre preços e prazos!`;

  window.open(`https://wa.me/5561981490363?text=${msg}`, '_blank');
});

// ===== SMOOTH ANCHOR =====
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== CSS ANIMATION KEYFRAME for filter =====
const style = document.createElement('style');
style.textContent = `@keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }`;
document.head.appendChild(style);

// ===== FILAMENT SELECTOR =====
// Inject filament type selector into every real product card (skip the CTA card and cards with no-selector)
document.querySelectorAll('.product-card:not(.card-custom):not(.no-selector)').forEach((card, idx) => {
  const priceEl = card.querySelector('.price');
  if (!priceEl) return;

  // Extract base numeric value from price text, e.g. "A partir de R$ 35" → 35
  const priceText = priceEl.textContent;
  const baseMatch = priceText.match(/R\$\s*(\d+)/);
  if (!baseMatch) return;
  const basePrice = parseInt(baseMatch[1], 10);

  const uid = `fil-${idx}`;

  // Build the selector HTML
  const selectorHTML = `
    <div class="filament-selector" data-base="${basePrice}">
      <label class="selected-basic" id="label-basic-${uid}">
        <input type="radio" name="${uid}" value="basic" checked>
        <span class="filament-swatch swatch-basic"></span>
        Cores Básicas
      </label>
      <label id="label-rainbow-${uid}">
        <input type="radio" name="${uid}" value="rainbow">
        <span class="filament-swatch swatch-rainbow"></span>
        Arco-íris
        <span class="price-tag-extra">+R$5</span>
      </label>
    </div>`;

  // Insert before product-footer
  const footer = card.querySelector('.product-footer');
  footer.insertAdjacentHTML('beforebegin', selectorHTML);

  // Add interaction logic
  const selector = card.querySelector('.filament-selector');
  const labelBasic = document.getElementById(`label-basic-${uid}`);
  const labelRainbow = document.getElementById(`label-rainbow-${uid}`);

  // Check if this card has swappable images
  const cardImg = card.querySelector('.product-img-wrap img');
  const imgBasic = cardImg?.dataset.basic;
  const imgRainbow = cardImg?.dataset.rainbow;

  selector.addEventListener('change', (e) => {
    const isRainbow = e.target.value === 'rainbow';
    const extra = isRainbow ? 5 : 0;

    // Update price
    priceEl.textContent = priceText.replace(/R\$\s*\d+/, `R$ ${basePrice + extra}`);

    // Update label styles
    labelBasic.classList.toggle('selected-basic', !isRainbow);
    labelRainbow.classList.toggle('selected-rainbow', isRainbow);

    // Swap image if available
    if (cardImg && imgBasic && imgRainbow) {
      cardImg.style.transition = 'opacity 0.3s ease';
      cardImg.style.opacity = '0';
      setTimeout(() => {
        cardImg.src = isRainbow ? imgRainbow : imgBasic;
        cardImg.style.opacity = '1';
      }, 300);
    }
  });
});

// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

const sunSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`;
const moonSvg = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;

// Check saved theme
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
  htmlElement.setAttribute('data-theme', 'dark');
  themeToggle.innerHTML = sunSvg;
} else {
  themeToggle.innerHTML = moonSvg;
}

themeToggle.addEventListener('click', () => {
  const currentTheme = htmlElement.getAttribute('data-theme');
  if (currentTheme === 'dark') {
    htmlElement.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    themeToggle.innerHTML = moonSvg;
  } else {
    htmlElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeToggle.innerHTML = sunSvg;
  }
});

// ===== SHOPPING CART =====
let cart = [];
const cartOverlay = document.getElementById('cartOverlay');
const cartSidebar = document.getElementById('cartSidebar');
const cartOpenBtn = document.getElementById('cartOpenBtn');
const cartClose = document.getElementById('cartClose');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');
const cartBadge = document.getElementById('cartBadge');
const btnCheckout = document.getElementById('btnCheckout');

// Toggle Cart
function toggleCart() {
  cartSidebar.classList.toggle('open');
  cartOverlay.classList.toggle('open');
}

cartOpenBtn.addEventListener('click', toggleCart);
cartClose.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);

// Add to Cart Logic
document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const card = e.target.closest('.product-card');
    if (!card) return;

    const title = card.querySelector('h3').textContent;
    const imgEl = card.querySelector('.product-img-wrap img');
    const imgSrc = imgEl ? imgEl.src : '';

    // Determine price and variant from the card
    let priceText = card.querySelector('.price').textContent;
    let baseMatch = priceText.match(/R\$\s*(\d+)/);
    let price = baseMatch ? parseInt(baseMatch[1], 10) : 0;

    let variant = 'Cores Básicas';

    // Check if there's a filament selector
    const selector = card.querySelector('.filament-selector');
    const customSelect = card.querySelector('.custom-variant-select');
    if (selector) {
      const selectedRadio = selector.querySelector('input[type="radio"]:checked');
      if (selectedRadio && selectedRadio.value === 'rainbow') {
        variant = 'Arco-íris';
      }
    } else if (customSelect) {
      variant = customSelect.value;
    } else {
      // If it doesn't have a selector, check category for a generic variant string
      if (['pedagogia', 'utilidade', 'replicas', 'miniaturas'].includes(card.dataset.category)) {
        variant = 'Padrão';
      } else {
        variant = 'Padrão';
      }
    }

    const itemId = `${title}-${variant}`;

    // Check if item already exists
    const existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
      existingItem.qty += 1;
    } else {
      cart.push({
        id: itemId,
        title: title,
        variant: variant,
        price: price,
        img: imgSrc,
        qty: 1,
        color: variant === 'Arco-íris' ? 'Arco-íris' : 'A definir'
      });
    }

    updateCartUI();

    // Feedback animation on floating button
    cartOpenBtn.style.transform = 'scale(1.2)';
    setTimeout(() => { cartOpenBtn.style.transform = ''; }, 200);
  });
});

function updateCartUI() {
  cartItemsContainer.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p style="text-align:center; color:var(--muted); margin-top:20px;">Seu carrinho está vazio.</p>';
  } else {
    cart.forEach((item, index) => {
      total += item.price * item.qty;
      totalItems += item.qty;

      let colorSelectorHTML = '';
      if (item.variant !== 'Arco-íris') {
        const colors = ['A definir', 'Preto', 'Branco', 'Azul', 'Vermelho', 'Amarelo', 'Verde', 'Rosa', 'Roxo'];
        let options = colors.map(c => `<option value="${c}" ${item.color === c ? 'selected' : ''}>${c}</option>`).join('');
        colorSelectorHTML = `
          <select class="cart-color-select" onchange="changeColor(${index}, this.value)">
            ${options}
          </select>
        `;
      }

      const itemEl = document.createElement('div');
      itemEl.className = 'cart-item';
      itemEl.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div class="cart-item-info">
          <div class="cart-item-title">${item.title}</div>
          <div class="cart-item-variant">${item.variant}</div>
          ${colorSelectorHTML}
          <div class="cart-item-price">R$ ${item.price}</div>
          <div class="cart-item-actions">
            <button class="qty-btn" onclick="changeQty(${index}, -1)">-</button>
            <span>${item.qty}</span>
            <button class="qty-btn" onclick="changeQty(${index}, 1)">+</button>
            <button class="cart-item-remove" onclick="removeItem(${index})">Remover</button>
          </div>
        </div>
      `;
      cartItemsContainer.appendChild(itemEl);
    });
  }

  cartTotalEl.textContent = `R$ ${total}`;
  cartBadge.textContent = totalItems;

  if (totalItems > 0) {
    cartBadge.style.display = 'flex';
  } else {
    cartBadge.style.display = 'none';
  }
}

// Make functions available globally for inline onclick handlers
window.changeQty = function (index, delta) {
  if (cart[index].qty + delta > 0) {
    cart[index].qty += delta;
  } else {
    cart.splice(index, 1);
  }
  updateCartUI();
};

window.removeItem = function (index) {
  cart.splice(index, 1);
  updateCartUI();
};

window.changeColor = function (index, newColor) {
  cart[index].color = newColor;
  updateCartUI();
};

// Checkout
btnCheckout.addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Seu carrinho está vazio!');
    return;
  }

  let total = 0;
  let msg = 'Olá! Vim pelo site ReluzSensi e gostaria de finalizar meu pedido: %0A%0A';

  cart.forEach(item => {
    msg += `- *${item.qty}x ${item.title}*%0A`;
    if (item.variant === 'Arco-íris') {
      msg += `   ↳ Variação: ${item.variant}%0A`;
    } else {
      msg += `   ↳ Cor Escolhida: ${item.color}%0A`;
    }
    msg += `   ↳ Subtotal: R$ ${item.price * item.qty}%0A%0A`;
    total += item.price * item.qty;
  });

  msg += `*TOTAL ESTIMADO (sem frete): R$ ${total}*%0A%0A`;
  msg += 'Por favor, aguardo retorno para calcularmos o valor do frete!';

  window.open(`https://wa.me/5561981490363?text=${msg}`, '_blank');
});

// Init
updateCartUI();


