// Hamburger toggles the nav menu
(function(){
function qs(s){return document.querySelector(s)}
document.getElementById('hamburger').addEventListener('click', function(){ qs('#main-nav').classList.toggle('open') })
// other pages may have hamburger with different ids
['hamburger2','hamburger3','hamburger4'].forEach(id=>{
const el = qs('#'+id); if(el) el.addEventListener('click', ()=> qs('.main-nav').classList.toggle('open'))
})
// close nav on link click
document.querySelectorAll('.main-nav a').forEach(a=> a.addEventListener('click', ()=> qs('.main-nav').classList.remove('open')))
})();
