const header=document.querySelector('.site-header');
const nav=document.querySelector('.site-nav');
const navToggle=document.querySelector('.nav-toggle');
const navLinks=[...document.querySelectorAll(".site-nav a[href^='#']")];
const backToTop=document.querySelector('.back-to-top');
const year=document.querySelector('#year');
if(year)year.textContent=new Date().getFullYear();
function updateHeader(){header?.classList.toggle('scrolled',window.scrollY>25);backToTop?.classList.toggle('visible',window.scrollY>650)}
updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
navToggle?.addEventListener('click',()=>{const open=nav.classList.toggle('open');document.body.classList.toggle('nav-open',open);navToggle.setAttribute('aria-expanded',String(open));navToggle.innerHTML=open?'<i class="fa-solid fa-xmark"></i>':'<i class="fa-solid fa-bars"></i>'});
navLinks.forEach(link=>link.addEventListener('click',()=>{nav?.classList.remove('open');document.body.classList.remove('nav-open');navToggle?.setAttribute('aria-expanded','false');if(navToggle)navToggle.innerHTML='<i class="fa-solid fa-bars"></i>'}));
const sections=[...document.querySelectorAll('main section[id]')];
const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;navLinks.forEach(link=>link.classList.toggle('active',link.getAttribute('href')===`#${entry.target.id}`))}),{rootMargin:'-35% 0px -55% 0px',threshold:0});
sections.forEach(section=>sectionObserver.observe(section));
const revealObserver=new IntersectionObserver((entries,observer)=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.classList.add('in-view');observer.unobserve(entry.target)}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(item=>revealObserver.observe(item));
backToTop?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
