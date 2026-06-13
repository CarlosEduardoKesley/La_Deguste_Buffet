// ── NAVBAR scroll ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── Mobile menu ──
document.getElementById('navToggle').addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
});

// ── Counter animation ──
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const timer = setInterval(() => {
      current = Math.min(current + step, target);
      el.textContent = Math.floor(current);
      if (current >= target) clearInterval(timer);
    }, 16);
  });
}

// ── Intersection Observer for counters ──
const statsSection = document.querySelector('.stats');
let counted = false;
const observer = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting && !counted) {
    counted = true;
    animateCounters();
  }
}, { threshold: 0.3 });
if (statsSection) observer.observe(statsSection);

// ── Scroll reveal ──
const revealEls = document.querySelectorAll('.diferencial-card, .servico-card, .dep-card, .galeria-item');
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  revealObserver.observe(el);
});

// ── Form submit ──
function handleForm(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.textContent = 'Enviando...';
  btn.disabled = true;
  setTimeout(() => {
    btn.textContent = 'Enviar Mensagem';
    btn.disabled = false;
    document.getElementById('formSuccess').style.display = 'block';
    e.target.reset();
    setTimeout(() => document.getElementById('formSuccess').style.display = 'none', 5000);
  }, 1200);
}
