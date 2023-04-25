
import {Request, Response} from 'express';
import { currencies } from '../mock/currencies';
import { ConvertionPostDTO } from '../models/ConvertionPostDTO';
import { Validators } from '../lib/Validators';
import { Utils } from '../lib/Utils';


export class ExchangeController {

    /**
     * 
     * @returns Return all currencies
     */
    static async getCurrencies(req: Request, res: Response): Promise<Response>{

        return res.status(200).json(currencies);
    }

    static async postConvertion(req: Request, res: Response): Promise<Response>{
        
        let body : ConvertionPostDTO = req.body;
        console.log(req.body)
        let validData = Validators.ValidatePosConvertion(body);


        // Si la data es invalida corto el flujo de ejecucion
        if (validData.success === false) {
            return res.status(400).json({ message: validData.error });
        }
        
        if(body.amount <= 0){
            return res.status(400).json({ message: "El monto debe ser mayor a 0" });
        }
        
        let currencyValue
        try{
            // Calculo cuanto vale la moneda que quiero comprar con la cuenta que quiero comprar
            currencyValue = await Utils.convertAmount(body.from,body.to)
        }catch(error){
            return res.status(500).json({ message: "Limit exceed" });
        }

        
        let amountConverted = currencyValue * body.amount;

        return res.status(200).json({amountConverted})
    }



    


}
