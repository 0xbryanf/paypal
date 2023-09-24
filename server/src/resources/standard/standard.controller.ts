import { Router, Request, Response, NextFunction } from 'express';
import Controller from '@/utils/interfaces/controller.interface';
import HttpException from '@/utils/exceptions/http.exception';
import validationMiddleware from '@/middleware/validation.middleware';
import StandardService from '@/resources/standard/standard.service';
import path from 'path';

class StandardController implements Controller {
    public path = '/api';
    public router = Router();
    private StandardService = new StandardService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.get(
            `${this.path}/`,
            this.getPath,
        )

        this.router.post(
            `${this.path}/orders`,
            this.crateOrders
        )

        this.router.post(
            `${this.path}/orders/:orderID/capture`,
            this.orderCapture,
        )
    }

    private getPath = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        res.sendFile(path.resolve('./client/checkout.html'));
    }

    private crateOrders = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { cart } = req.body;
            const order = await this.StandardService.createOrder(cart);
            res.status(200).json(order);
        } catch (error: any) {
            console.error(error.message);
            next(new HttpException(404, 'Cannot create order.'))
        }
    }

    private orderCapture = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        try {
            const { orderID } = req.params;
            const order = await this.StandardService.captureOrder(orderID);
            res.status(200).json(order);
        } catch (error: any) {
            console.error(error.message);
            next(new HttpException(404, 'Cannot capture order.'))
        }
    }

}

export default StandardController;