/* FULL REBUILT site.js – synchronised with index.html */

/* ---------------- NAV + SMOOTH SCROLL ---------------- */
(function(){
  const hamburger=document.getElementById('hamburger');
  const nav=document.getElementById('primary-nav');

  function closeNav(){nav.classList.remove('mobile');hamburger.setAttribute('aria-expanded','false');}

  hamburger.addEventListener('click',()=>{
    const expanded=hamburger.getAttribute('aria-expanded')==='true';
    if(!expanded){nav.classList.add('mobile');hamburger.setAttribute('aria-expanded','true');}
    else closeNav();
  });

  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click',e=>{
      const id=a.getAttribute('href');
      const tgt=document.querySelector(id);
      if(tgt){e.preventDefault();tgt.scrollIntoView({behavior:'smooth',block:'start'});} 
      closeNav();
    });
  });
})();

/* ---------------- EMAILJS SETUP ---------------- */
const EMAILJS_SERVICE_ID='service_46jk3wa';
const EMAILJS_TEMPLATE_ID='template_opcqy9j';
const EMAILJS_USER_ID='dCZKYcRrPzf_eE_bz';

function sendEmailJS(event){
  event.preventDefault();
  const form=document.getElementById('contact-form');
  const btn=document.getElementById('submit-btn');
  const statusBox=document.getElementById('form-status');

  // validate
  let ok=true;
  form.querySelectorAll('[required]').forEach(f=>{
    const err=f.parentElement.querySelector('.error-msg');
    if(!f.checkValidity()){ok=false;err.style.display='block';err.textContent='This field is required.';} else err.style.display='none';
  });
  if(!ok) return;

  const params={
    name:form.name.value,
    email:form.email.value,
    role:form.role.value,
    message:form.message.value,
    dates:form.dates.value||''
  };

  btn.disabled=true;
  btn.innerHTML='Sending <span class="spinner"></span>';
  statusBox.className='status';statusBox.textContent='';

  fetch('https://api.emailjs.com/api/v1.0/email/send',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({service_id:EMAILJS_SERVICE_ID,template_id:EMAILJS_TEMPLATE_ID,user_id:EMAILJS_USER_ID,template_params:params})
  })
  .then(r=>{if(!r.ok) throw new Error();statusBox.className='status success visible';statusBox.textContent='Message sent successfully!';form.reset();})
  .catch(()=>{statusBox.className='status error visible';statusBox.textContent='Error sending message. Please try again.';})
  .finally(()=>{btn.disabled=false;btn.textContent='Send enquiry';});
}

/* ---------------- LIVE VALIDATION ---------------- */
(function(){
  const form=document.getElementById('contact-form');
  const submitBtn=document.getElementById('submit-btn');

  form.querySelectorAll('[required]').forEach(f=>{
    let em=f.parentElement.querySelector('.error-msg');
    if(!em){em=document.createElement('div');em.className='error-msg';f.parentElement.appendChild(em);}    
    f.addEventListener('input',()=>{
      const err=f.parentElement.querySelector('.error-msg');
      if(!f.checkValidity()){err.style.display='block';err.textContent='This field is required.';} else err.style.display='none';
    });
  });

  function update(){
    const allValid=[...form.querySelectorAll('[required]')].every(f=>f.checkValidity());
    submitBtn.disabled=!allValid;
  }
  form.addEventListener('input',update);
  update();
})(); site.js */
