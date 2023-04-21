
import { isEmpty } from 'lodash';
import * as ax from 'axios';
const axios = ax.default;

export class Utils {
    static cache: any;

    /**
     * 
     * @param from Divisa origen
     * @param to Divisa destino
     * @returns costo de la divisa a comprar en base a la moneda con la que se quiere comprar
     */
    static async convertAmount(from: string = 'ARS', to: string){
        let rates: any;

        // Para no excecer el limite de request, hace solo el primer req y el resultado lo guarda en memoria.
        if(isEmpty(this.cache)){
            console.log('pegada a fixer')
            this.cache = await this.getRatesFromFixer();
        }
        // posible caso de uso, si la app esta deployada, hacer el request 1 vez por dia.
        if(this.cache.date < new Date())
            console.log('fecha vencida')
            this.cache = await this.getRatesFromFixer();
        
        let fixer_data = this.cache;

        rates = fixer_data.rates;
            

        return rates[to] / rates[from];
    }
    /**
     * Cuenta free retorna por defualt la moneda en base a Euros
     *  Tiene un limite de 500 request por mes.
     */
    static async getRatesFromFixer(): Promise<any>{
       
        return new Promise((resolve, reject) => {
            // Cuentra Free (500 request x mes)
            let access_key = 'bb9fd8773b95d9922c032d06e85a781e'
            axios
                .get(
                    `http://data.fixer.io/api/latest?access_key=${access_key}`)
                    .then(function (res) {
                        if (res.status == 200) 
                            resolve(res.data);
                        else
                            throw new Error('Error getting tokens');
                    })
                    .catch(function (res) {
                        console.log(res);
                        reject(res);
                });
        });
    
    }
}