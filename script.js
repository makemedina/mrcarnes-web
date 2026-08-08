document.getElementById('anioActual').textContent = new Date().getFullYear();

const menuBoton = document.getElementById('menuBoton');
const nav = document.getElementById('nav');

menuBoton.addEventListener('click', () => {
  const abierto = nav.classList.toggle('abierto');
  menuBoton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
});

nav.querySelectorAll('a').forEach((enlace) => {
  enlace.addEventListener('click', () => {
    nav.classList.remove('abierto');
    menuBoton.setAttribute('aria-expanded', 'false');
  });
});
