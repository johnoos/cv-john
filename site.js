/* FULLY REBUILT site.js — EmailJS 2025 API Compatible, Error-Safe, UI-Complete */

/* --------------------------------------------------
   NAV + SMOOTH SCROLL
-------------------------------------------------- */
(function(){
  const hamburger=document.getElementById('hamburger');
  const nav=document.getElementById('primary-nav');

  function closeNav(){
    nav.classList.remove('mobile');
    hamburger.setAttribute('aria-expanded','false');
  }

  hamburger.addEventListener('click',()=>{
    const expanded = hamburger.getAttribute('aria-expanded')==='true';
    if(!expanded){
      nav.classList.add('mobile');
      hamburger.setAttribute('aria-expanded','true');
    } else {
      closeNav();
    }
  });

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      const tgt=document.querySelector(id);
      if(tgt){
        e.preventDefault();
        tgt.scrollIntoView({behavior:'smooth',block:'start'});
      }
      closeNav();
    });
  });
})();


/* --------------------------------------------------
   EMAILJS CONFIG (REQUIRED IN 2025 API)
-------------------------------------------------- */

const EMAILJS_SERVICE_ID  = "service_46jk3wa";
const EMAILJS_TEMPLATE_ID = "template_opcqy9j";
const EMAILJS_PUBLIC_KEY  = "dCZKYcRrPzf_eE_bz";


/* --------------------------------------------------
   SEND EMAIL (Safe, Error-Handled, UI Feedback)
-------------------------------------------------- */

function sendEmailJS(event){
  event.preventDefault();

  const form      = document.getElementById('contact-form');
  const btn       = document.getElementById('submit-btn');
  const statusBox = document.getElementById('form-status');

  // Reset status
  statusBox.className = 'status';
  statusBox.textContent = '';

  /* ---------- VALIDATION ---------- */
  let valid = true;
  form.querySelectorAll('[required]').forEach(field=>{
    const err = field.parentElement.querySelector('.error-msg');
    if(!field.checkValidity()){
      valid = false;
      err.style.display = 'block';
      err.textContent   = 'This field is required.';
    } else {
      err.style.display = 'none';
    }
  });

  if(!valid) return;

  /* ---------- PARAMS ---------- */
  const params = {
    name:    form.name.value,
    email:   form.email.value,
    /* role:    form.role.value, */
    message: form.message.value
  };

  /* ---------- SENDING UI ---------- */
  btn.disabled = true;
  btn.innerHTML = 'Sending <span class="spinner"></span>';

  /* ---------- API CALL ---------- */
  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: params
    })
  })
  .then(response=>{
    if(!response.ok) throw new Error("EmailJS failed");

    statusBox.className = "status success visible";
    statusBox.textContent = "Message sent successfully!";
    form.reset();
  })
  .catch(()=>{
    statusBox.className = "status error visible";
    statusBox.textContent = "Error sending message. Please try again.";
  })
  .finally(()=>{
    btn.disabled = false;
    btn.textContent = 'Send enquiry';
  });
}


/* --------------------------------------------------
   LIVE VALIDATION (Activates Button)
-------------------------------------------------- */
(function(){
  const form = document.getElementById('contact-form');
  const submit = document.getElementById('submit-btn');

  form.querySelectorAll('[required]').forEach(field=>{
    const err = field.parentElement.querySelector('.error-msg');
    field.addEventListener('input',()=>{
      if(!field.checkValidity()){
        err.style.display = 'block';
        err.textContent   = 'This field is required.';
      } else {
        err.style.display = 'none';
      }
    });
  });

  function update(){
    const allValid = [...form.querySelectorAll('[required]')]
      .every(f => f.checkValidity());
    submit.disabled = !allValid;
  }

  form.addEventListener('input', update);
  update();
})();
