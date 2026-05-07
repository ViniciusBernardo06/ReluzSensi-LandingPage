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
  const labelBasic   = document.getElementById(`label-basic-${uid}`);
  const labelRainbow = document.getElementById(`label-rainbow-${uid}`);

  // Check if this card has swappable images
  const cardImg = card.querySelector('.product-img-wrap img');
  const imgBasic   = cardImg?.dataset.basic;
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
