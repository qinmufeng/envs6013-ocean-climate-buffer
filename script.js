const nav = document.querySelector('.nav-wrap');
const menu = document.querySelector('.menu');
const progress = document.querySelector('.progress');
const links = [...document.querySelectorAll('nav a')];
const sections = [...document.querySelectorAll('main section[id]')];

menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
links.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menu.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: .14 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

function onScroll(){
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${Math.min(100, y / max * 100)}%`;
  nav.classList.toggle('scrolled', y > 30);
  let current = '';
  sections.forEach(s => { if (y >= s.offsetTop - innerHeight * .35) current = s.id; });
  links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${current}`));
  const hero = document.querySelector('.hero-bg');
  if (hero && y < innerHeight) hero.style.transform = `scale(1.04) translateY(${y * .08}px)`;
}
addEventListener('scroll', onScroll, {passive:true});
onScroll();
