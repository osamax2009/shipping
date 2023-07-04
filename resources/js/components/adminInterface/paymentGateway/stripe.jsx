
import PaymentSetup from "../paymentSetup"
import GatewayLayout from "./gatewayLayout"

const Stripe = () => {

    const fields = [
        {
            label: "Secret Key",
            value: "secret_key",
        },
        {
            label: "Publishable key",
            value: "publishable_key",
        },
    ]
    return(
        <PaymentSetup>
            <GatewayLayout title={"Stripe"} type={"stripe"} fields={fields} />
        </PaymentSetup>
    )
}

export default Stripe