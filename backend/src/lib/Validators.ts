import * as z from 'zod'; // Libreria que valida objetos y tipos primitivos de datos

export class Validators{

    public static numberSchema  = z.number()

    public static ValidatePosConvertion(convertion: { from: string, to: string, amount: number}){

        const content = z.object({
            from: z.string(),
            to: z.string(),
            amount:z.number(),
            })

        return content.safeParse(convertion)
    }

}