import {Router} from 'express';
import { checkJWT } from '../middleware/jwt';
import { ExchangeController } from '../controllers/Exchange.controller';

const router = Router();

router.get('/exchange/currencies',[checkJWT], ExchangeController.getCurrencies);
router.post('/exchange/convert',[checkJWT], ExchangeController.postConvertion);

export default router;