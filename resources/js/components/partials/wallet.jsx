import { Button, Modal } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { getWithAxios } from "../api/axios";
import { UserContext } from "../contexts/userContext";
import { useNavigate } from "react-router-dom";

const Wallet = () => {
    
    const [wallet, setWallet] = useState(0.0);
    const [amount, setAmount] = useState();
    const [open, setOpen] = useState(0.0);

    const { user, setUser } = useContext(UserContext);

    const getWallet = async () => {
        const res = await getWithAxios("/api/wallet-list", {
            user_id: user?.id,
        });

        if (res.wallet_data) {
            setWallet(res.wallet_data);
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
                        <span>{wallet}</span>
                    </div>
                </div>
                <div>
                    <Button auto css={{ backgroundColor: "white" }} onPress={() => setOpen(true)}>
                        <span className="text-appGreen font-bold">
                            Add Money
                        </span>
                    </Button>
                </div>
            </div>
            <AddMoneyModal amount={amount} setAmount={setAmount} open={open} setOpen={setOpen} />
        </div>
    );
};

export default Wallet;

const AddMoneyModal = ({ amount, setAmount, open, setOpen }) => {
    const navigate = useNavigate()
    const {user, setUser} = useContext(UserContext)

    const handlePayement = () => {
        const url = "/" + user?.user_type + "/payment"
        navigate(url, {state : {
            paymentAmount : amount
        }})
    }
    return (
        <Modal open={open} closeButton onClose={() => setOpen(false)}>
            <Modal.Header>
                <div className="text-center font-bold">Add money</div>
            </Modal.Header>
            <Modal.Body>
                <div className="form-group">
                    <label htmlFor="Amount"></label>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex">
                    <Button onPress={handlePayement} color={"success"} >
                        Add
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
