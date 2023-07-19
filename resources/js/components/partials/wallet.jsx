import { Button, Loading, Modal } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../api/axios";
import { UserContext } from "../contexts/userContext";
import { useLocation, useNavigate } from "react-router-dom";
import { Dropdown } from "@nextui-org/react";
import { AppSettingsContext } from "../contexts/appSettings";
/* import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import StripePayment from "./stripePayment";
import PaypalPayment from "./paypalPayment"; */
import { toast } from "react-toastify";

/* const getStripeKey = async () => {
    let key = null;
    const res = await getWithAxios("/api/paymentgateway-list");
    const stripe = res.data.filter((e) => e.type == "stripe");
    key = stripe[0]?.test_value?.publishable_key;
    return key;
};

const publishable_key = await getStripeKey();

const stripePromise = loadStripe(publishable_key); */

const Wallet = () => {
    const [wallet, setWallet] = useState(0.0);
    const [amount, setAmount] = useState();
    const [open, setOpen] = useState(0.0);
    const [openStripe, setOpenStripe] = useState(false);
    const [stripeIntent, setStripeIntent] = useState({});
    const [stripeOptions, setStripeOptions] = useState({});

    const { state } = useLocation();
    const { user, setUser } = useContext(UserContext);

    const getWallet = async () => {
        const res = await getWithAxios("/api/wallet-detail", {
            user_id: user?.id,
        });

        if (res.wallet_data) {
            setWallet(res);
        }
    };

    const addMoney = () => {};

    useEffect(() => {
        getWallet();
    }, []);

    return (
        <div>
            <div className="flex flex-wrap justify-between items-center bg-appGreen rounded-lg py-4 px-6 text-white font-bold gap-8">
                <div>
                    <div>Available Balance</div>
                    <div className="flex">
                        <span>$</span>
                        <span>{wallet?.total_amount}</span>
                    </div>
                </div>
                <div>
                    <Button
                        auto
                        css={{ backgroundColor: "white" }}
                        onPress={() => setOpen(true)}
                    >
                        <span className="text-appGreen font-bold">
                            Add Money
                        </span>
                    </Button>
                </div>
            </div>

            <AddMoneyModal
                amount={amount}
                setAmount={setAmount}
                open={open}
                setOpen={setOpen}
                setOpenStripe={setOpenStripe}
            />

            

            {/*  <PaypalPayment /> */}
        </div>
    );
};

export default Wallet;

const AddMoneyModal = ({ amount, setAmount, open, setOpen, setOpenStripe }) => {
    const [paymentMethods, setPaymentMethods] = useState();
    const [selectedGateway, setSelectedGateway] = useState("Visa/Mastercard");
    const [processing, setProcessing] = useState(false);

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const { appSettings, setAppSettings } = useContext(AppSettingsContext);

    const getPaymentsMethods = async () => {
        const res = await getWithAxios("/api/paymentgateway-list");
        setPaymentMethods(res.data);
    };

    const handlePayement = async () => {
        if (!amount) {
            toast("Enter the amount", {
                type: "error",
                hideProgressBar: true,
            });
        } else {
            setProcessing(true);
            if (selectedGateway == "Visa/Mastercard") {
                const dataToSend = {
                    amount: amount,
                    currency: appSettings?.currency_code.toLowerCase(),
                };

                const res = await postWithAxios(
                    "/api/stripe/intent",
                    dataToSend
                );

                if (res.intent) {
                    const intent = res.intent;
                   
                  
                    const url = "/" + user?.user_type + "/wallet/stripePayment";
                    navigate(url, {
                        state: {
                            intent: intent,
                            
                        },
                    });
                }
                setProcessing(false);
                setOpen(false);

                //  console.log(res)
            }
        }

        /*    */
    };

    useEffect(() => {
        getPaymentsMethods();
    }, []);

    return (
        <Modal open={open} closeButton onClose={() => setOpen(false)}>
            <Modal.Header>
                <div className="text-center font-bold text-lg">Add money</div>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="Amount" className="font-bold">
                        Amount
                    </label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <div className="grid items-center grid-cols-2">
                    <div className="font-bold">Select gateway :</div>
                    <Dropdown>
                        <Dropdown.Button
                            flat
                            color="success"
                            size={"lg"}
                            css={{ tt: "capitalize" }}
                        >
                            {selectedGateway}
                        </Dropdown.Button>

                        <Dropdown.Menu
                            aria-label="Multiple selection actions"
                            color="sucess"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selectedGateway}
                            onSelectionChange={setSelectedGateway}
                        >
                            {paymentMethods?.map((method, index) => (
                                <Dropdown.Item key={method?.title}>
                                    <div className="flex">
                                        <span> {method?.title} </span>
                                    </div>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex">
                    <Button auto onPress={handlePayement} color={"success"}>
                        {processing ? (
                            <Loading type="spinner" color={"white"} />
                        ) : (
                            "submit"
                        )}
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
