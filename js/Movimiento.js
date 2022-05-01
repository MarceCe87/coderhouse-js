class Movimiento 
{
    constructor(importe, tipo, id)
    {
        this.id = id;
        this.importe = importe;
        this.tipo = tipo;            
    }

    Procesar(){
        switch (this.tipo) {
            case 'Enviar':
                this.importe = this.importe * -1;
                break;
            case 'TarjetaDeCredito':
                this.importe = (this.importe + (this.importe *0.10)) * -1;
                break;
            default:              
          }                  
    }
}