//Fucion calcula la Hidratacion con el meteodo Holliday-Segar
//Recibe un parametro @valorPeso
//Devulve un arrat con 4 Valores, el ultimo valor indicsi se puede realizar la operacion
function calcular_hd_HS(valorPeso) {
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
  } else return [0, 0, 0, `errorPeso ${valorPeso}`];
}

//Fucion calcula la Hidratacion con el meteodo de Superficie Corporal
//Recibe un parametro @valorPeso
//Devulve un arrat con 4 Valores, el ultimo valor indicsi se puede realizar la operacion
function calcular_hd_SC(valorPeso) {
  if (valorPeso > 30 && valorPeso > 0 && !isNaN(valorPeso)) {
    valorPeso = parseInt(valorPeso);
    sc = (valorPeso * 4 + 7) / (valorPeso + 90);
    hd = (sc * 1500).toFixed(2);
    hd_mant = (hd / 24).toFixed(2);
    hd_m2 = (hd_mant * 1.5).toFixed(2);
    hd_2000 = (sc * 2000).toFixed(2);
    hd_mant_2000 = (hd_2000 / 24).toFixed(2);
    hd_m2_2000 = (hd_mant_2000 * 1.5).toFixed(2);
    return [hd, hd_2000, hd_m2, hd_m2_2000, hd_mant, hd_mant_2000, "succes"];
  } else return [0, 0, 0, 0, 0, 0, `erroPeso: ${valorPeso}`];
}

//Muestas la info si es el metod de HS
function print_hd_HS(hd, hd_mant, hd_m2, unidad_v, unidad_p) {
  const e = get_elements();

  e.hd_diario.textContent = hd + ` ${unidad_v}`;
  e.hd_hora.textContent = hd_mant + ` ${unidad_v}/hr`;
  e.hd_m2m.textContent = hd_m2 + `${unidad_v} m+m/2`;
  e.labe_peso.textContent = `Peso en ${unidad_p}`;
  e.under_30_info.style.display = "block";
  e.info_sin_peso.style.display = "none";
  e.over_30_info.style.display = "none";
}
/*
Mustra en web los datos de Hidatracion cuando el es por supercie corporal
@valorPeso int (en KG) el peso de la paciente 
@unidad_p string (Kg o Lb) unidad de medid del peso
@unidad_v string unide de medida del volumen
*/
function print_hd_SC(
  hd,
  hd_2000,
  hd_m2,
  hd_m2_2000,
  hd_mant,
  hd_mant_2000,
  unidad_v,
  valorPeso
) {
  const e = get_elements();

  e.hd_diario.innerHTML = `<div table-responsive>
                              <span class="position-absolute top-0 start-40 translate-middle badge rounded-pill bg-primary">
                              <small>Volumen diario</small> 
                              </span>
                                  <table class="table  table-sm">
                                    <thead>
                                      <tr>
                                        <th scope="col">1500 ${unidad_v}</th>
                                        <th scope="col">2000 ${unidad_v}</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>${hd} ${unidad_v}</td>
                                        <td>${hd_2000} ${unidad_v}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
`;
  e.hd_hora.innerHTML = `<table class="table">
                                <span class="position-absolute top-0 start-40 translate-middle badge rounded-pill bg-primary">
                                <small>Mantenimiento</small> 
                                </span>
                                <thead>
                                  <tr>
                                    <th scope="col">1500 ${unidad_v}</th>
                                    <th scope="col">2000 ${unidad_v}</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>${hd_mant} ${unidad_v}/hr</td>
                                    <td>${hd_mant_2000} ${unidad_v}/hr</td>
                                  </tr>
                                </tbody>
                              </table>
`;
  e.hd_m2m.innerHTML = `<table class="table">
                            <span class="position-absolute top-0 start-40 translate-middle badge rounded-pill bg-primary">
                            <small>m+m/2</small> 
                            </span>
                              <thead>
                                <tr>
                                  <th scope="col">1500 ${unidad_v}</th>
                                  <th scope="col">2000 ${unidad_v}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>${hd_m2} m+m/2</td>
                                  <td>${hd_m2_2000} m+m/2</td>
                                </tr>
                              </tbody>
                            </table>
`;
  e.info_peso.textContent = valorPeso + "Kg";
  e.info_peso2.textContent = valorPeso + "Kg";
  e.under_30_info.style.display = "none";
  e.info_sin_peso.style.display = "none";
  e.over_30_info.style.display = "block";
}

/*
Calcula las datos de hidratacion con el metodo de HS
@valorPeso int (en KG) el peso de la paciente 
@unidad_p string (Kg o Lb) unidad de medid del peso
@unidad_v string unide de medida del volumen
*/
function calcular_mostrar_HS(valorPeso, unidad_p, unidad_v) {
  const resultados = calcular_hd_HS(valorPeso);
  if (resultados[3] === "succes") {
    const [hd, hd_mant, hd_m2] = resultados;
    print_hd_HS(hd, hd_mant, hd_m2, unidad_v, unidad_p);
  } else {
    console.log("Error en el cálculo de HD:", resultados[3]);
    print_hd_HS(0, 0, 0, unidad_v, unidad_p);
  }
}

/*
Calcula las datos de hidratacion con el metodo de superficie corporal  
@valorPeso int (en KG) el peso de la paciente 
@unidad_p string (Kg o Lb) unidad de medid del peso
@unidad_v string unide de medida del volumen
*/
function calcular_mostar_SC(valorPeso, unidad_p, unidad_v) {
  const resultados = calcular_hd_SC(valorPeso);
  if (resultados[6] === "succes") {
    const [hd, hd_2000, hd_m2, hd_m2_2000, hd_mant, hd_mant_2000] = resultados;
    print_hd_SC(
      hd,
      hd_2000,
      hd_m2,
      hd_m2_2000,
      hd_mant,
      hd_mant_2000,
      unidad_v,
      valorPeso
    );
  }
}

/*
Convierte de Lb a Kg  
@valorPeso int (en Lb) el peso de la paciente
*/
function lb_to_kg(valorPeso) {
  const lbToKg = 0.45359237;
  valorPeso = lbToKg * parseInt(valorPeso);
  return Math.round(valorPeso);
}
/*
Convierte de Kg a Lb  
@valorPeso int (en KG) el peso de la paciente
*/
function kg_to_lb(valorPeso) {
  const kgToLb = 2.20462;
  valorPeso = kgToLb * parseInt(valorPeso);
  return Math.round(valorPeso);
}
/*
Obtiene todos los id neseraios de los diferentes elementos del HTML DOM
*/
function get_elements() {
  const elements = {
    hd_diario: document.getElementById("hd-diario"),
    hd_hora: document.getElementById("hd-hora"),
    hd_m2m: document.getElementById("hd-m/2"),
    under_30_info: document.getElementById("under-30-info"),
    over_30_info: document.getElementById("over-30-info"),
    info_sin_peso: document.getElementById("info-sin-peso"),
    info_peso: document.getElementById("info-peso"),
    info_peso2: document.getElementById("info-peso2"),
    labe_peso: document.getElementById("label-peso"),
  };

  return elements;
}

//Obtiene las unidades de medidas los radios buttons
//cc o ml
function obtener_unidad_medida_V() {
  const unidadesDeMedidaRadios = document.getElementsByName("unVolumen");

  for (let i = 0; i < unidadesDeMedidaRadios.length; i++) {
    if (unidadesDeMedidaRadios[i].checked) {
      return unidadesDeMedidaRadios[i].id;
    }
  }
}
//Lb o Kg
function obtener_unidad_medida_P() {
  const unidadesDeMedidaRadios = document.getElementsByName("unPeso");

  for (let i = 0; i < unidadesDeMedidaRadios.length; i++) {
    if (unidadesDeMedidaRadios[i].checked) {
      return unidadesDeMedidaRadios[i].id;
    }
  }
}

//cambiar text labe input de peso
function labe_input_peso(unidad_p) {
  const e = get_elements();
  e.labe_peso.textContent = `Peso en ${unidad_p}`;
}

document.addEventListener("DOMContentLoaded", function () {
  // Agregar un evento input para escuchar los cambios en el campo de entrada
  var inputPeso = document.getElementById("pesoInput");

  inputPeso.addEventListener("input", function () {
    // Obtener el valor actual del campo de entrada
    let valorPeso = parseInt(inputPeso.value);
    let volumen = obtener_unidad_medida_V();
    let peso = obtener_unidad_medida_P();
    const e = get_elements();

    if (peso == "Lb") {
      valorPeso = lb_to_kg(valorPeso);
    }

    if (isNaN(valorPeso)) {
      e.hd_diario.textContent = "-";
      e.hd_hora.textContent = "-";
      e.hd_m2m.textContent = "-";
      e.info_sin_peso.style.display = "block";
      e.under_30_info.style.display = "none";
      e.over_30_info.style.display = "none";
    } else if (valorPeso === 0) {
      e.hd_diario.textContent = "El peso debe ser mayor a 0 Kg o 1 Lb";
      e.hd_hora.textContent = "El peso debe ser mayor a 0 Kg o 1 Lb";
      e.hd_m2m.textContent = "El peso debe ser mayor a 0 Kg o 1 Lb";
      e.info_sin_peso.style.display = "block";
      e.under_30_info.style.display = "none";
      e.over_30_info.style.display = "none";
    } else {
      if (valorPeso <= 30) {
        calcular_mostrar_HS(valorPeso, peso, volumen);
      } else calcular_mostar_SC(valorPeso, peso, volumen);
    }
  });

  const unidad_p = document.getElementsByName("unPeso");
  unidad_p.forEach(function (radio) {
    radio.addEventListener("change", function () {
      let valorPeso = parseInt(inputPeso.value);
      let volumen = obtener_unidad_medida_V();
      let peso = obtener_unidad_medida_P();
      let checkbox = document.getElementById("autoConvert");
      const e = get_elements();

      labe_input_peso(peso);

      if (peso == "Lb" && checkbox.checked) {
        inputPeso.value = kg_to_lb(inputPeso.value);
        valorPeso = lb_to_kg(inputPeso.value);
      }

      if (peso == "Kg" && checkbox.checked) {
        inputPeso.value = lb_to_kg(inputPeso.value);
        valorPeso = inputPeso.value;
      } else {
        valorPeso = inputPeso.value;
      }

      if (peso == "Lb") {
        valorPeso = lb_to_kg(valorPeso);
      }

      if (isNaN(valorPeso)) {
        e.hd_diario.textContent = "-";
        e.hd_hora.textContent = "-";
        e.hd_m2m.textContent = "-";
        e.info_sin_peso.style.display = "block";
        e.under_30_info.style.display = "none";
        e.over_30_info.style.display = "none";
      } else if (valorPeso === 0) {
        e.hd_diario.textContent = "El peso debe ser mayor a 0 Kg o 1 Lb";
        e.hd_hora.textContent = "El peso debe ser mayor a 0 Kg o 1 Lb";
        e.hd_m2m.textContent = "El peso debe ser mayor a 0 Kg o 1 Lb";
        e.info_sin_peso.style.display = "block";
        e.under_30_info.style.display = "none";
        e.over_30_info.style.display = "none";
      } else {
        if (valorPeso <= 30) {
          calcular_mostrar_HS(valorPeso, peso, volumen);
        } else calcular_mostar_SC(valorPeso, peso, volumen);
      }
    });
  });

  const unidad_v = document.getElementsByName("unVolumen");
  unidad_v.forEach(function (radio) {
    radio.addEventListener("change", function () {
      let valorPeso = parseInt(inputPeso.value);
      let volumen = obtener_unidad_medida_V();
      let peso = obtener_unidad_medida_P();
      const e = get_elements();
      labe_input_peso(peso);
      if (peso == "Lb") {
        valorPeso = lb_to_kg(valorPeso);
      }
      if (isNaN(valorPeso)) {
        e.hd_diario.textContent = "-";
        e.hd_hora.textContent = "-";
        e.hd_m2m.textContent = "-";
        e.info_sin_peso.style.display = "block";
        e.under_30_info.style.display = "none";
        e.over_30_info.style.display = "none";
      } else if (valorPeso === 0) {
        e.hd_diario.textContent = "El peso debe ser mayor a 0 Kg o 1 Lb";
        e.hd_hora.textContent = "El peso debe ser mayor a 0 Kg o 1 Lb";
        e.hd_m2m.textContent = "El peso debe ser mayor a 0 Kg o 1 Lb";
        e.info_sin_peso.style.display = "block";
        e.under_30_info.style.display = "none";
        e.over_30_info.style.display = "none";
      } else {
        if (valorPeso <= 30) {
          calcular_mostrar_HS(valorPeso, peso, volumen);
        } else calcular_mostar_SC(valorPeso, peso, volumen);
      }
    });
  });
});
