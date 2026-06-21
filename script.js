const UK_MONTHS = [
  'січня', 'лютого', 'березня', 'квітня', 'травня', 'червня',
  'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'
];

function formatDateUk(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${UK_MONTHS[m - 1]} ${y}`;
}

const photos = [
  {
    src: 'assets/thumbs/DSCN0841.JPG',
    date: '2015-05-10',
    caption: 'Разом',
    message: 'Ти завжди з камерою, зберігаєш наші миті назавжди. Дякую, тату, що документуєш наше життя.'
  },
  {
    src: 'assets/thumbs/IMG_0026.JPG',
    date: '2021-07-22',
    caption: 'Карпати',
    message: 'Серед гір і квітів ти знову збираєш нас у подорож. І я так люблю ці наші літні дні.'
  },
  {
    src: 'assets/thumbs/IMG_0087.JPG',
    date: '2021-07-22',
    caption: 'Лісова стежка',
    aspectRatio: '4 / 5',
    objectPosition: 'center 2%',
    message: 'На кам\'янистій стежці, у капелюсі, серед ялин. Ти виглядаєш так, ніби цей ліс твій дім.'
  },
  {
    src: 'assets/thumbs/IMG_0153.JPG',
    date: '2013-10-27',
    caption: 'Грибний трофей',
    aspectRatio: '4 / 5',
    objectPosition: 'center 18%',
    message: 'Найкращий грибник! Пам\'ятаю, як ти пишався цим білком, і я досі пишаюся тобою, тату.'
  },
  {
    src: 'assets/thumbs/IMG_0219.JPG',
    date: '2021-07-22',
    caption: 'Мох і каміння',
    message: 'Лісова стежка, мох на каменях, і ти поруч. Іноді для щастя потрібно лише це.'
  },
  {
    src: 'assets/thumbs/IMG_0271.JPG',
    date: '2021-07-22',
    caption: 'Лісове літо',
    aspectRatio: '4 / 5',
    objectPosition: 'center 8%',
    message: 'Зелень лісу, твоя усмішка, найяскравіші кольори нашого літа 2021-го.'
  },
  {
    src: 'assets/thumbs/IMG_0654.JPG',
    date: '2021-07-24',
    caption: 'На вершині',
    message: 'На оглядовому майданчику, в обіймах гір. Ви з мамою, і світ навколо стає безмежно прекрасним.'
  },
  {
    src: 'assets/thumbs/IMG_0921.JPG',
    date: '2021-07-24',
    caption: 'Разом на горі',
    message: 'На вершині, поруч з тобою, я відчуваю, що можу підкорити будь-яку вершину у житті.'
  },
  {
    src: 'assets/thumbs/IMG_0932.JPG',
    date: '2021-07-24',
    caption: 'Гори',
    message: 'Гори, хмари, ти спокійний і сильний. Саме таким я бачу тебе в усі найважливіші моменти.'
  },
  {
    src: 'assets/thumbs/IMG_1284.JPG',
    date: '2014-08-15',
    caption: 'Вночі',
    message: 'Вночі біля пам\'ятника, серед каменів з вузорами. Навіть у темряві з тобою все світло.'
  },
  {
    src: 'assets/thumbs/IMG_1341.JPG',
    date: '2014-08-16',
    caption: 'Біля греблі',
    message: 'Біля греблі, на терасі з видом на воду. Ще одна наша подорож, і ще один день, який я бережу.'
  },
  {
    src: 'assets/thumbs/IMG_1859.JPG',
    date: '2018-08-23',
    caption: 'Соляна шахта',
    message: 'Під землею, у соляних залах. Ти відкриваєш мені світ, навіть той, що прихований глибоко.'
  },
  {
    src: 'assets/thumbs/IMG_20180916_173311.jpg',
    date: '2018-09-16',
    caption: 'Місто',
    message: 'Прогулянка містом, осінній день. З тобою навіть звичайна вулиця перетворюється на пригоду.'
  },
  {
    src: 'assets/thumbs/IMG_3398.JPG',
    date: '2020-06-04',
    caption: 'На піску',
    objectPosition: '32% center',
    message: 'Пісок, сонце і тепло. Один з тих днів, про які мрієш, коли на дворі дощ.'
  },
  {
    src: 'assets/thumbs/IMG_5796.JPG',
    date: '2019-07-22',
    caption: 'Руїни',
    message: 'Серед старих руїн, з камерою в руках. Ти показуєш мені історію і вчиш бачити красу в усьому.'
  },
  {
    src: 'assets/thumbs/IMG_5819.JPG',
    date: '2019-07-22',
    caption: 'З Днем Батька!',
    message: 'Тримаєш руїни одним пальцем, бо ти наш найсильніший і найвеселіший тато. З Днем Батька! Люблю тебе.'
  }
];

const SPREAD = 88;
const SWIPE_THRESHOLD = 45;

let currentIndex = 0;
let dragDelta = 0;
let isDragging = false;
let hasMoved = false;
let isAnimating = false;
let startX = 0;
let rafId = null;

const intro = document.getElementById('intro');
const envelope = document.getElementById('envelope');
const gallery = document.getElementById('gallery');
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('dots');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const cards = { prev: null, active: null, next: null };
const cardList = () => [cards.prev, cards.active, cards.next];

function createCard(role) {
  const card = document.createElement('div');
  card.className = `polaroid ${role}`;
  card.dataset.role = role;
  card.innerHTML = `
    <div class="polaroid-inner">
      <div class="polaroid-front">
        <img alt="" decoding="async" draggable="false">
        <div class="polaroid-footer">
          <span class="polaroid-caption"></span>
        </div>
      </div>
      <div class="polaroid-back">
        <p class="back-date"></p>
        <p class="back-message"></p>
        <span class="back-heart">💙</span>
      </div>
    </div>
  `;

  card.addEventListener('click', (e) => {
    if (card.dataset.role !== 'active' || isAnimating) return;
    e.stopPropagation();
    card.classList.toggle('flipped');
  });

  return card;
}

function fillCard(card, index) {
  if (index < 0 || index >= photos.length) {
    card.style.visibility = 'hidden';
    card.dataset.index = '';
    return;
  }

  const photo = photos[index];
  card.style.visibility = 'visible';
  card.dataset.index = index;
  card.classList.remove('flipped');

  const img = card.querySelector('img');
  img.style.objectPosition = photo.objectPosition || 'center center';
  img.style.aspectRatio = photo.aspectRatio || '1 / 1';

  if (img.getAttribute('src') !== photo.src) {
    img.src = photo.src;
    img.alt = `Спогад ${index + 1}`;
  }

  card.querySelector('.polaroid-caption').textContent = photo.caption;
  card.querySelector('.back-date').textContent = formatDateUk(photo.date);
  card.querySelector('.back-message').textContent = photo.message;
}

function cardStyle(xOffset, role) {
  const t = Math.min(Math.abs(xOffset) / SPREAD, 1);
  return {
    x: xOffset,
    scale: 1 - t * 0.08,
    rotate: (xOffset / SPREAD) * 5,
    filter: role === 'active' ? 'none' : `brightness(${0.86 + (1 - t) * 0.14})`,
    zIndex: Math.round((1 - t) * 10)
  };
}

function applyTransforms(noTransition) {
  const offsets = {
    prev: -SPREAD + dragDelta,
    active: dragDelta,
    next: SPREAD + dragDelta
  };

  cardList().forEach((card) => {
    const role = card.dataset.role;
    const hidden =
      card.style.visibility === 'hidden' ||
      (role === 'prev' && currentIndex === 0) ||
      (role === 'next' && currentIndex === photos.length - 1);

    if (hidden) {
      card.style.opacity = '0';
      card.style.filter = 'none';
      card.style.pointerEvents = 'none';
      return;
    }

    card.style.visibility = 'visible';
    const { x, scale, rotate, filter, zIndex } = cardStyle(offsets[role], role);
    card.style.transform = `translate(calc(-50% + ${x}px), -50%) rotate(${rotate}deg) scale(${scale})`;
    card.style.opacity = '1';
    card.style.filter = filter;
    card.style.zIndex = role === 'active' ? '10' : String(zIndex);
    card.style.pointerEvents = role === 'active' ? 'auto' : 'none';
    card.classList.toggle('no-transition', noTransition);
  });
}

function reorderDom() {
  cardList().forEach((card) => {
    if (card?.isConnected && card.style.visibility !== 'hidden') {
      track.appendChild(card);
    }
  });
  if (cards.active?.isConnected) {
    track.appendChild(cards.active);
  }
}

function mountCards() {
  cardList().forEach((card) => {
    if (!card) return;
    if (card.style.visibility === 'hidden') {
      card.remove();
    }
  });

  if (cards.prev?.style.visibility !== 'hidden' && cards.prev) {
    track.insertBefore(cards.prev, cards.active);
  }
  if (cards.active && !cards.active.isConnected) {
    track.appendChild(cards.active);
  }
  if (cards.next?.style.visibility !== 'hidden' && cards.next) {
    track.appendChild(cards.next);
  }
  reorderDom();
}

function refreshCards() {
  fillCard(cards.prev, currentIndex - 1);
  fillCard(cards.active, currentIndex);
  fillCard(cards.next, currentIndex + 1);
  mountCards();
  applyTransforms(true);
  updateUI();
  preloadAdjacent();
  requestAnimationFrame(() => applyTransforms(false));
}

function setCardRole(card, role) {
  card.dataset.role = role;
  card.className = `polaroid ${role}`;
}

function promoteCard(direction) {
  isAnimating = false;

  const oldActive = cards.active;
  const oldPrev = cards.prev;
  const oldNext = cards.next;

  if (direction === 1) {
    cards.active = oldNext;
    cards.prev = oldActive;
    cards.next = oldPrev;
  } else {
    cards.active = oldPrev;
    cards.next = oldActive;
    cards.prev = oldNext;
  }

  setCardRole(cards.prev, 'prev');
  setCardRole(cards.active, 'active');
  setCardRole(cards.next, 'next');
  cards.active.classList.remove('flipped');

  fillCard(cards.prev, currentIndex - 1);
  fillCard(cards.active, currentIndex);
  fillCard(cards.next, currentIndex + 1);

  dragDelta = 0;

  cardList().forEach((card) => card?.classList.add('no-transition'));
  applyTransforms(true);

  requestAnimationFrame(() => {
    cardList().forEach((card) => card?.classList.remove('no-transition'));
    applyTransforms(false);
    reorderDom();
  });

  updateUI();
  preloadAdjacent();
}

function scheduleTransform() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    applyTransforms(true);
    rafId = null;
  });
}

function animateDragTo(target, onComplete) {
  if (Math.abs(target - dragDelta) < 1) {
    dragDelta = target;
    if (onComplete) onComplete();
    return;
  }

  isAnimating = true;
  dragDelta = target;
  applyTransforms(false);
  updateUI();

  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    isAnimating = false;
    if (onComplete) onComplete();
  };

  cards.active.addEventListener('transitionend', function onDone(e) {
    if (e.propertyName !== 'transform') return;
    cards.active.removeEventListener('transitionend', onDone);
    done();
  });

  setTimeout(done, 400);
}

function finishSlide(direction) {
  promoteCard(direction);
}

function slideTo(direction) {
  if (isAnimating) return;
  if (direction === 1 && currentIndex >= photos.length - 1) return;
  if (direction === -1 && currentIndex <= 0) return;

  animateDragTo(-direction * SPREAD, () => {
    currentIndex += direction;
    finishSlide(direction);
  });
}

function next() { slideTo(1); }
function prev() { slideTo(-1); }

function goTo(index) {
  if (index === currentIndex || isAnimating) return;
  currentIndex = index;
  dragDelta = 0;
  refreshCards();
}

function updateUI() {
  dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
  counter.textContent = `${currentIndex + 1} / ${photos.length}`;
  prevBtn.disabled = currentIndex === 0 || isAnimating;
  nextBtn.disabled = currentIndex === photos.length - 1 || isAnimating;
}

function preloadAdjacent() {
  [currentIndex - 1, currentIndex + 1, currentIndex + 2].forEach((i) => {
    if (i >= 0 && i < photos.length) {
      const img = new Image();
      img.src = photos[i].src;
    }
  });
}

function setupSwipe() {
  const onStart = (x) => {
    if (isAnimating) return;
    isDragging = true;
    hasMoved = false;
    startX = x;
    cards.active.classList.add('dragging');
  };

  const onMove = (x) => {
    if (!isDragging || isAnimating) return;
    dragDelta = x - startX;
    if (Math.abs(dragDelta) > 6) hasMoved = true;

    if (currentIndex === 0 && dragDelta > 0) dragDelta *= 0.3;
    if (currentIndex === photos.length - 1 && dragDelta < 0) dragDelta *= 0.3;

    scheduleTransform();
  };

  const onEnd = () => {
    if (!isDragging || isAnimating) return;
    isDragging = false;
    cards.active.classList.remove('dragging');

    if (hasMoved && dragDelta < -SWIPE_THRESHOLD && currentIndex < photos.length - 1) {
      hasMoved = false;
      next();
    } else if (hasMoved && dragDelta > SWIPE_THRESHOLD && currentIndex > 0) {
      hasMoved = false;
      prev();
    } else if (hasMoved) {
      hasMoved = false;
      animateDragTo(0, updateUI);
    } else {
      hasMoved = false;
    }
  };

  track.addEventListener('mousedown', (e) => onStart(e.clientX));
  window.addEventListener('mousemove', (e) => onMove(e.clientX));
  window.addEventListener('mouseup', onEnd);

  track.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX), { passive: true });
  track.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
  track.addEventListener('touchend', onEnd);
}

function buildGallery() {
  cards.prev = createCard('prev');
  cards.active = createCard('active');
  cards.next = createCard('next');
  track.append(cards.prev, cards.active, cards.next);

  photos.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Фото ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  setupSwipe();
  refreshCards();
}

envelope.addEventListener('click', () => {
  envelope.querySelector('.envelope').classList.add('opening');
  setTimeout(() => {
    intro.classList.add('fade-out');
    setTimeout(() => {
      intro.classList.add('hidden');
      gallery.classList.remove('hidden');
    }, 700);
  }, 600);
});

prevBtn.addEventListener('click', prev);
nextBtn.addEventListener('click', next);

document.addEventListener('keydown', (e) => {
  if (gallery.classList.contains('hidden') || isAnimating) return;
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});

buildGallery();
