import { Button } from "@nextui-org/react";
import { appName } from "../../../shared/constancy";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { getUserFromAPI } from "../../../api/axios";

const FollowShipment = () => {
    const [orderId, setOrderId] = useState();
    const navigate = useNavigate();

    const goOnorderPage = async (e) => {
        e.preventDefault();
        const res = await getUserFromAPI()

        if(res.email)
        {
            if (orderId) {
                const url = "/admin/orderdetail/order_Id/" + orderId;
                navigate(url);
            }
    
            if (!orderId) {
                toast("Type an Order Id", {
                    type: "error",
                    hideProgressBar: true,
                });
            }
        }

        if(res == false)
        {
            navigate("/account/sign-in", {
                state : {
                    orderToGet : orderId
                }
            })
        }
       
       
    };

    return (
        <form onSubmit={goOnorderPage}>
            <div className="flex justify-center py-4 px-4 md:px-12 bg-white">
                <div className="flex flex-col w-fit py-4 px-12 md:px-24 shadow-sm items-center justify-center bg-gray-100/75">
                    <div className="styles_trackingHeader__7olso">
                        <span className="uppercase text-lg font-semibold text-appGreen text-center">
                            TRACK &amp; TRACE
                        </span>
                        <h2 className="text-md md:text-lg pt-2 uppercase font-bold">
                            Follow your {appName} parcel
                        </h2>
                    </div>
                    <div className="relative w-full">
                        <div className="flex items-center relative  w-full ">
                            <div className="absolute right-3 flex items-center  cursor-pointer">
                                <button className=" text-sm md:text-md bg-appGreen  hover:bg-appGreen/75 focus:bg-appGreen/75 w-fit h-fit text-white font-bold py-2 px-2 md:px-4 rounded">
                                    Track
                                </button>
                            </div>
                            <input
                              
                                className="text-gray-600  focus:outline-none focus:border focus:border-slate-700  bg-white font-normal w-full h-16 flex items-center pl-4 md:pl-12 text-sm border-gray-300 rounded shadow"
                                placeholder="order number here"
                                required
                                value={orderId}
                                onChange={(e) => setOrderId(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default FollowShipment;

{
    /* <div classNameName="bg-[#f8fbff]">
 <div>
 TRACK & TRACE
 </div>
 <div>
 Follow your shipment
 </div>
 <div>
     <form action="">
         <div>
             <label htmlFor=""></label>
             <input type="text" placeholder="input tracking or order number" />
         </div>
     </form>
 </div>
</div> */
}
