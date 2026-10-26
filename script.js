document.getElementById('anioActual').textContent = new Date().getFullYear();

const menuBoton = document.getElementById('menuBoton');
const nav = document.getElementById('nav');

function cerrarMenu() {
  nav.classList.remove('abierto');
  menuBoton.setAttribute('aria-expanded', 'false');
}

menuBoton.addEventListener('click', () => {
  const abierto = nav.classList.toggle('abierto');
  menuBoton.setAttribute('aria-expanded', abierto ? 'true' : 'false');
});

nav.querySelectorAll('a').forEach((enlace) => enlace.addEventListener('click', cerrarMenu));
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') cerrarMenu();
});

// Contador de productos por categoría
document.querySelectorAll('.categoria').forEach((cat) => {
  const total = cat.querySelectorAll('.chips li').length;
  cat.querySelector('.cuenta').textContent = total + (total === 1 ? ' producto' : ' productos');
});

// Estado "Abierto ahora" según el horario (lunes a sábado, 8:00 a 17:00, hora de Culiacán)
(function () {
  const APERTURA = 8 * 60;
  const CIERRE = 17 * 60;
  try {
    const partes = {};
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Mazatlan',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(new Date()).forEach((p) => { partes[p.type] = p.value; });

    const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(partes.weekday);
    const minutos = parseInt(partes.hour, 10) * 60 + parseInt(partes.minute, 10);
    if (dia < 0 || isNaN(minutos)) return;

    let texto;
    let abierto = false;
    if (dia >= 1 && dia <= 6 && minutos >= APERTURA && minutos < CIERRE) {
      abierto = true;
      texto = 'Abierto ahora · cierra a las 5:00 PM';
    } else if (dia >= 1 && dia <= 6 && minutos < APERTURA) {
      texto = 'Cerrado ahora · abre hoy a las 8:00 AM';
    } else if (dia >= 1 && dia <= 5) {
      texto = 'Cerrado ahora · abre mañana a las 8:00 AM';
    } else {
      texto = 'Cerrado ahora · abre el lunes a las 8:00 AM';
    }

    const caja = document.getElementById('estadoHorario');
    document.getElementById('estadoTexto').textContent = texto;
    caja.classList.toggle('cerrado', !abierto);
    caja.hidden = false;
  } catch (e) {
    // Si el navegador no soporta la consulta de hora, simplemente no se muestra el estado.
  }
})();
