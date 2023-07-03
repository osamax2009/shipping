
import PaymentSetup from "../paymentSetup"
import GatewayLayout from "./gatewayLayout"

const Paystack = () => {

    const fields = [
        {
            label: "Public Key",
            value: "public_key",
        },
    ]
    return(
        <PaymentSetup>
            <GatewayLayout title={"Paystack"} type={"paystack"} fields={fields} />
        </PaymentSetup>
    )
}

export default Paystack