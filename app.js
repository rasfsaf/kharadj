// ============================================================
// ХАРАДЖ И 1000 ГУРИЙ — CORE APP ENGINE
// 100% Client-Side Pure Vanilla JS (No external libraries)
// ============================================================

// Global Audio Engine (Web Audio API)
class ArabSoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play Middle Eastern Oud / Phrygian scale fanfare
  playArabFanfare() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    
    // Notes: D4, Eb4, F#4, G4, A4, Bb4, C#5, D5 (Hijaz / Arabic scale)
    const melody = [
      { f: 293.66, t: 0.0, d: 0.16 }, // D4
      { f: 311.13, t: 0.16, d: 0.16 }, // Eb4
      { f: 369.99, t: 0.32, d: 0.22 }, // F#4
      { f: 392.00, t: 0.54, d: 0.22 }, // G4
      { f: 440.00, t: 0.76, d: 0.22 }, // A4
      { f: 415.30, t: 0.98, d: 0.20 }, // Ab
      { f: 369.99, t: 1.18, d: 0.22 }, // F#
      { f: 311.13, t: 1.40, d: 0.25 }, // Eb
      { f: 293.66, t: 1.65, d: 0.55 }, // D4 final
      { f: 587.33, t: 2.20, d: 0.80 }  // High D5 victory
    ];

    melody.forEach(note => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // Plucked string emulation
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(note.f, now + note.t);

      // Filter for warm oud sound
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1400, now + note.t);
      filter.frequency.exponentialRampToValueAtTime(300, now + note.t + note.d);

      gain.gain.setValueAtTime(0, now + note.t);
      gain.gain.linearRampToValueAtTime(0.28, now + note.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + note.t + note.d);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + note.t);
      osc.stop(now + note.t + note.d);
    });
  }

  // Cash Register "Ka-ching!"
  playCashSound() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    // Metallic chime 1
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1975.53, now); // B6
    gain1.gain.setValueAtTime(0.3, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    osc1.connect(gain1);
    gain1.connect(this.ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.6);

    // Metallic chime 2
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(2637.02, now + 0.1); // E7
    gain2.gain.setValueAtTime(0.35, now + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    osc2.connect(gain2);
    gain2.connect(this.ctx.destination);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.7);
  }

  // Rocket Launch Barraketa sound
  playRocketSound() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.4);
    osc.frequency.exponentialRampToValueAtTime(50, now + 0.9);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.linearRampToValueAtTime(0.4, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.9);
  }

  // Donkey Bray sound (synthesized humor)
  playDonkeySound() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;

    // "Heeeee" (high) -> "Haaaw" (low)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(580, now);
    osc.frequency.linearRampToValueAtTime(820, now + 0.25);
    osc.frequency.linearRampToValueAtTime(260, now + 0.6);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.05);
    gain.gain.linearRampToValueAtTime(0.2, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.7);
  }

  // Sci-fi Scanner Halal Sound
  playScanSound() {
    if (!this.enabled) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(300, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.4);
    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  }
}

const soundEngine = new ArabSoundEngine();

// ============================================================
// Confetti & Falling Gold/Camel/Rocket Canvas Engine
// ============================================================
class ConfettiEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.running = false;
    this.emojis = ['💰', '💵', '💎', '🐪', '🛢️', '🚀', '🌯', '✨', '👑'];
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  burst(count = 70) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: w * 0.5 + (Math.random() - 0.5) * 200,
        y: h * 0.4 + (Math.random() - 0.5) * 100,
        vx: (Math.random() - 0.5) * 18,
        vy: -Math.random() * 16 - 4,
        gravity: 0.35,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        size: Math.random() * 22 + 16,
        emoji: this.emojis[Math.floor(Math.random() * this.emojis.length)],
        opacity: 1,
        life: 1
      });
    }
    if (!this.running) {
      this.running = true;
      this.loop();
    }
  }

  loop() {
    if (!this.particles.length) {
      this.running = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      return;
    }

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.rotation += p.rotationSpeed;
      p.life -= 0.007;

      if (p.life <= 0 || p.y > this.canvas.height + 50) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = Math.max(0, p.life);
      this.ctx.font = `${p.size}px sans-serif`;
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      this.ctx.fillText(p.emoji, 0, 0);
      this.ctx.restore();
    }

    requestAnimationFrame(() => this.loop());
  }
}

let confettiEngine = null;

// ============================================================
// State & Data
// ============================================================
let currentBalance = 777420000000;
let hourisCount = 1000;
let donkeysCount = 1;
let rocketsCount = 1;
let zambiaGrants = 1;

// 12 Hilarious Pre-populated Expenses
const initialExpenses = [
  {
    icon: '🛢️',
    title: '50 баррелей сырой нефти для джакузи',
    desc: 'Омолаживающий спа-уход «Слеза Эмира» с ароматом свежего бензина АИ-100',
    cost: 95000000,
    time: '4 мин назад'
  },
  {
    icon: '🚀',
    title: 'Межконтинентальная Ракета-Баракета',
    desc: 'Класс «Машаллах-1» с отсеком для сверхбыстрой доставки горячей шаурмы в любую точку мира',
    cost: 280000000,
    time: '11 мин назад'
  },
  {
    icon: '🇿🇲',
    title: 'Профинансировать Замбию',
    desc: 'Экстренный транш правительству Замбии на закупку золотых бананов и верблюжьего молока',
    cost: 320000000,
    time: '18 мин назад'
  },
  {
    icon: '🫏',
    title: 'Боевой осёл «Desert Sport 4x4»',
    desc: 'Тонировка в круг, ксенон, прямоточный выхлоп, кожаный салон и турбонаддув на овсе',
    cost: 45000000,
    time: '24 мин назад'
  },
  {
    icon: '🤲',
    title: 'Заплатить Закят',
    desc: 'Халяльный налог на благоустройство караванов и бесплатный финиковый смузи бедуинам',
    cost: 150000000,
    time: '32 мин назад'
  },
  {
    icon: '💨',
    title: 'Золотой кальян с 5G и нейросетью',
    desc: 'Двойное яблоко с автоподжигом и встроенной голосовой моделью шейха-философа',
    cost: 18500000,
    time: '39 мин назад'
  },
  {
    icon: '🐪',
    title: 'VIP-каршеринг белых верблюдов',
    desc: 'Тариф «Шейх Ультра»: белый верблюд с гидроусилителем поводьев и массажем обоих горбов',
    cost: 12000000,
    time: '45 мин назад'
  },
  {
    icon: '⚽',
    title: 'Покупка ФК 4-го дивизиона Англии',
    desc: 'Клуб мгновенно переименован в ФК «Аль-Бирмингем», игрокам выданы позолоченные бутсы',
    cost: 400000000,
    time: '52 мин назад'
  },
  {
    icon: '🌯',
    title: 'Царская Шаурма с золотом 999 пробы',
    desc: 'Завернута в натуральный шелковый лаваш с чесночным соусом из слез завистников',
    cost: 2500000,
    time: '1 час назад'
  },
  {
    icon: '🚙',
    title: 'Позолоченный Гелендваген с турбиной от Boeing',
    desc: 'Вместо обычных ковриков постелены персидские ковры ручной работы XVI века',
    cost: 650000000,
    time: '1 час назад'
  },
  {
    icon: '🏛️',
    title: 'Аренда Пирамиды Хеопса на субботу',
    desc: 'Чисто пожарить шашлыки из барашка с пацанами под дубайский фонк',
    cost: 500000000,
    time: '2 часа назад'
  },
  {
    icon: '🌪️',
    title: 'Взятка песчаной буре в Сахаре',
    desc: 'Чтобы дула строго в спину и приятно охлаждала во время соколиной охоты',
    cost: 30000000,
    time: '2 часа назад'
  }
];

// Arabic Wisdom Quotes
const arabicWisdoms = [
  "«Кто рано встает — тот первую нефтяную скважину бурит.»",
  "«Один верблюд хорошо, а позолоченный Гелик с турбиной от боинга — машаллах.»",
  "«Не имей 100 рублей, а имей 1 000 000 000 халяль-динаров и 1000 гурий.»",
  "«Лучше плакать в золотом джакузи с нефтью, чем смеяться в переполненной маршрутке.»",
  "«Если жизнь подкидывает песок — продай его шейхам под строительство насыпного острова.»",
  "«Ракета Баракета летит быстро, но харадж начисляется еще быстрее.»",
  "«Заплатил закят — спи спокойно, хабиби.»",
  "«Настоящий шейх никогда не спрашивает цену шаурмы с золотом.»",
  "«Верблюд может идти без воды 2 недели, а шейх без стиля — ни секунды.»"
];

// Halal Scanner Verdicts
const scanVerdicts = [
  "✨ ВЕРДИКТ: 146% ХАЛЯЛЬ! Одобрено Высочайшим Советом Мудрецов Дубая.",
  "🟢 АБСОЛЮТНЫЙ ХАЛЯЛЬ! Даже верблюды одобрительно кивают головами.",
  "👑 УЛЬТРА-ХАЛЯЛЬ: Замечена космическая концентрация баррелей нефти и благодати!",
  "💎 СТАТУС: ЧИСТЕЙШИЙ ХАРАДЖ! Никакого харама, только золото и шаурма."
];

// Format numbers
function formatMoney(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// Show Toast
function showToast(text, icon = '💰') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span style="font-size:1.4rem;">${icon}</span> <span>${text}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    if (toast.parentNode) toast.parentNode.removeChild(toast);
  }, 3500);
}

// Animate Balance Counter
function animateBalance(targetValue) {
  const el = document.getElementById('wallet-balance-num');
  if (!el) return;
  el.textContent = `${formatMoney(targetValue)} د.إ`;
}

// Render Expenses
function renderExpenses() {
  const listEl = document.getElementById('expenses-container');
  if (!listEl) return;
  listEl.innerHTML = '';

  initialExpenses.forEach(item => {
    const row = document.createElement('div');
    row.className = 'expense-row';
    row.innerHTML = `
      <div class="expense-icon-box">${item.icon}</div>
      <div class="expense-info">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
      <div class="expense-meta">
        <div class="expense-cost">-${formatMoney(item.cost)} د.إ</div>
        <div class="expense-time">${item.time}</div>
      </div>
    `;
    listEl.appendChild(row);
  });
}

// Add New Live Expense
function spendMoney(icon, title, desc, cost, soundType = 'cash') {
  currentBalance = Math.max(0, currentBalance - cost);
  animateBalance(currentBalance);

  // Play Sound
  if (soundType === 'donkey') soundEngine.playDonkeySound();
  else if (soundType === 'rocket') soundEngine.playRocketSound();
  else soundEngine.playCashSound();

  // Burst confetti
  confettiEngine.burst(25);

  // Prepend to expenses list
  const listEl = document.getElementById('expenses-container');
  if (listEl) {
    const row = document.createElement('div');
    row.className = 'expense-row';
    row.style.animation = 'fadeInUp 0.4s ease';
    row.innerHTML = `
      <div class="expense-icon-box">${icon}</div>
      <div class="expense-info">
        <h3>${title} <span style="color:#ffd700;font-size:0.75rem;border:1px solid #ffd700;padding:2px 6px;border-radius:4px;margin-left:6px;">СВЕЖАК</span></h3>
        <p>${desc}</p>
      </div>
      <div class="expense-meta">
        <div class="expense-cost">-${formatMoney(cost)} د.إ</div>
        <div class="expense-time">Только что</div>
      </div>
    `;
    listEl.insertBefore(row, listEl.firstChild);
  }

  showToast(`Списано: -${formatMoney(cost)} د.إ на «${title}»!`, icon);
}

// ============================================================
// Main Execution / Event Listeners
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  confettiEngine = new ConfettiEngine('fx-canvas');
  renderExpenses();

  const claimBtn = document.getElementById('btn-claim');
  const revealZone = document.getElementById('sheikh-reveal-zone');
  const heroBox = document.getElementById('hero-box');
  const soundToggleBtn = document.getElementById('sound-toggle');
  const wisdomBtn = document.getElementById('btn-next-wisdom');
  const wisdomText = document.getElementById('wisdom-text');
  const scanBtn = document.getElementById('btn-scan-halal');
  const scanResult = document.getElementById('scan-result');

  // Sound Toggle
  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      soundEngine.enabled = !soundEngine.enabled;
      soundToggleBtn.innerHTML = soundEngine.enabled 
        ? '🔊 ЗВУК: ВКЛ' 
        : '🔇 ЗВУК: ВЫКЛ';
      soundToggleBtn.style.borderColor = soundEngine.enabled ? '#ffd700' : '#94a3b8';
      soundToggleBtn.style.color = soundEngine.enabled ? '#ffd700' : '#94a3b8';
    });
  }

  // BIG "ЗАБРАТЬ" BUTTON CLICK
  if (claimBtn) {
    claimBtn.addEventListener('click', () => {
      // 1. Play Arabian Oud Fanfare + Cash sound
      soundEngine.playArabFanfare();
      setTimeout(() => soundEngine.playCashSound(), 800);

      // 2. Confetti explosion
      confettiEngine.burst(120);

      // 3. Smooth transition: hide hero button, show sheikh spotlight & wallet
      claimBtn.style.transform = 'scale(0.9)';
      claimBtn.disabled = true;

      setTimeout(() => {
        heroBox.style.display = 'none';
        revealZone.style.display = 'block';
        
        // Scroll smoothly to sheikh
        revealZone.scrollIntoView({ behavior: 'smooth' });

        // Show welcome toast
        showToast('ХАРАДЖ УСПЕШНО ЗАЧИСЛЕН! +1000 ГУРИЙ В АКТИВАХ!', '👑');

        // Continuous celebratory small bursts
        let bursts = 0;
        const interval = setInterval(() => {
          confettiEngine.burst(30);
          bursts++;
          if (bursts >= 4) clearInterval(interval);
        }, 1200);
      }, 400);
    });
  }

  // Wisdom Generator
  if (wisdomBtn && wisdomText) {
    wisdomBtn.addEventListener('click', () => {
      soundEngine.playCashSound();
      const randomIdx = Math.floor(Math.random() * arabicWisdoms.length);
      wisdomText.textContent = arabicWisdoms[randomIdx];
      showToast('Мудрость шейха обновлена!', '📜');
    });
  }

  // Halal Scanner
  if (scanBtn && scanResult) {
    scanBtn.addEventListener('click', () => {
      soundEngine.playScanSound();
      scanBtn.textContent = '⏳ СКАНИРОВАНИЕ ЧЕРЕЗ СПУТНИК ДУБАЯ...';
      scanBtn.disabled = true;

      setTimeout(() => {
        const randVerdict = scanVerdicts[Math.floor(Math.random() * scanVerdicts.length)];
        scanResult.style.display = 'block';
        scanResult.innerHTML = `<strong>${randVerdict}</strong>`;
        scanBtn.textContent = '🔍 ПРОВЕРИТЬ ЕЩЕ РАЗ';
        scanBtn.disabled = false;
        soundEngine.playCashSound();
        confettiEngine.burst(35);
      }, 1000);
    });
  }

  // Live Spending Clickers
  const btnBuyDonkey = document.getElementById('btn-buy-donkey');
  if (btnBuyDonkey) {
    btnBuyDonkey.addEventListener('click', () => {
      donkeysCount++;
      spendMoney(
        '🫏', 
        `Боевой осёл 4x4 (Партия #${donkeysCount})`, 
        'Установлены легкосплавные диски и золотая уздечка с подогревом', 
        45000000, 
        'donkey'
      );
    });
  }

  const btnBuyRocket = document.getElementById('btn-buy-rocket');
  if (btnBuyRocket) {
    btnBuyRocket.addEventListener('click', () => {
      rocketsCount++;
      spendMoney(
        '🚀', 
        `Ракета-Баракета (Запуск #${rocketsCount})`, 
        'Успешный запуск в стратосферу, доставляет шаурму шейху на орбиту', 
        280000000, 
        'rocket'
      );
    });
  }

  const btnZambia = document.getElementById('btn-fund-zambia');
  if (btnZambia) {
    btnZambia.addEventListener('click', () => {
      zambiaGrants++;
      spendMoney(
        '🇿🇲', 
        `Грант Замбии (Транш #${zambiaGrants})`, 
        'Поставка 500 золотых тракторов и 10 000 литров верблюжьего капучино', 
        320000000, 
        'cash'
      );
    });
  }

  const btnZakat = document.getElementById('btn-pay-zakat');
  if (btnZakat) {
    btnZakat.addEventListener('click', () => {
      spendMoney(
        '🤲', 
        'Дополнительный Закят', 
        'Благословение караванов в пустыне, карма +999 999', 
        150000000, 
        'cash'
      );
    });
  }

  const btnShawarma = document.getElementById('btn-buy-shawarma');
  if (btnShawarma) {
    btnShawarma.addEventListener('click', () => {
      spendMoney(
        '🌯', 
        'Золотая Шаурма с шафраном', 
        'Подается на золотом подносе с соком из райских гранатов', 
        2500000, 
        'cash'
      );
    });
  }

  const btnOil = document.getElementById('btn-buy-oil');
  if (btnOil) {
    btnOil.addEventListener('click', () => {
      spendMoney(
        '🛢️', 
        '100 Баррелей нефти Brent', 
        'Залиты в личный бассейн для ночного заплыва', 
        190000000, 
        'cash'
      );
    });
  }
});
