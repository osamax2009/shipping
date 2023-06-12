const FollowShipment = () => {
    return (
        <div className="styles_trackingWrapper__0i5vd">
            <div className="styles_trackingHeader__7olso">
                <span className="styles_sizeMedium__LSn_Z styles_sub__pDiu9 styles_dark__4aXoy">
                    TRACK &amp; TRACE
                </span>
                <h2 className="styles_trackingTitle__4_ui3">
                    Follow your shipment
                </h2>
            </div>
            <div className="styles_loaded___m4M3 styles_tracking___vYS6">
                <div>
                    <form className="styles_trackingForm__388s9">
                        <div className="styles_inputGroup__8A7ar">
                            <input
                                className="styles_trackingInput__opc1y"
                                name="code"
                                type="text"
                                aria-labelledby="label"
                            />
                            <span className="styles_placeholder__ZgFYE" id="label">
                                Input tracking or order number
                            </span>
                        </div>
                        <button
                            data-testid="button"
                            className="styles_button__eH6h8 styles_secondary__oA8gJ styles_disabled___u82U"
                            color="secondary"
                            disabled=""
                            type="submit"
                        >
                            Track
                        </button>
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
