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
        this.dibujarGrafico(x1, y1);
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

    if ((x1 < 0 && y1 < 0) || (x1 > 0 && y1 < 0)) {
      return Number(o) + 360;
    } else {
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
    if (x1 < 0 && y1 < 0) {
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
    this.dibujarGrafico(x1, y1);
  }

  dibujarGrafico(x1, y1) {
    const ctx = document.getElementById('myChart').getContext('2d');
    let myChart = new Chart(ctx, {
      type: 'scatter',
      plugins: [
        {
          beforeDraw: (chart) => {
            var xAxis = chart.scales['x-axis-1'];
            var yAxis = chart.scales['y-axis-1'];
            const scales = chart.chart.config.options.scales;
            scales.xAxes[0].ticks.padding = yAxis.top - yAxis.getPixelForValue(0) + 6;
            scales.yAxes[0].ticks.padding = xAxis.getPixelForValue(0) - xAxis.right + 6;
          },
        },
      ],
      data: {
        datasets: [
          {
            label: 'Vector v',
            data: [
              {
                x: 0,
                y: 0,
              },
              {
                x: x1,
                y: y1,
              },
            ],
            borderColor: '#5625f7',
            showLine: true,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          xAxes: [
            {
              ticks: {
                min: -10,
                max: 10,
                stepSize: 1,
                callback: (v) => (v == 0 ? '' : v),
              },
              gridLines: {
                drawTicks: false,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                min: -10,
                max: 10,
                stepSize: 1,
                callback: (v) => (v == 0 ? '' : v),
              },
              gridLines: {
                drawTicks: false,
              },
            },
          ],
        },
      },
    });
  }
}

function cambiarVisual() {
  const calculo = document.getElementById('calcs').value;
  const span = document.getElementById('degree-symbol');

  if (calculo == 'polar_a_cartesiana') {
    span.classList.add('show');
  } else {
    span.classList.remove('show');
  }

  start();
}

function start() {
  let = new Conversor();
}

start();
