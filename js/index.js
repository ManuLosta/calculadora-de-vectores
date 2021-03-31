const output = document.getElementById('output');
const firstParameter = document.getElementById('firstParameter');
const secondParameter = document.getElementById('secondParameter');

class Conversor {
  constructor() {
    const calculo = document.getElementById('calcs').value;
    const x1 = Number(firstParameter.value);
    const y1 = Number(secondParameter.value);

    this.calcular(x1, y1, calculo);
  }

  calcular(x1, y1, calculo) {
    switch (calculo) {
      case 'cartesiana_a_polar':
        this.cartesianaAPolar(x1, y1);
        break;
      case 'polar_a_cartesiana':
        this.polarAcartesiana(x1, y1);
        break;
    }
  }

  cartesianaAPolar(x1, y1) {
    const r = this.resolverR(x1, y1);
    const o = this.resolverO(x1, y1);

    console.log(`(${r}; ${o}°)`);
    output.innerHTML = `v = (${r}; ${o}°)`;
  }

  resolverR(x1, y1) {
    const sumaDeCuadrados = x1 ** 2 + y1 ** 2;

    if (Math.sqrt(sumaDeCuadrados) % 1 === 0) {
      return Math.sqrt(sumaDeCuadrados);
    } else {
      return `&radic;${sumaDeCuadrados}`;
    }
  }

  resolverO(x1, y1) {
    let o = parseFloat(this.radianesAGrados(Math.atan2(y1, x1))).toFixed(2);

    if (x1 === 0 || y1 === 0) {
      return this.corregirAngulo(x1, y1);
    }

    switch (this.corregirCuadrante(x1, y1)) {
      case 4:
        return Number(o) + 360;
      case 3:
        return Number(o) + 180;
      case 2:
        return Number(o) + 180;
      default:
        return o;
    }
  }

  radianesAGrados(radianes) {
    const pi = Math.PI;
    return radianes * (180 / pi);
  }

  gradosARadianes(grados) {
    const pi = Math.PI;
    return grados * (pi / 180);
  }

  corregirCuadrante(x1, y1) {
    if (x1 < 0 && y1 > 0) {
      return 2;
    } else if (x1 < 0 && y1 < 0) {
      return 3;
    } else if (x1 > 0 && y1 < 0) {
      return 4;
    }
  }

  corregirAngulo(x1, y1) {
    if (x1 === 0) {
      if (y1 > 0) {
        return 90;
      } else {
        return 270;
      }
    } else {
      if (x1 > 0) {
        return 0;
      } else {
        return 180;
      }
    }
  }

  polarAcartesiana(r, o) {
    const x1 = parseFloat(Math.cos(this.gradosARadianes(o)) * r).toFixed(2);
    const y1 = parseFloat(Math.sin(this.gradosARadianes(o)) * r).toFixed(2);

    console.log(`(${x1}; ${y1})`);
    output.innerHTML = `v = (${x1}; ${y1})`;
  }
}

function cambiarVisual() {
  console.log('a');
  const calculo = document.getElementById('calcs').value;
  const span = document.getElementById('degree-symbol');

  output.innerHTML = '';

  firstParameter.value = '';
  secondParameter.value = '';

  if (calculo == 'polar_a_cartesiana') {
    span.classList.add('show');
  } else {
    span.classList.remove('show');
  }
}

function start() {
  window.calculo = new Conversor();
}

function limpiarResultado() {
  output.innerHTML = '';
}
