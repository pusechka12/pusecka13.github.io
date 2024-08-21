// Тема
let isDarkTheme = false;
let isRaining = false;
const themeToggleBtn = document.getElementById('themeToggle');

themeToggleBtn.addEventListener('click', () => {
  isDarkTheme = !isDarkTheme;
  document.body.classList.toggle('dark-theme');
  themeToggleBtn.textContent = `Тема: ${isDarkTheme ? 'Темная' : 'Светлая'}`;

  // Пасхалка: Снег или дождь
  if (isDarkTheme) {
    startSnowfall();
    stopRainfall();
  } else {
    stopSnowfall();
    startRainfall();
  }
});

// Генерация палитры
document.getElementById('generatePalette').addEventListener('click', () => {
  const paletteType = document.getElementById('paletteType').value;
  const temperature = document.getElementById('temperature').value;
  generatePalette(paletteType, temperature);
});

function generatePalette(type, temperature) {
  const paletteContainer = document.getElementById('palette');
  paletteContainer.innerHTML = '';
  const colors = getPaletteColors(type, temperature);

  colors.forEach(color => {
    const colorBox = document.createElement('div');
    colorBox.classList.add('color-box');
    colorBox.style.backgroundColor = color;

    const rgbColor = hslToRgb(color);
    const colorText = document.createElement('p');
    colorText.textContent = `RGB: ${rgbColor}`;
    colorBox.appendChild(colorText);

    paletteContainer.appendChild(colorBox);
  });
}

function getPaletteColors(type, temperature) {
  const warmRange = [0, 60];   // Теплые оттенки
  const coolRange = [180, 240]; // Холодные оттенки

  const baseHue = getRandomInRange(...(temperature === 'warm' ? warmRange : coolRange));

  switch (type) {
    case 'chromatic':
      return getChromaticPalette(baseHue);
    case 'analogous':
      return getAnalogousPalette(baseHue);
    case 'complementary':
      return getComplementaryPalette(baseHue);
    case 'contrast':
      return getContrastPalette(baseHue);
    case 'classic':
      return getClassicPalette(baseHue);
    case 'square':
      return getSquarePalette(baseHue);
    case 'rectangular':
      return getRectangularPalette(baseHue);
    case 'tetra':
      return getTetraPalette(baseHue);
    default:
      return [];
  }
}

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getChromaticPalette(hue) {
  return Array.from({ length: 5 }, (_, i) => `hsl(${hue + i * 15}, 100%, 50%)`);
}

function getAnalogousPalette(hue) {
  return Array.from({ length: 3 }, (_, i) => `hsl(${hue + i * 30}, 100%, 50%)`);
}

function getComplementaryPalette(hue) {
  return [`hsl(${hue}, 100%, 50%)`, `hsl(${(hue + 180) % 360}, 100%, 50%)`];
}

function getContrastPalette(hue) {
  return [`hsl(${hue}, 100%, 50%)`, `hsl(${(hue + 120) % 360}, 100%, 50%)`];
}

function getClassicPalette(hue) {
  return [`hsl(${hue}, 100%, 50%)`, `hsl(${(hue + 180) % 360}, 50%, 50%)`];
}

function getSquarePalette(hue) {
  return Array.from({ length: 4 }, (_, i) => `hsl(${hue + i * 90}, 100%, 50%)`);
}

function getRectangularPalette(hue) {
  return [`hsl(${hue}, 100%, 50%)`, `hsl(${(hue + 60) % 360}, 100%, 50%)`, `hsl(${(hue + 180) % 360}, 100%, 50%)`, `hsl(${(hue + 240) % 360}, 100%, 50%)`];
}

function getTetraPalette(hue) {
  return [`hsl(${hue}, 100%, 50%)`, `hsl(${(hue + 90) % 360}, 100%, 50%)`, `hsl(${(hue + 180) % 360}, 100%, 50%)`, `hsl(${(hue + 270) % 360}, 100%, 50%)`];
}

// Конвертация HSL в RGB
function hslToRgb(hsl) {
  const [h, s, l] = hsl.match(/\d+/g).map(Number);
  const rgb = hslToRgbConversion(h, s, l);
  return `${rgb.r}, ${rgb.g}, ${rgb.b}`;
}

function hslToRgbConversion(h, s, l) {
  s /= 100;
  l /= 100;

  const k = n => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = n => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));

  return {
    r: Math.round(f(0) * 255),
    g: Math.round(f(8) * 255),
    b: Math.round(f(4) * 255)
  };
}

// Снег
let snowInterval;
function startSnowfall() {
  stopSnowfall(); // Очищаем предыдущий снег, если был
  snowInterval = setInterval(createSnowflake, 100);
}

function stopSnowfall() {
  clearInterval(snowInterval);
  document.querySelectorAll('.snowflake').forEach(snowflake => snowflake.remove());
}

function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.textContent = '❄';
  snowflake.style.left = `${Math.random() * window.innerWidth}px`;
  snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;
  snowflake.style.fontSize = `${Math.random() * 10 + 10}px`;
  document.body.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, 5000); // Удаляем снежинку через 5 секунд
}

// Дождь
let rainInterval;
function startRainfall() {
  stopRainfall(); // Очищаем предыдущий дождь, если был
  rainInterval = setInterval(createRaindrop, 100);
}

function stopRainfall() {
  clearInterval(rainInterval);
  document.querySelectorAll('.raindrop').forEach(raindrop => raindrop.remove());
}

function createRaindrop() {
  const raindrop = document.createElement('div');
  raindrop.classList.add('raindrop');
  raindrop.style.left = `${Math.random() * window.innerWidth}px`;
  raindrop.style.animationDuration = `${Math.random() * 2 + 1}s`;
  raindrop.style.width = `${Math.random() * 2 + 1}px`;
  raindrop.style.height = `${Math.random() * 20 + 20}px`;
  document.body.appendChild(raindrop);

  setTimeout(() => {
    raindrop.remove();
  }, 3000); // Удаляем каплю дождя через 3 секунды
}
