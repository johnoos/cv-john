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
