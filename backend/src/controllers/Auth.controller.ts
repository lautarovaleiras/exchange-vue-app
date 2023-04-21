import {Request, Response} from 'express';
import config from '../config/config';
import * as jwt from 'jsonwebtoken';

export class AuthController {
   
    /**
     * Metodo para inicio de sesion
     * @returns un mensaje 'ok' y el token (con los datos del user)
     */
    static async login(req: Request, res: Response): Promise<Response>{
        const {email} = req.body;
        
        if ( !(email) )
            return res.status(400).json({message: 'Email required!'});

        const token = jwt.sign({email},config.jwtSecret,{expiresIn:'1h'})

        return res.status(200).json({message: 'Ok', token});
    }
}

