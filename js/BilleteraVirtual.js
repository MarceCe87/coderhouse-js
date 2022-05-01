class BilleteraVirtual 
{
    constructor()
    {
        this.montoActual = parseFloat(localStorage.getItem('montoActual')) || 0;
        this.movimientos = [];         
    }

    RealizarMovimiento(tipoMovimiento, importe){
        
        if(tipoMovimiento != "Agregar" &&  importe > this.montoActual){            
            errorMsg.innerHTML = "<p>Saldo insuficiente.</p>";
            return;
        }

        if(tipoMovimiento == "Pagar" &&  (importe + (this.importe *0.10)) > this.montoActual){            
            errorMsg.innerHTML = "<p>Saldo insuficiente.</p>";
            return;
        }

        if(isNaN(importe) || importe == 0){            
            errorMsg.innerHTML = "<p>El valor ingresado es invalido.</p>";
            return;
        }

        let movimiento = new Movimiento(importe, tipoMovimiento, this.movimientos.length + 1);
        movimiento.Procesar();
        localStorage.setItem(movimiento.id, JSON.stringify(movimiento));
        this.movimientos.push(movimiento);

        this.montoActual = parseFloat(this.montoActual + movimiento.importe);
        localStorage.setItem('montoActual', this.montoActual); 
        this.ImprimirUltimosMovimientos();
    }

    ImprimirUltimosMovimientos(){        
        document.getElementById("history").innerHTML = "";
        
        let disponible = document.getElementById("lblDisponible");
        disponible.innerHTML =  this.montoActual;

        if(this.movimientos.length > 0){
            this.movimientos.sort((a,b) => b.id - a.id);
            
            this.movimientos.forEach((movimiento)=>{
                const nodoMovimientos = document.createElement("p");

                nodoMovimientos.innerHTML= `<p class="txn-list">${movimiento.tipo} <span class="${movimiento.importe > 0 ? "credit-amount" : "debit-amount"}"> ${movimiento.importe}</span>`;
                document.getElementById("history").appendChild(nodoMovimientos);
            })                 
        }else{
            console.log(`NO EXISTEN MOVIMIENTOS`);
        }
    }

    StorageToList(){
        for(let i = 0; i < localStorage.length; i++){
            let key = localStorage.key(i);
            if(!isNaN(key)){
                // cargo todos los movimientos del storage a una lista menos el de "montoActual"
                let movimiento = JSON.parse(localStorage.getItem(key));
                this.movimientos.push(movimiento);
            }
        }        
    }
}