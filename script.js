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
    message: 'Тримаєш руїни одним пальцем, бо ти наш найсильніший і найвеселіший тато. З Днем Батька! Люблю тебе. 💙'
  }
];

let currentIndex = 0;
let dragX = 0;
let startX = 0;
let lastX = 0;
let lastTime = 0;
let velocityX = 0;
let isDragging = false;
let hasMoved = false;
let isAnimating = false;
let rafId = null;
let pointerId = null;

const intro = document.getElementById('intro');
const envelope = document.getElementById('envelope');
const gallery = document.getElementById('gallery');
const track = document.getElementById('carouselTrack');
const dotsContainer = document.getElementById('dots');
const counter = document.getElementById('counter');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let cardStack = null;

function cardHtml(photo, index) {
  const pos = photo.objectPosition || 'center center';
  const aspect = photo.aspectRatio || '1 / 1';
  return `
    <div class="polaroid">
      <div class="polaroid-inner">
        <div class="polaroid-front">
          <img src="${photo.src}" alt="Спогад ${index + 1}" decoding="async" draggable="false"
            style="object-position: ${pos}; aspect-ratio: ${aspect}">
          <div class="polaroid-footer">
            <span class="polaroid-caption">${photo.caption}</span>
          </div>
        </div>
        <div class="polaroid-back">
          <p class="back-date">${formatDateUk(photo.date)}</p>
          <p class="back-message">${photo.message}</p>
          <span class="back-heart">💙</span>
        </div>
      </div>
    </div>
  `;
}

function swipeThreshold() {
  return Math.min(track.offsetWidth * 0.18, 72);
}

function rubberBand(value, min, max) {
  if (value > max) return max + (value - max) * 0.2;
  if (value < min) return min + (value - min) * 0.2;
  return value;
}

function cardTransform(x, rotate) {
  return `translate3d(${x}px, 0, 0) translate3d(-50%, -50%, 0) rotate(${rotate}deg)`;
}

function getActiveCard() {
  return cardStack.querySelector('.card-active');
}

function getUnderCard() {
  return cardStack.querySelector('.card-under');
}

function attachFlipHandlers(layer) {
  const polaroid = layer.querySelector('.polaroid');
  polaroid.addEventListener('pointerup', () => {
    if (hasMoved || isAnimating) return;
    polaroid.classList.toggle('flipped');
  });
}

function createCardLayer(index, role) {
  const layer = document.createElement('div');
  layer.className = `card-layer ${role}`;
  layer.innerHTML = cardHtml(photos[index], index);
  attachFlipHandlers(layer);
  return layer;
}

function applyDrag(animate) {
  const active = getActiveCard();
  if (!active) return;

  const rotate = dragX * 0.04;
  active.classList.toggle('animating', animate);
  active.classList.toggle('dragging', isDragging && !animate);
  active.style.transform = cardTransform(dragX, rotate);
}

function scheduleDrag() {
  if (rafId) return;
  rafId = requestAnimationFrame(() => {
    applyDrag(false);
    rafId = null;
  });
}

function addUnderCard(index) {
  if (index >= photos.length || getUnderCard()) return;
  cardStack.insertBefore(createCardLayer(index, 'card-under'), cardStack.firstChild);
}

function renderStack() {
  cardStack.replaceChildren();
  addUnderCard(currentIndex + 1);
  cardStack.appendChild(createCardLayer(currentIndex, 'card-active'));
  dragX = 0;
  applyDrag(false);
}

function finishDismiss(direction) {
  currentIndex += direction;

  if (direction === 1) {
    const active = getActiveCard();
    const under = getUnderCard();
    active?.remove();
    if (under) {
      under.className = 'card-layer card-active';
      under.style.transform = '';
      under.style.opacity = '';
    }
    addUnderCard(currentIndex + 1);
  } else {
    renderStack();
  }

  dragX = 0;
  isAnimating = false;
  applyDrag(false);
  updateUI();
  preloadNext();
}

function dismissCard(direction) {
  if (isAnimating) return;
  if (direction === 1 && currentIndex >= photos.length - 1) return;
  if (direction === -1 && currentIndex <= 0) return;

  isAnimating = true;
  updateUI();

  const active = getActiveCard();
  const exitX = -direction * (track.offsetWidth + 100);
  const exitRot = -direction * 15;

  active.classList.remove('dragging');
  active.classList.add('animating');
  active.style.transform = cardTransform(exitX, exitRot);

  let finished = false;
  const done = () => {
    if (finished) return;
    finished = true;
    finishDismiss(direction);
  };

  active.addEventListener('transitionend', (e) => {
    if (e.propertyName === 'transform') done();
  }, { once: true });
  setTimeout(done, 380);
}

function snapBack() {
  dragX = 0;
  applyDrag(true);
}

function next() { dismissCard(1); }
function prev() { dismissCard(-1); }

function goTo(index) {
  if (index === currentIndex || isAnimating) return;
  currentIndex = index;
  renderStack();
  updateUI();
  preloadNext();
}

function updateUI() {
  dotsContainer.querySelectorAll('.dot').forEach((dot, i) => {
    dot.classList.toggle('active', i === currentIndex);
  });
  counter.textContent = `${currentIndex + 1} / ${photos.length}`;
  prevBtn.disabled = currentIndex === 0 || isAnimating;
  nextBtn.disabled = currentIndex === photos.length - 1 || isAnimating;
}

function preloadNext() {
  [currentIndex + 1, currentIndex + 2].forEach((i) => {
    if (i < photos.length) {
      const img = new Image();
      img.src = photos[i].src;
    }
  });
}

function setupSwipe() {
  const onStart = (x, id) => {
    if (isAnimating) return;
    isDragging = true;
    hasMoved = false;
    startX = x;
    lastX = x;
    lastTime = performance.now();
    velocityX = 0;
    pointerId = id;

    const active = getActiveCard();
    if (active) {
      active.classList.remove('animating');
      active.classList.add('dragging');
    }
  };

  const onMove = (x) => {
    if (!isDragging || isAnimating) return;

    const now = performance.now();
    const dt = now - lastTime;
    if (dt > 0) velocityX = (x - lastX) / dt;
    lastX = x;
    lastTime = now;

    dragX = x - startX;
    if (Math.abs(dragX) > 4) hasMoved = true;

    const minX = currentIndex === 0 ? 0 : -Infinity;
    const maxX = currentIndex === photos.length - 1 ? 0 : Infinity;
    dragX = rubberBand(dragX, minX, maxX);

    scheduleDrag();
  };

  const onEnd = () => {
    if (!isDragging || isAnimating) return;
    isDragging = false;
    pointerId = null;

    const active = getActiveCard();
    active?.classList.remove('dragging');

    const threshold = swipeThreshold();
    const flick = Math.abs(velocityX) > 0.4;
    const moved = hasMoved;
    hasMoved = false;

    if (moved && (dragX < -threshold || (flick && velocityX < 0 && dragX < -20))) {
      next();
    } else if (moved && (dragX > threshold || (flick && velocityX > 0 && dragX > 20))) {
      prev();
    } else {
      snapBack();
    }
  };

  track.addEventListener('pointerdown', (e) => {
    if (e.button !== 0) return;
    track.setPointerCapture(e.pointerId);
    onStart(e.clientX, e.pointerId);
  });

  track.addEventListener('pointermove', (e) => {
    if (e.pointerId !== pointerId) return;
    onMove(e.clientX);
  });

  track.addEventListener('pointerup', (e) => {
    if (e.pointerId !== pointerId) return;
    track.releasePointerCapture(e.pointerId);
    onEnd();
  });

  track.addEventListener('pointercancel', (e) => {
    if (e.pointerId !== pointerId) return;
    onEnd();
  });
}

function buildGallery() {
  cardStack = document.createElement('div');
  cardStack.className = 'card-stack';
  cardStack.id = 'cardStack';
  track.appendChild(cardStack);

  photos.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Фото ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  setupSwipe();
  renderStack();
  updateUI();
  preloadNext();
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
