
import PaymentSetup from "../paymentSetup"
import GatewayLayout from "./gatewayLayout"

const Paytm = () => {

    const fields = [
        {
            label: "MID",
            value: "mid",
        },
        {
            label: "Merchant Key",
            value: "merchant_key",
        },
    ]
    return(
        <PaymentSetup>
            <GatewayLayout title={"Paytm"} type={"paytm"} fields={fields} />
        </PaymentSetup>
    )
}

export default Paytm