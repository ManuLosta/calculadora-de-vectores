const output = document.getElementById('output');

function calculate() {
  const firstParameter = Number(document.getElementById('firstParameter').value);
  const secondParameter = Number(document.getElementById('secondParameter').value);
  const calculo = document.getElementById('calcs').value;

  switch (calculo) {
    case 'cartesiana_a_polar':
      cartesianaAPolar(firstParameter, secondParameter);
      break;
    case 'polar_a_cartesiana':
      polarAcartesiana(firstParameter, secondParameter);
      break;
  }
}

function cartesianaAPolar(x1, y1) {
  const r = resolverR(x1, y1);
  const o = resolverO(x1, y1);

  console.log(`(${r}; ${o}°)`);
  output.innerHTML = `v = (${r}; ${o}°)`;
}

function resolverR(x1, y1) {
  const sumaDeCuadrados = x1 ** 2 + y1 ** 2;
  let r;

  if (Math.sqrt(sumaDeCuadrados) % 1 === 0) {
    r = Math.sqrt(sumaDeCuadrados);
  } else {
    r = `sqrt(${sumaDeCuadrados})`;
  }

  return r;
}

function resolverO(x1, y1) {
  const division = y1 / x1;
  let o = parseFloat(radianesAGrados(Math.atan(division))).toFixed(2);

  if (x1 === 0 || y1 === 0) {
    return corregirAngulo(x1, y1);
  }

  switch (corregirCuadrante(x1, y1)) {
    case 4:
      return Number(o) + 360;
    case 3:
      return Number(o) + 180;
    case 2:
      return Number(o) + 180;
    default:
      break;
  }
}

function radianesAGrados(radianes) {
  const pi = Math.PI;
  return radianes * (180 / pi);
}

function gradosARadianes(grados) {
  const pi = Math.PI;
  return grados * (pi / 180);
}

function corregirCuadrante(x1, y1) {
  if (x1 < 0 && y1 > 0) {
    return 2;
  } else if (x1 < 0 && y1 < 0) {
    return 3;
  } else if (x1 > 0 && y1 < 0) {
    return 4;
  }
}

function corregirAngulo(x1, y1) {
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

function polarAcartesiana(r, o) {
  const x1 = parseFloat(Math.cos(gradosARadianes(o)) * r).toFixed(2);
  const y1 = parseFloat(Math.sin(gradosARadianes(o)) * r).toFixed(2);

  console.log(`(${x1}; ${y1})`);
  output.innerHTML = `(${x1}; ${y1})`;
}
