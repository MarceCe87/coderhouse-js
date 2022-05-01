
function init(){

    let billetera = new BilleteraVirtual();
    billetera.StorageToList();
    billetera.ImprimirUltimosMovimientos();

    const btnAgregar = document.getElementById("btnAgregar");
    btnAgregar.onclick = () => {
        IngresarImporte("Agregar");
    }
    
    const btnEnviar = document.getElementById("btnEnviar");
    btnEnviar.onclick = () => {
      IngresarImporte("Enviar");
    }

    const btnPagar = document.getElementById("btnPagar");
    btnPagar.onclick = () => {
      IngresarImporte("TarjetaDeCredito");
    }

    const btnExchange = document.getElementById("exchange");
    btnExchange.onclick = () => {
      GetCotizacionDollar();
    }

    const btnCuenta = document.getElementById("cuenta");
    btnCuenta.onclick = () => {
      Swal.fire({
        title: 'Datos de la cuenta',
        html: `<p>Numero: 0005500480</p>\n <p>CVU: 17000005544452</p>\n <p>Alias: CODER.CURSO.JS</p>`,
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: 'swal-wide'
      })   
    }

    const btnQr = document.getElementById("qr");
    btnQr.onclick = () => {
      Swal.fire({
        text: 'Abone con Mercado Pago',
        imageUrl: 'https://api.qrserver.com/v1/create-qr-code/?data=www.mercadopago.com.ar',
        imageHeight: 110,
        customClass: 'swal-wide'
      })
    }

    async function GetCotizacionDollar(){
      const url = 'https://www.dolarsi.com/api/api.php?type=valoresprincipales';
      await fetch(url)
        .then((response) => response.json())
        .then((data) => {
         
          data.forEach((json) => {
            if(json.casa.nombre == "Dolar Oficial"){
              Swal.fire({
                title: 'Dolar Oficial',
                html: `<p>Compra: $${json.casa.compra}</p>\n <p>Venta: $${json.casa.venta}</p>`,
                icon: 'info',
                confirmButtonText: 'Aceptar',
                customClass: 'swal-wide'
              });
            }

          });         
        });
    }

    function IngresarImporte(tipo){
      const footer = tipo == "TarjetaDeCredito" ? '<p style="color: red;"> CFT: 10%</p>' : '';
      Swal.fire({
        inputLabel: 'Ingrese un importe',
        input: 'number',
        inputPlaceholder: 'Importe',
        customClass: 'swal-wide',
        footer: footer,
        showCancelButton: true,
        inputValidator: (value) => {
          if (!value ) {
            return 'Monto invalido!'
          }

          if(tipo != "Agregar" && value > billetera.montoActual){
            return 'Fondos insuficientes!'
          }
        }
      }).then(function(result) {
        if (result.value) {
          const importe = result.value
          billetera.RealizarMovimiento(tipo, parseFloat(importe))
        }
      });      
    }        
}