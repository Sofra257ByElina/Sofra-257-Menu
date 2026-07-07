/**
 * SOFRA 25/7 — Menu List
 */

const PIZZA_STANDARD = { cm30: 12, cm40: 17, cm50: 22 };
const PIZZA_PREMIUM = { cm30: 15, cm40: 20, cm50: 25 };

function mi(id, name, description = '', price = null, options = {}) {
  return { id, name, description, price, ...options };
}

function resolvePrice(item) {
  if (item.price != null) return item.price;
  if (item.tier === 'premium') return PIZZA_PREMIUM;
  if (item.tier === 'standard') return PIZZA_STANDARD;
  return null;
}

function isSpiritPrice(price) {
  return price != null && typeof price === 'object' && 'glass' in price && 'bottle' in price;
}

function isPizzaPrice(price) {
  return price != null && typeof price === 'object' && 'cm30' in price;
}

function formatPrice(price, item = {}) {
  if (price == null) {
    return '<span class="menu-price menu-price--ask">Ask server</span>';
  }
  if (isSpiritPrice(price)) {
    return `
      <div class="menu-line__spirit-prices">
        <span class="menu-price">$${price.glass.toFixed(2)}</span>
        <span class="menu-price">$${price.bottle.toFixed(2)}</span>
      </div>`;
  }
  if (isPizzaPrice(price)) {
    return `
      <span class="menu-price menu-price--sizes">
        <span class="menu-price__size"><em>30</em>$${price.cm30.toFixed(2)}</span>
        <span class="menu-price__size"><em>40</em>$${price.cm40.toFixed(2)}</span>
        <span class="menu-price__size"><em>50</em>$${price.cm50.toFixed(2)}</span>
      </span>`;
  }
  const unit = item.perPiece ? '<span class="menu-price__unit"> / pc</span>' : '';
  return `<span class="menu-price">$${Number(price).toFixed(2)}${unit}</span>`;
}

const BADGE_MAP = {
  'raw-traditional': 'Fresh',
  barbecue: 'Signature',
};

const BADGE_CLASS = {
  Signature: 'badge--chef',
  Fresh: 'badge--fresh',
  Premium: 'badge--premium',
};

const menuData = {
  lebanese: {
    label: 'Lebanese',
    categories: {
      'cold-mezza': {
        label: 'Cold Mezza',
        items: [
          mi('cm-1', 'Hummus', '', 4),
          mi('cm-2', 'Hummus Awarma', '', 6),
          mi('cm-3', 'Hummus Sofra 257', '', 8),
          mi('cm-4', 'Mutabbal', '', 4),
          mi('cm-5', 'Vine Leaves', '', 6),
          mi('cm-6', 'Labneh with Garlic', '', 5),
          mi('cm-7', 'Labneh with Pesto', '', 8),
          mi('cm-8', 'Labneh with Olives', '', 8),
          mi('cm-9', 'Shanklish', '', 7),
          mi('cm-10', 'Lebanese Cheese', '', 7),
          mi('cm-11', 'Tajin', '', 8),
          mi('cm-12', 'Foul Mdammas', '', 5),
        ],
      },
      'hot-mezza': {
        label: 'Hot Mezza & Appetizers',
        items: [
          mi('hm-1', 'Makanek', '', 10),
          mi('hm-2', 'Sujuk', '', 10),
          mi('hm-3', 'Chicken Liver', '', 7),
          mi('hm-4', 'Chicken Wings Provençal', '', 8),
          mi('hm-5', 'Mushroom Provençal', '', 8),
          mi('hm-6', 'Potato Provençal', '', 6),
          mi('hm-7', 'French Fries', '', 4),
        ],
      },
      salads: {
        label: 'Salads',
        items: [
          mi('sa-1', 'Tabbouleh', '', 8),
          mi('sa-2', 'Fattoush', '', 8),
          mi('sa-3', 'Rocca Salad', '', 8),
          mi('sa-4', 'Beetroot Salad', '', 8),
          mi('sa-5', 'Chef Salad', '', 10),
        ],
      },
      'raw-traditional': {
        label: 'Raw & Traditional',
        items: [
          mi('rt-1', 'Kibbeh Nayyeh', '', 0),
          mi('rt-2', 'Ftine Nayyeh', '', 0),
          mi('rt-3', 'Sawda Nayyeh', '', 0),
          mi('rt-4', 'Ras Kibbeh', '', 0),
          mi('rt-5', 'Kebab Kibbeh', '', 0),
          mi('rt-6', 'Tableh', '', 0),
          mi('rt-7', 'Roz', '', 0),
          mi('rt-8', 'Sofra 25/7 Kibbeh', '', 0, { featured: true }),
        ],
      },
      pastries: {
        label: 'Pastries',
        items: [
          mi('pa-1', 'Sambousek', '', 0),
          mi('pa-2', 'Cheese Rolls', '', 0),
          mi('pa-3', 'Sfiha', '', 0),
        ],
      },
      barbecue: {
        label: 'Barbecue',
        items: [
          mi('bb-1', 'Grilled Beef', '', 0),
          mi('bb-2', 'Kafta', '', 0),
          mi('bb-3', 'Tawouk', '', 0),
          mi('bb-4', 'Mixed Grills', '', 0, { featured: true }),
        ],
      },
    },
  },

  international: {
    label: 'International',
    categories: {
      sandwiches: {
        label: 'Sandwiches',
        items: [
          mi('sw-1', 'Tawouk Sandwich', '', 6),
          mi('sw-2', 'Special Tawouk', '', 8),
          mi('sw-3', 'Chicken Sub', '', 10),
          mi('sw-4', 'Fajita Sub', '', 8),
          mi('sw-5', 'Chicken Caesar Sub', '', 10),
        ],
      },
      burgers: {
        label: 'Burgers',
        items: [
          mi('bg-1', 'Daddy\'s Best', 'Three layers of meat, caramelized onions, tomato, egg, and house sauce.', 15, { featured: true }),
          mi('bg-2', 'Mommy\'s Best', 'Beef patty, mozzarella patty, BBQ mix, grilled tomato, onions, mushrooms, extra mozzarella, and BBQ sauce.', 12),
          mi('bg-3', 'Swiss Mushroom (Black Bun)', 'Double beef patties, mushrooms, mozzarella, and Sofra creamy Swiss sauce on a black bun.', 15, { featured: true }),
          mi('bg-4', 'Sofra Explosion', 'Three layers of toast with triple meat, cheddar, and mozzarella.', 14),
          mi('bg-5', 'Hot 25/7 Burger', 'Grilled chicken breast in spicy Buffalo sauce, mozzarella, lettuce, and mayo.', 12),
          mi('bg-6', 'Sweet Chicken Burger', 'Grilled chicken breast in buttery honey sauce, mozzarella, and honey mustard.', 12),
          mi('bg-7', 'Lebanese Burger', 'Beef, fries, cabbage, mayo, onions, tomato, and ketchup.', 6),
        ],
      },
      pizza: {
        label: 'Pizza',
        note: '30 cm · 40 cm · 50 cm',
        items: [
          mi('pz-1', 'Lebanese', 'Pizza sauce, ham, mozzarella, corn, mushroom, green pepper, olives, cherry tomato, and thyme.', null, { tier: 'standard' }),
          mi('pz-2', 'BBQ Chicken', 'BBQ sauce, marinated grilled chicken, mozzarella, and onions.', null, { tier: 'standard' }),
          mi('pz-3', 'Supreme', 'Pizza sauce, mozzarella, pepperoni, corn, olives, mushroom, onions, and jalapeño.', null, { tier: 'standard' }),
          mi('pz-4', 'Creamy Mushroom', 'Swiss mushroom sauce, mozzarella, and parmesan.', null, { tier: 'standard' }),
          mi('pz-5', 'Hawaiian', 'Pizza sauce, mozzarella, ham, pineapple, and honey drizzle.', null, { tier: 'standard' }),
          mi('pz-6', 'Pepperoni', 'Pizza sauce, mozzarella, and pepperoni.', null, { tier: 'standard' }),
          mi('pz-7', 'Fajita', 'Pizza sauce, special fajita mix, and mozzarella.', null, { tier: 'standard' }),
          mi('pz-8', 'Sujouk', 'Pizza sauce, mozzarella, and sujouk.', null, { tier: 'standard' }),
          mi('pz-9', 'Chef\'s Creation', 'Half pepperoni pizza, half Alfredo pasta pie, topped with melted mozzarella and extra pepperoni.', null, { tier: 'standard', featured: true }),
        ],
      },
      pasta: {
        label: 'Pasta',
        items: [
          mi('ps-1', 'Chicken Alfredo', 'Tagliatelle with chicken breast, fresh mushrooms, creamy sauce, mozzarella, and Parmesan.', 15),
          mi('ps-2', 'Creamy Pesto Pasta', 'Penne with fresh pesto, cherry tomatoes, mushrooms, creamy sauce, and Parmesan.', 15),
          mi('ps-3', 'Creamy Shrimp Pasta', 'Tagliatelle with shrimp, creamy sauce, mozzarella, and Parmesan.', 15),
        ],
      },
      appetizers: {
        label: 'Appetizers',
        items: [
          mi('ap-1', 'French Fries'),
          mi('ap-2', 'Crispy Tenders'),
          mi('ap-3', 'Mozzarella Sticks'),
          mi('ap-4', 'Spring Rolls'),
        ],
      },
    },
  },

  sushi: {
    label: 'Sushi',
    categories: {
      'signature-rolls': {
        label: 'Signature Rolls',
        note: '$1.00 per piece',
        items: [
          mi('sr-1', 'Signature Crab Roll', 'Crab-wrapped roll with nori and seasoned sushi rice, cream cheese, crab, cucumber, avocado, mango, and signature sauce.', 1, { perPiece: true }),
          mi('sr-2', 'Tropical Wrap Roll', 'Mango and kiwi wrapped roll with nori, sushi rice, cream cheese, crab, avocado, carrots, cucumber, and signature sauce.', 1, { perPiece: true }),
          mi('sr-3', 'Tropical Shrimp Roll', 'Nori and sushi rice filled with crab, cream cheese, and avocado — topped with shrimp and strawberries.', 1, { perPiece: true }),
          mi('sr-4', 'Tuna Roll', 'Cucumber-wrapped roll with nori and sushi rice, cooked tuna, avocado, cucumber, and signature sauce.', 1, { perPiece: true }),
        ],
      },
      'sushi-burritos': {
        label: 'Sushi Burritos',
        items: [
          mi('sb-2', 'Crab Burrito', 'Nori and sushi rice with crab, cream cheese, cucumber, avocado, mango, carrot, and strawberry.', 12),
          mi('sb-3', 'Shrimp Burrito', 'Nori and sushi rice with shrimp, crab, avocado, mango, and signature sauce.', 12),
          mi('sb-4', 'Tuna Burrito', 'Nori and sushi rice with cooked tuna and avocado, signature sauce and strawberry.', 12),
        ],
      },
    },
  },

  drinks: {
    label: '257 Bar',
    categories: {
      cocktails: {
        label: 'Signature Cocktails',
        items: [
          mi('ck-1', '25th Hour', '', 6, { featured: true }),
          mi('ck-2', 'Whiskey Sour', '', 5),
          mi('ck-3', 'Amaretto Sour', '', 6),
          mi('ck-4', 'Midori Sour', '', 7),
          mi('ck-5', 'Screwdriver', '', 4),
          mi('ck-6', 'Sex on the Beach', '', 7),
          mi('ck-7', 'Burgundy Night', '', 5),
          mi('ck-8', 'Becca Sunset', '', 6),
          mi('ck-9', 'Minted Mojito', '', 7),
          mi('ck-10', 'Bella Spritz (Aperol)', '', 7),
          mi('ck-11', 'Aperol Sour', '', 6),
          mi('ck-12', 'Woodfather', '', 6),
          mi('ck-13', 'Long Island Iced Tea', '', 8),
          mi('ck-14', 'Gin Basil', '', 5),
          mi('ck-15', 'White Lady', '', 5),
          mi('ck-16', 'Tom Collins', '', 6),
          mi('ck-17', 'Maybe Wine', '', 8),
        ],
      },
      whiskey: {
        label: 'Whiskey',
        priceType: 'spirit',
        note: 'Glass · Bottle',
        items: [
          mi('wh-1', 'Red Label', '', { glass: 6, bottle: 60 }),
          mi('wh-2', 'Black Label', '', { glass: 7, bottle: 70 }),
          mi('wh-3', 'Chivas', '', { glass: 7, bottle: 70 }),
        ],
      },
      vodka: {
        label: 'Vodka',
        priceType: 'spirit',
        note: 'Glass · Bottle',
        items: [
          mi('vd-1', 'Stolichnaya', '', { glass: 5, bottle: 50 }),
          mi('vd-2', 'Zubrowka', '', { glass: 4, bottle: 40 }),
        ],
      },
      gin: {
        label: 'Gin',
        priceType: 'spirit',
        note: 'Glass · Bottle',
        items: [
          mi('gn-1', "Gordan's", '', { glass: 5, bottle: 50 }),
        ],
      },
      wine: {
        label: 'Wine',
        items: [
          mi('wn-1', 'White Wine', '', 6),
          mi('wn-2', 'Red Wine', '', 6),
          mi('wn-3', 'Rosé Wine', '', 6),
        ],
      },
      beer: {
        label: 'Beer',
        items: [
          mi('br-1', 'Rosé Beer', '', 4),
          mi('br-2', 'Almaza', '', 3.5),
          mi('br-3', 'Mexican Beer', '', 5),
        ],
      },
      refreshments: {
        label: 'Soft Drinks',
        items: [
          mi('sf-1', 'Soft Drinks', '', 1.5),
          mi('sf-2', 'Water', '', 0.5),
        ],
      },
      hookah: {
        label: 'Hookah',
        items: [
          mi('hk-1', 'Hamod w Na3na3', '', 7),
          mi('hk-2', 'Tefehten', '', 7),
        ],
      },
    },
  },
};

let activeCuisine = 'lebanese';
let activeSubcategory = 'all';

const cuisineTabsEl = document.getElementById('cuisine-tabs');
const subcategoryTabsEl = document.getElementById('subcategory-tabs');
const menuContentEl = document.getElementById('menu-content');
const menuEmptyEl = document.getElementById('menu-empty');

function updateScrollPadding() {
  const panel = document.querySelector('.menu-controls-panel');
  const height = panel?.offsetHeight || 120;
  document.documentElement.style.setProperty(
    '--scroll-padding',
    `${Math.ceil(height + 16)}px`
  );
}

function getScrollOffset() {
  const panel = document.querySelector('.menu-controls-panel');
  if (!panel) return 24;
  return panel.getBoundingClientRect().height + 16;
}

function smoothScrollToElement(el) {
  if (!el) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    el.scrollIntoView({ block: 'start' });
    return;
  }

  const top = el.getBoundingClientRect().top + window.scrollY - getScrollOffset();
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

function scrollActiveTabIntoView(container) {
  const active = container?.querySelector('.active');
  if (!active) return;

  active.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
}

function getCuisineCategories(cuisineKey) {
  return menuData[cuisineKey].categories;
}

function getBadges(item, categoryKey) {
  const badges = [];
  const catBadge = BADGE_MAP[categoryKey];
  if (catBadge) badges.push({ label: catBadge, class: BADGE_CLASS[catBadge] });
  if (item.tier === 'premium') badges.push({ label: 'Premium', class: BADGE_CLASS.Premium });
  if (item.featured) badges.push({ label: 'Popular', class: 'badge--popular' });
  return badges;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function renderCuisineTabs() {
  cuisineTabsEl.innerHTML = Object.entries(menuData)
    .map(
      ([key, cuisine]) => `
      <button
        class="cuisine-tab${key === activeCuisine ? ' active' : ''}"
        data-cuisine="${key}"
        role="tab"
        aria-selected="${key === activeCuisine}"
      >${escapeHtml(cuisine.label)}</button>
    `
    )
    .join('');

  cuisineTabsEl.querySelectorAll('.cuisine-tab').forEach((btn) => {
    btn.addEventListener('click', () => selectCuisine(btn.dataset.cuisine));
  });

  scrollActiveTabIntoView(cuisineTabsEl);
}

function renderSubcategoryTabs() {
  const categories = getCuisineCategories(activeCuisine);
  const tabs = [
    { key: 'all', label: 'All' },
    ...Object.entries(categories).map(([key, cat]) => ({ key, label: cat.label })),
  ];

  subcategoryTabsEl.innerHTML = tabs
    .map(
      ({ key, label }) => `
      <button
        class="subcategory-tab${key === activeSubcategory ? ' active' : ''}"
        data-subcategory="${key}"
        role="tab"
        aria-selected="${key === activeSubcategory}"
      >${escapeHtml(label)}</button>
    `
    )
    .join('');

  subcategoryTabsEl.querySelectorAll('.subcategory-tab').forEach((btn) => {
    btn.addEventListener('click', () => selectSubcategory(btn.dataset.subcategory));
  });

  scrollActiveTabIntoView(subcategoryTabsEl);
}

function createMenuLineItem(item, categoryKey, globalIndex, priceType = '') {
  const price = resolvePrice(item);
  const badges = getBadges(item, categoryKey);
  const multiPrice = isPizzaPrice(price);
  const spiritPrice = isSpiritPrice(price) || priceType === 'spirit';

  const row = document.createElement('article');
  row.className = [
    'menu-line',
    item.featured ? 'menu-line--featured' : '',
    item.tier === 'premium' ? 'menu-line--premium' : '',
    spiritPrice ? 'menu-line--spirit' : '',
  ].filter(Boolean).join(' ');
  row.id = `item-${item.id}`;
  row.dataset.id = item.id;
  row.dataset.category = categoryKey;
  row.style.animationDelay = `${globalIndex * 35}ms`;

  const badgeHtml = badges.length
    ? `<div class="menu-line__meta">${badges.map((b) => `<span class="badge ${b.class}">${b.label}</span>`).join('')}</div>`
    : '';

  const descHtml = item.description
    ? `<p class="menu-line__desc">${escapeHtml(item.description)}</p>`
    : '';

  const leaderHtml = multiPrice || spiritPrice
    ? ''
    : '<span class="menu-line__leader" aria-hidden="true"></span>';

  const rowClass = [
    'menu-line__row',
    multiPrice ? ' menu-line__row--sizes' : '',
    spiritPrice ? ' menu-line__row--spirit' : '',
  ].join('');

  row.innerHTML = `
    <div class="${rowClass}">
      <h4 class="menu-line__name">${escapeHtml(item.name)}</h4>
      ${leaderHtml}
      <div class="menu-line__price">${formatPrice(price, item)}</div>
    </div>
    ${descHtml}
    ${badgeHtml}
  `;

  return row;
}

function createSpiritColumnHeader() {
  const header = document.createElement('div');
  header.className = 'menu-spirit-cols';
  header.setAttribute('aria-hidden', 'true');
  header.innerHTML = `
    <span class="menu-spirit-cols__name"></span>
    <span class="menu-spirit-cols__label">Glass</span>
    <span class="menu-spirit-cols__label">Bottle</span>
  `;
  return header;
}

function createCategoryDivider(label, note = '') {
  const divider = document.createElement('div');
  divider.className = 'menu-section-divider';
  const noteHtml = note ? `<p class="menu-section-divider__note">${escapeHtml(note)}</p>` : '';
  divider.innerHTML = `
    <div class="menu-section-divider__head">
      <h3 class="menu-section-divider__title">${escapeHtml(label)}</h3>
      <span class="menu-section-divider__line" aria-hidden="true"></span>
    </div>
    ${noteHtml}
  `;
  return divider;
}

function renderMenuContent() {
  menuContentEl.classList.add('is-updating');

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      const categories = getCuisineCategories(activeCuisine);
      const categoryEntries = Object.entries(categories);
      const sectionsToShow =
        activeSubcategory === 'all'
          ? categoryEntries
          : categoryEntries.filter(([key]) => key === activeSubcategory);

      menuContentEl.innerHTML = '';
      let totalVisible = 0;
      let globalIndex = 0;

      sectionsToShow.forEach(([catKey, cat]) => {
        const filteredItems = cat.items
          .map((item) => ({
            ...item,
            categoryKey: catKey,
            categoryLabel: cat.label,
            cuisineKey: activeCuisine,
            cuisineLabel: menuData[activeCuisine].label,
          }));

        if (filteredItems.length === 0) return;

        const divider = createCategoryDivider(cat.label, cat.note || '');
        divider.id = `section-${activeCuisine}-${catKey}`;
        divider.dataset.category = catKey;
        menuContentEl.appendChild(divider);

        if (cat.priceType === 'spirit') {
          menuContentEl.appendChild(createSpiritColumnHeader());
        }

        filteredItems.forEach((item) => {
          menuContentEl.appendChild(createMenuLineItem(item, catKey, globalIndex, cat.priceType || ''));
          globalIndex += 1;
          totalVisible += 1;
        });
      });

      menuEmptyEl.classList.toggle('hidden', totalVisible > 0);
      menuContentEl.classList.toggle('hidden', totalVisible === 0);

      menuContentEl.classList.remove('is-updating');
    });
  });
}

function selectCuisine(cuisineKey) {
  if (cuisineKey === activeCuisine) return;

  activeCuisine = cuisineKey;
  activeSubcategory = 'all';

  renderCuisineTabs();
  renderSubcategoryTabs();
  renderMenuContent();

  const menuListWrap = document.querySelector('.menu-list-wrap');
  if (menuListWrap) {
    requestAnimationFrame(() => smoothScrollToElement(menuListWrap));
  }
}

function selectSubcategory(subcategoryKey) {
  if (subcategoryKey === activeSubcategory) return;

  activeSubcategory = subcategoryKey;
  renderSubcategoryTabs();
  renderMenuContent();

  requestAnimationFrame(() => {
    if (subcategoryKey === 'all') {
      const menuListWrap = document.querySelector('.menu-list-wrap');
      if (menuListWrap) smoothScrollToElement(menuListWrap);
      return;
    }

    const target =
      document.getElementById(`section-${activeCuisine}-${subcategoryKey}`) ||
      menuContentEl.querySelector(`[data-category="${subcategoryKey}"]`);

    if (target) smoothScrollToElement(target);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCuisineTabs();
  renderSubcategoryTabs();
  renderMenuContent();
  updateScrollPadding();
  window.addEventListener('resize', updateScrollPadding, { passive: true });
});
