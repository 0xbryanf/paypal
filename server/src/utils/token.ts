import IToken from "@/utils/interfaces/token.interface";
import HttpException from "./exceptions/http.exception";
import "dotenv/config";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, BASE } = process.env;

const generateAccessToken = async (): Promise<IToken> => {
    try {
        if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
            throw new Error("Missing API Credentials.");
        }

        const auth = Buffer.from(
            PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET,
        ).toString("base64");

        const response = await fetch(`${BASE}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                Authorization: `Basic ${auth}`,
            },
        });

        const data = await response.json();
        return data.access_token;
    } catch (error: any) {
        throw new HttpException(404, error.message);
    }
}

export default generateAccessToken;