//Fucion calcula la Hidratacion con el meteodo Holliday-Segar
//Recibe un parametro @valorPeso
//Devulve un arrat con 4 Valores, el ultimo valor indicsi se puede realizar la operacion
function calcular_hd_HS(valorPeso, unidad_p) {
  if (unidad_p === "Lb") {
    valorPeso = lb_to_kg(valorPeso);
  }

  if (valorPeso <= 30 && valorPeso > 0 && !isNaN(valorPeso)) {
    if (valorPeso <= 10) {
      hd = valorPeso * 100;
    } else if (valorPeso <= 20) {
      hd = 10 * 100 + (valorPeso - 10) * 50;
    } else {
      hd = 10 * 100 + 10 * 50 + (valorPeso - 20) * 20;
    }
    hd_mant = Math.round(hd / 24);
    hd_m2 = hd_mant * 1.5;
    return [hd, hd_mant, hd_m2, "succes"];
  } else return [0, 0, 0, "errorPeso"];
}

//Fucion calcula la Hidratacion con el meteodo de Superficie Corporal
//Recibe un parametro @valorPeso
//Devulve un arrat con 4 Valores, el ultimo valor indicsi se puede realizar la operacion

function calcular_hd_SC(valorPeso) {
  if (valorPeso > 30 && valorPeso > 0 && !isNaN(valorPeso)) {
    console.log(valorPeso);

    sc = (valorPeso * 4 + 7) / (valorPeso + 90);

    hd = (sc * 1500).toFixed(2);
    hd_mant = (hd / 24).toFixed(2);
    hd_m2 = (hd_mant * 1.5).toFixed(2);

    hd_2000 = (sc * 2000).toFixed(2);
    hd_mant_2000 = (hd_2000 / 24).toFixed(2);
    hd_m2_2000 = (hd_mant_2000 * 1.5).toFixed(2);
    return [hd, hd_2000, hd_m2, hd_m2_2000, hd_mant, hd_mant_2000, "succes"];
  } else return [0, 0, 0, 0, 0, 0, "erroPeso"];
}

function print_hd_HS(hd, hd_mant, hd_m2, unidad_v, unidad_p) {
  let hd_diarioElement = document.getElementById("hd-diario");
  let hd_horaElement = document.getElementById("hd-hora");
  let hd_m2mElement = document.getElementById("hd-m/2");
  let info_sin_pesoElement = document.getElementById("info-sin-peso");
  let over_30_infoElement = document.getElementById("over-30-info");
  let labe_pesoElement = document.getElementById("label-peso");

  hd_diarioElement.textContent = hd + ` ${unidad_v}`;
  hd_horaElement.textContent = hd_mant + ` ${unidad_v}/hr`;
  hd_m2mElement.textContent = hd_m2 + `${unidad_v} m+m/2`;
  labe_pesoElement.textContent = `Peso en Lb ${unidad_p}`;
  under_30_infoElement.style.display = "block";
  info_sin_pesoElement.style.display = "none";
  over_30_infoElement.style.display = "none";
}

function calcular_mostrar_HS(valorPeso, unidad_p, unidad_v) {
  const resultados = calcular_hd_HS(valorPeso, unidad_p);
  if (resultados[3] === "succes") {
    const [hd, hd_mant, hd_m2] = resultados;
    print_hd_HS(hd, hd_mant, hd_m2, unidad_v);
  } else {
    console.error("Error en el cálculo de HD:", resultados[3]);
  }
}
function lb_to_kg(valorPeso) {
  const lbToKg = 0.45359237;
  return (valorPeso = lbToKg * valorPeso);
}

document.addEventListener("DOMContentLoaded", function () {
  // Agregar un evento input para escuchar los cambios en el campo de entrada
  inputPeso.addEventListener("input", function () {
    // Obtener el valor actual del campo de entrada
    let valorPeso = inputPeso.value;

    let hd_diarioElement = document.getElementById("hd-diario");
    let hd_horaElement = document.getElementById("hd-hora");
    let hd_m2mElement = document.getElementById("hd-m/2");
    let under_30_infoElement = document.getElementById("under-30-info");
    let over_30_infoElement = document.getElementById("over-30-info");
    let info_sin_pesoElement = document.getElementById("info-sin-peso");
    let ifo_pesoElement = document.getElementById("info-peso");
    let ifo_peso2Element = document.getElementById("info-peso2");

    let hd;
    let hd_mant;
    let hd_m2;
    let hd_2000;
    let hd_mant_2000;
    let hd_m2_2000;
    let sc = 0;

    if (valorPeso === "") {
      hd_diarioElement.textContent = "-";
      hd_horaElement.textContent = "-";
      hd_m2mElement.textContent = "-";
    }
    if (valorPeso === "0") {
      hd_diarioElement.textContent = "El peso debe ser mayor a 0";
      hd_horaElement.textContent = "El peso debe ser mayor a 0";
      hd_m2mElement.textContent = "El peso debe ser mayor a 0";
    }
  });
});
