/* site.js — navigation, smooth scrolling, EmailJS form handling, small UI logic */

/* ------------- Navigation & hamburger ------------- */
(function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('primary-nav');

  function closeMobileNav() {
    nav.classList.remove('mobile');
    hamburger.setAttribute('aria-expanded', 'false');
  }

  hamburger.addEventListener('click', () => {
    const expanded = hamburger.getAttribute('aria-expanded') === 'true';
    if (!expanded) {
      nav.classList.add('mobile');
      hamburger.setAttribute('aria-expanded', 'true');
    } else {
      closeMobileNav();
    }
  });

  // Close mobile nav when a nav link is clicked and do smooth scrolling
  Array.from(nav.querySelectorAll('a[href^="#"]')).forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const tgt = document.querySelector(a.getAttribute('href'));
      if (tgt) {
        tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      closeMobileNav();
    });
  });

  // Add smooth scroll for any other internal anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      // handled above for nav links; this ensures any other anchors also smooth scroll
      if (!a.closest('#primary-nav')) {
        e.preventDefault();
        const tgt = document.querySelector(a.getAttribute('href'));
        if (tgt) tgt.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

/* ------------- Form (EmailJS) ------------- */
/*
  EMAILJS SETUP (do this once):
  1. Sign up at https://www.emailjs.com
  2. Add an email service (e.g. Gmail) and note down SERVICE ID.
  3. Create a template with variables (e.g. name, email, role, message, dates).
  4. Get your PUBLIC KEY (user id) from EmailJS dashboard.
  5. Replace the placeholders below with your IDs.
*/
const EMAILJS_SERVICE_ID  = 'service_46jk3wa';
const EMAILJS_TEMPLATE_ID = 'template_opcqy9j';
const EMAILJS_USER_ID     = 'dCZKYcRrPzf_eE_bz';

function sendEmailJS(event) {
  event.preventDefault();
  const btn = document.getElementById('submit-btn');
  const statusBox = document.getElementById('form-status');

  // Basic client-side validation
  const form = document.getElementById('contact-form');
  const required = form.querySelectorAll('[required]');
  let ok = true;
  required.forEach(f => {
    const err = f.parentElement.querySelector('.error-msg');
    if (!f.checkValidity()) {
      ok = false;
      if (err) { err.style.display = 'block'; err.textContent = 'This field is required.'; }
    } else {
      if (err) { err.style.display = 'none'; }
    }
  });
  if (!ok) return;

  // Prepare template params (match variable names in your EmailJS template)
  const templateParams = {
    name: form.name.value,
    email: form.email.value,
    role: form.role.value,
    message: form.message.value,
    dates: form.dates.value || ''
  };

  // Show spinner and disable button
  btn.disabled = true;
  btn.innerHTML = 'Sending <span class="spinner"></span>';
  statusBox.className = 'status'; statusBox.textContent = '';

  // Send via EmailJS REST API - this requires your public key/user id
  fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_USER_ID,
      template_params: templateParams
    })
  })
  .then(function (response) {
    if (!response.ok) throw new Error('Network response was not ok');
    statusBox.className = 'status success visible';
    statusBox.textContent = 'Your message was sent successfully! I will reply shortly.';
    form.reset();
  })
  .catch(function (err) {
    console.error(err);
    statusBox.className = 'status error visible';
    statusBox.textContent = 'There was an error sending your message. Please try again later.';
  })
  .finally(function () {
    btn.disabled = false;
    btn.textContent = 'Send enquiry';
  });
}

/* ------------- Live client validation & button enabling ------------- */
(function () {
  const form = document.getElementById('contact-form');
  const submitBtn = document.getElementById('submit-btn');

  // create error containers if missing
  form.querySelectorAll('[required]').forEach(f => {
    let em = f.parentElement.querySelector('.error-msg');
    if (!em) {
      em = document.createElement('div'); em.className = 'error-msg'; em.setAttribute('aria-hidden','true');
      f.parentElement.appendChild(em);
    }
    // live validation
    f.addEventListener('input', () => {
      const err = f.parentElement.querySelector('.error-msg');
      if (!f.checkValidity()) { err.style.display = 'block'; err.textContent = 'This field is required.'; }
      else { err.style.display = 'none'; }
    });
  });

  function updateButtonState() {
    const allValid = Array.from(form.querySelectorAll('[required]')).every(f => f.checkValidity());
    submitBtn.disabled = !allValid;
  }
  // initial and periodic check
  updateButtonState();
  form.addEventListener('input', updateButtonState);
})();
