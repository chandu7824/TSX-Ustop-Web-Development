// script.js

let currentSection = document.querySelector('.section.active');

const sections = Array.from(document.querySelectorAll('.section'));
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const targetId = link.getAttribute('href').replace('#', '');
    const targetSection = document.getElementById(targetId);

    if (!targetSection || targetSection === currentSection) return;

    const currentIndex = sections.indexOf(currentSection);
    const targetIndex = sections.indexOf(targetSection);
    const direction = targetIndex > currentIndex ? 'left' : 'right';

    targetSection.classList.add('active');
    targetSection.style.display = 'block';
    targetSection.style.transform = `translateX(${direction === 'left' ? '100%' : '-100%'})`;

    requestAnimationFrame(() => {
      currentSection.style.transform = `translateX(${direction === 'left' ? '-100%' : '100%'})`;
      currentSection.style.opacity = '0';
      targetSection.style.transform = 'translateX(0)';
      targetSection.style.opacity = '1';
    });

    setTimeout(() => {
      currentSection.classList.remove('active');
      currentSection.style.display = 'none';
      currentSection.style.opacity = '';
      currentSection.style.transform = '';

      targetSection.style.transform = '';
      targetSection.style.opacity = '';

      currentSection = targetSection;
    }, 500);

    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});
