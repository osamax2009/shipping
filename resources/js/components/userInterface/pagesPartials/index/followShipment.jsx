import { Button } from "@nextui-org/react";

const FollowShipment = () => {
    return (
        <div className="flex flex-col py-4 items-center justify-center bg-gray-300">
            <div className="styles_trackingHeader__7olso">
                <span className="uppercase text-xl font-semibold text-appGreen text-center">
                    TRACK &amp; TRACE
                </span>
                <h2 className="styles_trackingTitle__4_ui3">
                    Follow your shipment
                </h2>
            </div>
            <div className="flex justify-center">
                <div>
                    <form className="flex justify-center ">
                        <input
                            className="form-control md:min-w-[340px]"
                            name="code"
                            type="text"
                            aria-labelledby="label"
                            placeholder="Input tracking or order number"
                        />

                        <div className="">
                            <button className="bg-appGreen focus:bg-appGreen/75 w-fit text-white font-bold px-12 py-2 h-full">
                                Track
                            </button>
                        </div>
                    </form>
                    <div className="styles_feedback___WMgT"></div>
                </div>
            </div>
        </div>
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
