const Prohibited = () => {
    return (
        <div className="flex flex-col px-12 justify-center  py-8 bg-white">
           <div className="w-fit shadow-lg">
           <div
                className=" grid  text-white justify-center prohibited bg-center bg-cover"
                style={{
                    backgroundImage:
                        "url('../images/restricted-and-prohibited-goods.jpg')",
                }}
            >
                <div className="bg-black/75 pt-2 pb-6 px-8 ">
                    <div className="font-bold py-4 text-xl">
                        Prohibited and restricted items in international
                        shipping
                    </div>
                    <div className="text-lg">
                        Most logistics companies have a list of items considered
                        restricted or prohibited to ship. While restricted
                        products can still be shipped under certain conditions,
                        prohibited items will simply be refused for shipping by
                        courier companies. At the same time, different
                        restrictions may apply to individuals and companies when
                        shipping internationally. Get advice from our experts
                        and be informed of the current international
                        restrictions when shipping goods domestically and
                        abroad.
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center text-center py-4 px-12 bg-gray-100/75">
                <div className="font-bold text-xl py-6">
                    Are you wondering which items are allowed and which are
                    restricted?
                </div>
                <div className="flex flex-wrap justify-center  gap-24">
                    {[
                        "Alcohol",
                        "Tobacco",
                        "Liquids",
                        "Batteries",
                        "Perishables",
                        "Fragile items",
                        "Toxics",
                        "Arms",
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="text-appGreen font-bold text-lg text-center"
                        >
                            {item}{" "}
                        </div>
                    ))}
                </div>
            </div>
           </div>
        </div>
    );
};

export default Prohibited;
