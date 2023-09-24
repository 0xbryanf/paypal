import generateAccessToken from "@/utils/token";
import HttpException from "@/utils/exceptions/http.exception";
import "dotenv/config";

class StandardService {
    public async createOrder(cart: any): Promise<Response | Error> {
        try {
            console.log("shopping cart information passed from the frontend createOrder() callback:", cart);

            const accessToken = await generateAccessToken();
            const url = `${process.env.BASE}/v2/checkout/orders`;
            const payload = {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "USD",
                            value: "100.00",
                        }
                    }
                ]
            }

            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                },
                method: "POST",
                body: JSON.stringify(payload),
            });

            return response;
        } catch (error: any) {
            throw new HttpException(404, error.message);
        }
    }

    public async captureOrder(orderID: any): Promise<Response | Error> {
        try {
            const accessToken = await generateAccessToken();
            const url = `${process.env.BASE}/v2/checkout/orders/${orderID}/capture`;

            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
                }
            })

            return response;
        } catch (error: any) {
            throw new HttpException(404, error.message);
        }
    }
}

export default StandardService;