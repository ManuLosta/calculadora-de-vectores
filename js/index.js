function cartesianaAPolar(x1, y1) {
  const r = resolverR(x1, y1);
  const o = resolverO(x1, y1);

  console.log(`(${r}; ${o}°)`);
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
  let division = x1 / y1;
  if (division === Infinity || division === -Infinity) {
    division = 0;
  }

  let o = parseFloat(radianesAGrados(Math.atan(division))).toFixed(2);

  if (corregirCuadrante(x1, y1) === 4) {
    o = Number(o) + 360;
  } else if (corregirCuadrante(x1, y1) === 3) {
    o = Number(o) + 180;
  } else if (corregirCuadrante(x1, y1) === 2) {
    o = Number(o) + 180;
  }

  if (x1 === 0) {
    o = corregirAngulo(x1, y1);
  }

  if (y1 === 0) {
    o = corregirAngulo(x1, y1);
  }

  return o;
}

function radianesAGrados(radianes) {
  const pi = Math.PI;
  return radianes * (180 / pi);
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
    if (x1 > 1) {
      return 0;
    } else {
      return 180;
    }
  }
}
