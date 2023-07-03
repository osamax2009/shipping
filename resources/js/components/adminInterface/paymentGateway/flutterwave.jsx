
import PaymentSetup from "../paymentSetup"
import GatewayLayout from "./gatewayLayout"

const Flutterwave = () => {

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
            <GatewayLayout title={"Flutterwave"} type={"flutterwave"} fields={fields} />
        </PaymentSetup>
    )
}

export default Flutterwave