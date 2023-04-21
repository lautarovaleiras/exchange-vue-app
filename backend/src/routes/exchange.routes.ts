import {Router} from 'express';
import { checkJWT } from '../middleware/jwt';
import { ExchangeController } from '../controllers/Exchange.controller';

const router = Router();

router.get('/exchange/currencies',ExchangeController.getCurrencies);
router.post('/exchange/convert',ExchangeController.postConvertion);

export default router;