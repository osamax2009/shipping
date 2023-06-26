import { Button } from "@nextui-org/react";
import { useContext, useEffect, useState } from "react";
import { getWithAxios } from "../api/axios";
import { UserContext } from "../contexts/userContext";

const Wallet = () => {
    const [wallet, setWallet] = useState(0.00)
    const {user,setUser} = useContext(UserContext)

    const getWallet = async () => {
        const res = await getWithAxios('/api/wallet-list', {
            user_id : user?.id
        })

        if(res.wallet_data)
        {
            setWallet(res.wallet_data)
        }
    }
    
    const addMoney = () => {

    }


    useEffect(() => {
        getWallet()
    }, [])


    return (
        <div>
            <div className="flex">
                <div>
                    <div>
                        Available Balance
                    </div>
                    <div className="flex">
                        <span>
                            $
                        </span>
                        <span>
                            {wallet}
                        </span>
                    </div>
                </div>
                <div>
                    <Button css={{ backgroundColor: "white" }}>
                        <span className="text-appGreen">Add Money</span>
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Wallet
