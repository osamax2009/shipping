
import PaymentSetup from "../paymentSetup"
import GatewayLayout from "./gatewayLayout"

const Paytabs = () => {

    const fields = [
        {
            label: "Profil Id",
            value: "profil_id",
        },
        {
            label: "Server key",
            value: "server_key",
        },

        {
            label: "Client key",
            value: "client_key",
        },
    ]
    return(
        <PaymentSetup>
            <GatewayLayout title={"Paytabs"} type={"Paytabs"} fields={fields} />
        </PaymentSetup>
    )
}

export default Paytabs