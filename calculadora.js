// Esperar a que se cargue el DOM
document.addEventListener("DOMContentLoaded", function () {
  // Obtener el elemento del campo de entrada por su nuevo ID
  var inputPeso = document.getElementById("pesoInput");

  // Agregar un evento input para escuchar los cambios en el campo de entrada
  inputPeso.addEventListener("input", function () {
    // Obtener el valor actual del campo de entrada
    let hd_diarioElement = document.getElementById("hd-diario");
    let hd_horaElement = document.getElementById("hd-hora");
    let hd_m2mElement = document.getElementById("hd-m/2");
    let under_30_infoElement = document.getElementById("under-30-info");
    let over_30_infoElement = document.getElementById("over-30-info");
    let info_sin_pesoElement = document.getElementById("info-sin-peso");
    let resultadosElement = document.getElementById("resultados");
    let valorPeso = inputPeso.value;
    let hd;
    let hd_mant;
    let hd_m2;
    let hd_200;
    let hd_mant_200;
    let hd_m2_2000;
    let sc;

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
      resultadosElement.style.visibility = "visible";
      under_30_infoElement.style.display = "block";
      info_sin_pesoElement.style.display = "none";
    } else {
      resultadosElement.style.visibility = "hidden";
      under_30_infoElement.style.display = "none";
      info_sin_pesoElement.style.display = "block";
    }
    if (valorPeso > 30) {
      console.log(valorPeso);
      sc = (valorPeso * 4 + 7) / (valorPeso + 90);
      console.log(sc);
      hd = sc * 1500;
      console.log(hd);

      hd_mant = Math.round(hd / 24);
      hd_m2 = hd_mant * 1.5;

      hd_200 = sc * 200;
      hd_mant_200 = Math.round(hd_200 / 24);
      hd_m2_2000 = hd_mant_200 * 1.5;

      hd_diarioElement.innerHTML = `<table class="table">
                                      <thead>
                                        <tr>
                                          <th scope="col">1500 cc/dia</th>
                                          <th scope="col">2000 cc/dia</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <tr>
                                          <td>${hd}</td>
                                          <td>${hd_200}</td>
                                        </tr>
                                      </tbody>
                                    </table>
    `;
      hd_horaElement.textContent = hd_mant + " cc/hr";
      hd_m2mElement.textContent = hd_m2 + " m+m/2";

      resultadosElement.style.visibility = "visible";
      over_30_infoElement.style.display = "block";
      info_sin_pesoElement.style.display = "none";
    }
  });
});
