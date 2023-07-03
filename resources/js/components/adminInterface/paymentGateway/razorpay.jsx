
import PaymentSetup from "../paymentSetup"
import GatewayLayout from "./gatewayLayout"

const Razorpay = () => {

    const fields = [
        {
            label: "Key Id",
            value: "key_id",
        },
        {
            label: "Publishable key",
            value: "publishable_key",
        },
    ]
    return(
        <PaymentSetup>
            <GatewayLayout title={"Razorpay"} type={"razorpay"} fields={fields} />
        </PaymentSetup>
    )
}

export default Razorpay