// Esperar a que se cargue el DOM
document.addEventListener("DOMContentLoaded", function () {
  // Obtener los elementos de radio por su nombre
  const unidadMedidaRadios = document.getElementsByName("unidadMedida");

  // Obtener el elemento del campo de entrada por su nuevo ID
  var inputPeso = document.getElementById("pesoInput");

  unidadMedidaRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      let labe_pesoElement = document.getElementById("label-peso");
      let ifo_pesoElement = document.getElementById("info-peso");
      let ifo_peso2Element = document.getElementById("info-peso2");
      const unidadSeleccionada = this.id;
      const lbToKg = 0.45359237;
      let valorPeso = inputPeso.value;

      if (unidadSeleccionada === "lb") {
        labe_pesoElement.textContent = "Peso en Lb";
        ifo_peso2Element.textContent = valorPeso + " Lb * 0.453";
        ifo_pesoElement.textContent = valorPeso + " Lb * 0.453";
      }
      if (unidadSeleccionada === "kg") {
        labe_pesoElement.textContent = "Peso en Kg";
      }
    });
  });

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

      hd_diarioElement.textContent = hd + " cc";
      hd_horaElement.textContent = hd_mant + " cc/hr";
      hd_m2mElement.textContent = hd_m2 + " m+m/2";
      under_30_infoElement.style.display = "block";
      info_sin_pesoElement.style.display = "none";
    } else {
      under_30_infoElement.style.display = "none";
      info_sin_pesoElement.style.display = "block";
    }

    if (valorPeso > 30 && valorPeso > 0 && !isNaN(valorPeso)) {
      console.log(valorPeso);

      sc = (valorPeso * 4 + 7) / (valorPeso + 90);
      console.log(sc);
      hd = (sc * 1500).toFixed(2);
      hd_mant = (hd / 24).toFixed(2);
      hd_m2 = (hd_mant * 1.5).toFixed(2);

      hd_2000 = (sc * 2000).toFixed(2);
      hd_mant_2000 = (hd_2000 / 24).toFixed(2);
      hd_m2_2000 = (hd_mant_2000 * 1.5).toFixed(2);

      hd_diarioElement.innerHTML = `<div table-responsive>
                                    <table class="table  table-sm">
                                      <thead>
                                        <tr>
                                          <th scope="col">1500 cc/dia</th>
                                          <th scope="col">2000 cc/dia</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>${hd} cc</td>
                                          <td>${hd_2000} cc</td>
                                        </tr>
                                      </tbody>
                                    </table>
                                    </div>
      `;
      hd_horaElement.innerHTML = `<table class="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">1500 cc/dia</th>
                                          <th scope="col">2000 cc/dia</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>${hd_mant} cc/hr</td>
                                          <td>${hd_mant_2000} cc/hr</td>
                                        </tr>
                                      </tbody>
                                    </table>
      `;
      hd_m2mElement.innerHTML = `<table class="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">1500 cc/dia</th>
                                          <th scope="col">2000 cc/dia</th>
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
      ifo_peso2Element.textContent = valorPeso + "Kg";
      ifo_pesoElement.textContent = valorPeso + "Kg";
      over_30_infoElement.style.display = "block";
      info_sin_pesoElement.style.display = "none";
    } else {
      over_30_infoElement.style.display = "none";
    }
  });
});
