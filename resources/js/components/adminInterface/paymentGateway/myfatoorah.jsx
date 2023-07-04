import PaymentSetup from "../paymentSetup";
import GatewayLayout from "./gatewayLayout";

const Myfatoorah = () => {
    const fields = [
        {
            label: "Token",
            value: "token",
        },
    ];
    return (
        <PaymentSetup>
            <GatewayLayout
                title={"Myfatoorah"}
                type={"myfatoorah"}
                fields={fields}
            />
        </PaymentSetup>
    );
};

export default Myfatoorah;
