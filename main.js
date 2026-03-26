import './style.css';

// === CONFIG ===
// Ganti nomor WhatsApp di sini (format: kode negara + nomor, tanpa + atau spasi)
const WA_NUMBER = '6282242407499';

// === Navbar scroll effect ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// === Mobile menu toggle ===
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  navToggle.classList.toggle('active');
});

document.querySelectorAll('.navbar__link').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  });
});

// === Booking Modal ===
const bookingModal = document.getElementById('bookingModal');
const bookBtn = document.getElementById('bookBtn');
const modalClose = document.getElementById('modalClose');
const bookingForm = document.getElementById('bookingForm');
const waFloat = document.getElementById('waFloat');

function openModal() {
  bookingModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  bookingModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Open modal from navbar button
bookBtn.addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
});

// Open modal from WA float button
waFloat.addEventListener('click', (e) => {
  e.preventDefault();
  openModal();
});

// Close modal
modalClose.addEventListener('click', closeModal);
bookingModal.addEventListener('click', (e) => {
  if (e.target === bookingModal) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// === WhatsApp Message Builder ===
bookingForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('bookName').value.trim();
  const service = document.getElementById('bookService').value;
  const dateRaw = document.getElementById('bookDate').value;
  const location = document.getElementById('bookLocation').value.trim();
  const notes = document.getElementById('bookNotes').value.trim();

  // Format tanggal ke format Indonesia
  const dateObj = new Date(dateRaw);
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateFormatted = dateObj.toLocaleDateString('id-ID', options);

  // Build WhatsApp message template
  let message = `Halo Vira Salon! 👋\n\nSaya ingin membuat janji:\n\n`;
  message += `📋 *Nama:* ${name}\n`;
  message += `💇 *Layanan:* ${service}\n`;
  message += `📅 *Tanggal:* ${dateFormatted}\n`;

  if (location) {
    message += `📍 *Lokasi Acara:* ${location}\n`;
  }

  if (notes) {
    message += `📝 *Catatan:* ${notes}\n`;
  }

  message += `\nTerima kasih! 🙏`;

  // Encode and open WhatsApp
  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${WA_NUMBER}?text=${encoded}`;

  window.open(waUrl, '_blank');
  closeModal();
});

// === Scroll reveal animation ===
const revealElements = document.querySelectorAll(
  '.service-card, .about__inner, .testimonial-card, .team__member, .services__header, .about__header, .testimonials__header, .team__header, .services__full-list'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealOnScroll = () => {
  const reveals = document.querySelectorAll('.reveal');
  reveals.forEach((el, i) => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const revealPoint = 100;

    if (elementTop < windowHeight - revealPoint) {
      setTimeout(() => {
        el.classList.add('active');
      }, i * 50);
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// === Smooth scroll for anchor links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
