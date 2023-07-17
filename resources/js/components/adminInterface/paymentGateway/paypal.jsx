
import PaymentSetup from "../paymentSetup"
import GatewayLayout from "./gatewayLayout"

const Paypal = () => {

    const fields = [
        {
            label: "Client id",
            value: "client_id",
        },

        {
            label: "Secret Id",
            value: "secret_id",
        },
    ]
    return(
        <PaymentSetup>
            <GatewayLayout title={"Paypal"} type={"paypal"} fields={fields} />
        </PaymentSetup>
    )
}

export default Paypal