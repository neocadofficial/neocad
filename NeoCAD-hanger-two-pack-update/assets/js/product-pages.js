(() => {
  'use strict';
  const money = value => new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(value);
  document.querySelectorAll('[data-nc-gallery]').forEach(gallery => {
    gallery.querySelectorAll('[data-nc-photo]').forEach(button => {
      button.addEventListener('click', () => {
        const photo = gallery.querySelector('[data-nc-main]');
        photo.src = button.dataset.ncPhoto;
        photo.alt = button.dataset.ncAlt;
        gallery.querySelector('[data-nc-caption]').textContent = button.dataset.ncAlt;
        gallery.querySelectorAll('[data-nc-photo]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
      });
    });
  });
  document.querySelectorAll('[data-nc-buy]').forEach(box => {
    const variant = box.querySelector('[data-nc-variant]');
    const shipping = box.querySelector('[data-nc-shipping]');
    const update = () => {
      const base = Number(variant.value);
      const delivery = Number(shipping.value);
      box.querySelector('[data-nc-price]').textContent = money(base + delivery);
      box.querySelector('[data-nc-delivery]').textContent = delivery ? `${money(base)} + $7.50 continental U.S. shipping` : 'Local pickup · add $7.50 for continental U.S. shipping';
      const body = `I'd like to order: ${box.dataset.product}\nOption: ${variant.selectedOptions[0].textContent}\nDelivery: ${shipping.selectedOptions[0].textContent}\nPrice: ${money(base + delivery)}\n\nPlease confirm availability and any applicable tax.`;
      box.querySelector('[data-nc-order]').href = `mailto:neocadofficial@gmail.com?subject=${encodeURIComponent(box.dataset.product + ' order')}&body=${encodeURIComponent(body)}`;
    };
    variant.addEventListener('change', update);
    shipping.addEventListener('change', update);
    update();
  });
})();
