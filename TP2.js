/*# Trabajo Práctico 2 - JS
## Local de ventas de PCs

Una empresa de venta de computadoras está desarrollando un sistema para llevar registro de ventas.Para ello cuenta con la siguiente información:

  * Lista de las vendedoras de la empresa
  * Lista de ventas.Un array con objetos.Cada objeto representa una venta y tiene las propiedades`fecha`, `nombreVendedora`(un String con el nombre), `componentes`(un array Strings con el nombre de cada componente vendido).
  * Lista de precios de los componentes, de la forma(nombre componente, precio).*/


var local = {
  vendedoras: ["Ada", "Grace", "Hedy", "Sheryl"],

  ventas: [
    // tener en cuenta que Date guarda los meses del 0 (enero) al 11 (diciembre)
    { fecha: new Date(2019, 1, 4), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"] },
    { fecha: new Date(2019, 0, 2), nombreVendedora: "Grace", componentes: ["Monitor ASC 543", "Motherboard MZI"] },
    { fecha: new Date(2019, 0, 10), nombreVendedora: "Ada", componentes: ["Monitor ASC 543", "Motherboard ASUS 1200"] },
    { fecha: new Date(2019, 0, 12), nombreVendedora: "Grace", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1200"] }
  ],

  precios: [
    { componente: "Monitor GPRS 3000", precio: 200 },
    { componente: "Motherboard ASUS 1500", precio: 120 },
    { componente: "Monitor ASC 543", precio: 250 },
    { componente: "Motherboard ASUS 1200", precio: 100 },
    { componente: "Motherboard MZI", precio: 30 },
    { componente: "HDD Toyiva", precio: 90 },
    { componente: "HDD Wezter Dishital", precio: 75 },
    { componente: "RAM Quinston", precio: 110 },
    { componente: "RAM Quinston Fury", precio: 230 }
  ]
};

let { vendedoras, ventas, precios } = local;

//PARTE 1
/*1. Se pide desarrollar las siguientes funciones:
 -precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.*/
const precioMaquina = (componentes) => {
  let sumaTotal = 0;
  for (item of precios) {
    for (comp of componentes) {
      if (item.componente === comp) {
        sumaTotal += item.precio;
      }
    }
  }
  return sumaTotal;
}
//console.log(precioMaquina(["Monitor GPRS 3000", "Motherboard ASUS 1500"])); // 320 ($200 del monitor + $120 del motherboard)*/

/*-cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió.La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable`ventas`.*/
const cantidadVentasComponente = (comp) => {
  let result = 0;
  for (venta of ventas) {
    for (item of venta.componentes) {
      if (item === comp) {
        result += 1;
      }
    }
  }
  return result;
}
//console.log(cantidadVentasComponente('Monitor ASC 543')) // 2

/* vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes.O sea no cantidad de ventas, sino importe total de las ventas.El importe de una venta es el que indica la función`precioMaquina`.El mes es un número entero que va desde el 1(enero) hasta el 12(diciembre).*/
const vendedoraDelMes = (mes, anio) => {
  let mejorVendedora = 0;
  let ventasVendedoras = {};
  for (vendedora of vendedoras) {
    for (venta of ventas) {
      const month = venta.fecha.getMonth();
      const year = venta.fecha.getFullYear();
      let valorVenta = precioMaquina(venta.componentes);
      if (month + 1 === mes && year === anio && (venta.nombreVendedora === vendedora)) {
        //si cumple con las condiciones me filtra por fecha y me crea una propiedad 'vendedora' y como valor me pasa el valor de la venta
        if (ventasVendedoras[vendedora]) {
          //si encuentra la vendedora me suma su venta
          ventasVendedoras[vendedora] += valorVenta;
          // si no, la crea.
        } else {
          ventasVendedoras[vendedora] = valorVenta;
        }
      }
    }
  }
  //me quedo con los valores finales y lo itero para ver quien tiene el mayor valor
  for (item in ventasVendedoras) {
    if (ventasVendedoras[item] > mejorVendedora) {
      mejorVendedora = item;
    }
  }
  return mejorVendedora;
}
//console.log(vendedoraDelMes(1, 2019)); // "Ada"(vendio por $670, una máquina de $320 y otra de $350)

//* ventasMes(mes, anio): Obtener las ventas de un mes.El mes es un número entero que va desde el 1(enero) hasta el 12(diciembre).
const ventasMes = (mes, anio) => {
  let resultado = 0;
  mes--;
  for (const venta of ventas) {
    const ventasHechas = precioMaquina(venta.componentes);
    const month = venta.fecha.getMonth();
    const year = venta.fecha.getFullYear();
    if (month === mes && year === anio) {
      resultado += ventasHechas;
    }
  }
  return resultado;
}
//console.log(ventasMes(1, 2019)); // 1250

//* ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.
const ventasVendedora = (nombre) => {
  let total = 0;
  for (const venta of ventas) {
    const ventasTotales = precioMaquina(venta.componentes);
    if (venta.nombreVendedora === nombre) {
      total += ventasTotales;
    }
  }
  return total;
}
//console.log(ventasVendedora("Grace")); // 900

//* componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente.El dato de la cantidad de ventas es el que indica la función`cantidadVentasComponente`
const componenteMasVendido = () => {
  let masVendido = 0;
  let componentesVendidos = [];
  for (const venta of ventas) {
    //creo un array con los componentes que se vendieron. 
    for (i = 0; i < venta.componentes.length; i++) {
      //hago filtro y saco los duplicados. Mando array filtrado a componentesVendidos.
      if (!componentesVendidos.includes(venta.componentes[i])) {
        componentesVendidos.push(venta.componentes[i])
        console.log(componentesVendidos)
      }
    }
  }
  //uso el nuevo array creado para buscar el componente mas vendido
  for (i = 0; i < componentesVendidos.length; i++) {
    const cantidad = cantidadVentasComponente(componentesVendidos[i]);
    if (cantidad > masVendido) {
      masVendido = componentesVendidos[i]
    }
  }
  return masVendido;
}
//console.log(componenteMasVendido()); // Monitor GPRS 3000

//* huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1(enero) hasta el 12(diciembre).
const huboVentas = (mes, anio) => {
  for (let venta of ventas) {
    const month = venta.fecha.getMonth();
    const year = venta.fecha.getFullYear();
    if (month + 1 === mes && year === anio) {
      return true;
    }
  }
  return false;
}
//console.log(huboVentas(3, 2019)); // false

//PARTE 2
//2. Como se abrió una nueva sucursal en Caballito, ahora los datos de las ventas también tienen el nombre de la sucursal en la cual se realizó.Por ejemplo: `{ fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ["Monitor GPRS 3000", "Motherboard ASUS 1500"], sucursal: 'Centro' }`.Por este cambio, se pide:
//En las ventas ya existentes, tenemos que agregar la propiedad`sucursal` con el valor ** Centro ** (ya que es la sucursal original)
const agregarSucursal = (nombre) => {
  ventas.forEach(venta => {
    //creo una nueva propiedad con defineProperty y la meto en mi array de ojetos
    Object.defineProperty(venta, 'sucursal', {
      value: nombre,
    })
  })
  return ventas;
}
//console.log(agregarSucursal('Centro'))

//Agregar al objeto principal la propiedad`sucursales: ['Centro', 'Caballito']`
const nuevoArraySucursal = () => {
  const nuevaPropiedad = ['Centro', 'Caballito'];
  ventas.forEach(venta => {
    Object.defineProperty(venta, 'sucursal', {
      value: nuevaPropiedad,
    })
  })
  return ventas;
}
//console.log(nuevoArraySucursal())

//Cargar la siguiente información en el array `ventas`, creando sus respectivos objetos siguiendo el patrón: fecha, nombreVendedora, componentes, sucursal.

ventas.push(
  { fecha: new Date(2019, 1, 12), nombreVendedora: "Hady", componentes: ['Monitor GPRS 3000', 'HDD Toyiva'], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 24), nombreVendedora: "Sheryl", componentes: ['Motherboard ASUS 1500', 'HDD Wezter Dishital'], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 1), nombreVendedora: "Ada", componentes: ['Motherboard MZI', 'RAM Quinston Fury'], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 11), nombreVendedora: "Grace", componentes: ['Monitor ASC 543', 'RAM Quinston'], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 15), nombreVendedora: "Ada", componentes: ['Motherboard ASUS 1200', 'RAM Quinston Fury'], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 12), nombreVendedora: "Hedy", componentes: ['Motherboard ASUS 1500', 'HDD Toyiva'], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 21), nombreVendedora: "Grace", componentes: ['Motherboard MZI', 'RAM Quinston'], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 8), nombreVendedora: "Sheryl", componentes: ['Monitor ASC 543', 'HDD Wezter Dishital'], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 16), nombreVendedora: "Sheryl", componentes: ['Monitor GPRS 3000', 'RAM Quinston Fury'], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 27), nombreVendedora: "Hedy", componentes: ['Motherboard ASUS 1200', 'HDD Toyiva'], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 22), nombreVendedora: "Grace", componentes: ['Monitor ASC 543', 'HDD Wezter Dishital'], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 5), nombreVendedora: "Ada", componentes: ['Motherboard ASUS 1500', 'RAM Quinston'], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 1), nombreVendedora: "Grace", componentes: ['Motherboard MZI', 'HDD Wezter Dishital'], sucursal: "Centro" },
  { fecha: new Date(2019, 1, 7), nombreVendedora: "Sheryl", componentes: ['Monitor GPRS 3000', 'RAM Quinston'], sucursal: "Caballito" },
  { fecha: new Date(2019, 1, 14), nombreVendedora: "Ada", componentes: ['Motherboard ASUS 1200', 'HDD Toyiva'], sucursal: "Centro" },
)

//console.log(ventas)


// 12/02/2019, Hedy, ['Monitor GPRS 3000', 'HDD Toyiva'], Centro
// 24/02/2019, Sheryl, ['Motherboard ASUS 1500', 'HDD Wezter Dishital'], Caballito
// 01/02/2019, Ada, ['Motherboard MZI', 'RAM Quinston Fury'], Centro
// 11/02/2019, Grace, [Monitor ASC 543, RAM Quinston], Caballito
// 15/02/2019, Ada, ['Motherboard ASUS 1200', 'RAM Quinston Fury'], Centro
// 12/02/2019, Hedy, ['Motherboard ASUS 1500', 'HDD Toyiva'], Caballito
// 21/02/2019, Grace, ['Motherboard MZI', 'RAM Quinston'], Centro
// 08/02/2019, Sheryl, ['Monitor ASC 543', 'HDD Wezter Dishital'], Centro
// 16/02/2019, Sheryl, ['Monitor GPRS 3000', 'RAM Quinston Fury'], Centro
// 27/02/2019, Hedy, ['Motherboard ASUS 1200', 'HDD Toyiva'], Caballito
// 22/02/2019, Grace, ['Monitor ASC 543', 'HDD Wezter Dishital'], Centro
// 05/02/2019, Ada, ['Motherboard ASUS 1500', 'RAM Quinston'], Centro
// 01/02/2019, Grace, ['Motherboard MZI', 'HDD Wezter Dishital'], Centro
// 07/02/2019, Sheryl, ['Monitor GPRS 3000', 'RAM Quinston'], Caballito
// 14/02/2019, Ada, ['Motherboard ASUS 1200', 'HDD Toyiva'], Centro

// Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.
const ventasSucursal = (sucursal) => {
  let ventaEnSucursal = 0;
  for (const venta of ventas) {
    const ventasTotales = precioMaquina(venta.componentes);
    if (venta.sucursal === sucursal) {
      ventaEnSucursal += ventasTotales;
    }
  }
  return ventaEnSucursal;
}
//console.log(ventasSucursal("Centro")); // 4195

//* Las funciones ** ventasSucursal ** y ** ventasVendedora ** tienen mucho código en común, ya que es la misma funcionalidad pero trabajando con una propiedad distinta. Entonces, ¿cómo harías para que ambas funciones reutilicen código y evitemos repetir?*/
const reutilizar = (param) => {
  let resultado = 0;
  for (const venta of ventas) {
    const ventasTotales = precioMaquina(venta.componentes);
    if ((venta.sucursal === param) || (venta.nombreVendedora === param)) {
      resultado += ventasTotales;
    }
  }
  return resultado;
}
//console.log(reutilizar("Ada"));
//console.log(reutilizar("Centro"));

/* Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes.No cantidad de ventas, sino importe total de las ventas.El importe de una venta es el que indica la función`precioMaquina`.El mes es un número entero que va desde el 1(enero) hasta el 12(diciembre).*/
const sucursalDelMes = (mes, anio) => {
  let sucursalMes = 0;
  let mejorSucursal = "";

  for (let venta of ventas) {
    let totalVentas = ventasSucursal(venta.sucursal)
    const month = venta.fecha.getMonth();
    const year = venta.fecha.getFullYear();
    if (month + 1 === mes && year === anio) {
      if (totalVentas > sucursalMes) {
        sucursalMes += totalVentas;
        mejorSucursal = venta.sucursal;
      }
    }
  }
  return mejorSucursal;
}
//console.log(sucursalDelMes(2, 2019)); // "Centro"

//PARTE 3
/*3. Para tener una mejor muestra de como está resultando el local, queremos desarrollar un reporte que nos muestre las ventas por sucursal y por mes.Para esto, necesitamos crear las siguientes funciones:
  * renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes / año*/

const renderPorMes = () => {
  let ventasOrdenadas = local.ventas.sort((a, b) => {
    return a.fecha - b.fecha
  })
  //creo objeto vacio donde voy a guardar la informacion filtrada por año y mes
  let ventasPorMes = {}
  //itero la variable ordenada de ventas y guardo la info
  for (venta of ventasOrdenadas) {
    ventasPorMes[venta.fecha.getMonth()] = ventasMes(venta.fecha.getMonth() + 1, venta.fecha.getFullYear());
  }
  //creo un array con los nombres de los meses para que no me quede 1, 2 ...
  const meses = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
  ];
  //la n del final es para darle un espacio abajo
  let mostrar = 'Ventas por Mes: \n';
  //recorro el objeto (mes es la propiedad) y cambio su valor 
  for (let mes in ventasPorMes) {
    mostrar += `Total de ${meses[mes]}: ${ventasPorMes[mes]} \n`;
  }
  return mostrar;
}
//console.log(renderPorMes())
// Ventas por mes:
//   Total de enero 2019: 1250
//   Total de febrero 2019: 4210

//renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal
const renderPorSucursal = () => {
  let ventasPorSucursal = {}
  for (venta of ventas) {
    ventasPorSucursal[venta.sucursal] = ventasSucursal(venta.sucursal);
  }

  const nombreSucursales = [
    'Centro',
    'Caballito',
  ];

  let resultado = 'Ventas por Sucursal: \n';
  for (item in ventasPorSucursal) {
    resultado += `Total de ${nombreSucursales[item]}: ${ventasPorSucursal[item]} \n`;
  }
  return resultado;
}
console.log(renderPorSucursal());
// Ventas por sucursal:
//   Total de Centro: 4195
//   Total de Caballito: 1265

/*render(): Tiene que mostrar la unión de los dos reportes anteriores, cual fue el producto más vendido y la vendedora que más ingresos generó*/

/*/console.log(render());
    // Reporte
    // Ventas por mes:
    //   Total de enero 2019: 1250
    //   Total de febrero 2019: 4210
    // Ventas por sucursal:
    //   Total de Centro: 4195
    //   Total de Caballito: 1265
    // Producto estrella: Monitor GPRS 3000
    // Vendedora que más ingresos generó: Grace*/
