
import PaymentSetup from "../paymentSetup"
import GatewayLayout from "./gatewayLayout"

const Mercadopago = () => {

    const fields = [
        {
            label: "Public Key",
            value: "public_key",
        },
        {
            label: "Access Token",
            value: "access_token",
        },
    ]
    return(
        <PaymentSetup>
            <GatewayLayout title={"Mercadopago"} type={"mercadopago"} fields={fields} />
        </PaymentSetup>
    )
}

export default Mercadopago