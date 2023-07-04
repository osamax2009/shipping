
import PaymentSetup from "../paymentSetup"
import GatewayLayout from "./gatewayLayout"

const Paypal = () => {

    const fields = [
        {
            label: "Tokenization key",
            value: "tokenization_key",
        },
    ]
    return(
        <PaymentSetup>
            <GatewayLayout title={"Paypal"} type={"paypal"} fields={fields} />
        </PaymentSetup>
    )
}

export default Paypal