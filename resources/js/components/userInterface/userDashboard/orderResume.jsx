import { useLocation, useNavigate } from "react-router-dom";
import DashboardLayout from "../../dashboardComponents/dashbboardLayout";
import { Button, Dropdown } from "@nextui-org/react";
import { BsCash } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";
import { getWithAxios, postWithAxios } from "../../api/axios";
import { haversine_distance } from "../../shared/distanceCalculator";
import { UserContext } from "../../contexts/userContext";
import { todaysDate, tomorrowsDate } from "../../shared/date";
import { toast } from "react-toastify";

const OrderResume = () => {
    const location = useLocation();
    const { state } = location;

    const [receivePaymentFrom, setReceivePaymentFrom] = useState("pickup Location");
    const [pickLocationDetails, setPickLocationDetails] = useState()
    const [deliveryLocationDetails, setDeliveryLocationDetails] = useState()
    const deliveryCharges = 3.80
    const [distance, setDistance] = useState()
    const {user, setUser} = useContext(UserContext)

    const navigate = useNavigate();

    const getPlaceDetails = async (placeId,placeDetailSetter) => {
        const dataToSend = {
            placeid : placeId
        }
        const res = await getWithAxios("/api/place-detail-api",dataToSend)
      
        if(res.status == 'OK')
        {
            placeDetailSetter(res.result)      
        }
    }

    const assignDistance = () => {
       const res = haversine_distance(pickLocationDetails, deliveryLocationDetails)
       setDistance(res)
    }

    const calculateDistanceCharge = (distance) => {
        const brut = distance*0.9 
        const result = Math.round(brut * 100) / 100
       return result
    }

    const claculateTotalCharge = () => {
        const brut = calculateDistanceCharge(distance) + deliveryCharges
        const result = Math.round(brut * 100) / 100
       return result
    }

    const pickupDPoint = () => {
        if(state.schedule.pickDate)
        {
            return {
                start_time : state.schedule.pickDate + " " + state.schedule.pickFrom,
                end_time : state.schedule.pickDate + " " + state.schedule.pickTo,
                "address": state?.pickLocation,
                "latitude": pickLocationDetails.geometry.location.lat,
                "longitude": pickLocationDetails.geometry.location.lng,
                "description": state?.pickDescription,
                "contact_number": state?.pickNumber
            }
        }
        else {
            return {
                date : todaysDate(),
                "address": state?.pickLocation,
                "latitude": pickLocationDetails.geometry.location.lat,
                "longitude": pickLocationDetails.geometry.location.lng,
                "description": state?.pickDescription,
                "contact_number": state?.pickNumber
            }
        }
    }

    const deliveryPoint = () => {
        if(state.schedule.deliverDate)
        {
            return {
                start_time : state.schedule.deliveryDate + " " + state.schedule.deliveryFrom,
                end_time : state.schedule.deliveryDate + " " + state.schedule.deliveryTo,
                "address": state?.deliveryLocation,
                "latitude": deliveryLocationDetails.geometry.location.lat,
                "longitude": deliveryLocationDetails.geometry.location.lng,
                "description": state?.deliveryDescription,
                "contact_number": state?.deliveryNumber
            }
        }else {
            return {
                date : tomorrowsDate(),
                "address": state?.deliveryLocation,
                "latitude": deliveryLocationDetails.geometry.location.lat,
                "longitude": deliveryLocationDetails.geometry.location.lng,
                "description": state?.deliveryDescription,
                "contact_number": state?.deliveryNumber
            }
        }
    }

    let currentDate = new Date().toJSON().slice(0, 10);

    const handleStoreOrder = async () => {
        
        const dataToSend = {
            "client_id" : user?.id,
            "date" : currentDate,
            "country_id" : user.country_id,
            "city_id" : user.city_id,
            "pickup_point" : pickupDPoint(),
            "delivery_point" : deliveryPoint(),
            "extra_charges" : [],
            "parcel_type" : state?.parcelType,
            "total_weight" : state?.weight,
         //   "total_distance" : distance,
            "payment_collect_from" : receivePaymentFrom,
            "status" : "draft",
            "payment_type" : "",
            "payment_status" : "",
           // "fixed_charges" : "100",
           // "parent_order_id" : "",
            "save_user_address" : 1
        }

        const res = await postWithAxios("/api/order-save", dataToSend)

        console.log(res)

        if(res.order_id)
        {
            toast(res.message, {
                type : "success",
                hideProgressBar : true
            })

            navigate('/')
        }
    }

    useEffect(() => {
        getPlaceDetails(state?.pickId,setPickLocationDetails)
    },[])

    useEffect(() => {
        getPlaceDetails(state?.deliveryId,setDeliveryLocationDetails)
    },[])

    useEffect(() => {
        assignDistance()
    },[deliveryLocationDetails,pickLocationDetails])


    return (
        <DashboardLayout>
            <div className="px-8">
                <div className="card">
                    <div className="card-header bg-primary text-white">
                        Your order resume {state.pickId}
                    </div>
                    <div className="card-body">
                        <div className="grid gap-6  md:grid-cols-2">
                            <div>
                                <div className="font-bold">
                                    Package informations
                                </div>
                                <div className="p-4 bg-gray-100/25 h-full">
                                    <div className="flex gap-6">
                                        <span>Parcel Type :</span>

                                        <span>{state.parcelType}</span>
                                    </div>

                                    <div className="flex gap-6">
                                        <span>Weight :</span>

                                        <span>{state.weight} kg</span>
                                    </div>

                                    <div className="flex gap-6">
                                        <span>Number of Parcels :</span>

                                        <span>{state.numberOfParcel}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid gap-6">
                                <div className="mb-4">
                                    <div className="font-bold">
                                        Pick Location
                                    </div>
                                    <div className="p-4 bg-gray-100/25 h-full">
                                        <span>
                                            Address : {state.pickLocation}
                                        </span>
                                        <br />
                                        <span>
                                            Contact : {state.pickNumber}
                                        </span>
                                        <br />
                                        <span>
                                            Description :{" "}
                                            {state.pickDescription}
                                        </span>
                                    </div>
                                </div>

                                <div>
                                    <div className="font-bold">
                                        Delivery location
                                    </div>
                                    <div className="p-4 bg-gray-100/25 h-full">
                                        <span>
                                            Address : {state.deliveryLocation}
                                        </span>
                                        <br />
                                        <span>
                                            Contact : {state.deliveryNumber}
                                        </span>
                                        <br />
                                        <span>
                                            Description :{" "}
                                            {state.deliveryDescription}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-100/25 mt-8 w-full p-6">
                            <div>
                                <div className="flex justify-between gap-6">
                                    <span>Delivery charges :</span>

                                    <span>{deliveryCharges} $</span>
                                </div>

                                <div className="flex justify-between gap-6">
                                    <span>Distance charge ({distance} x 0.9) :</span>

                                    <span>{calculateDistanceCharge(distance) ? calculateDistanceCharge(distance) +"$" : "calculating..."}</span>
                                </div>
                            </div>

                            <div className="flex  justify-between text-black font-bold gap-6">
                                <span>Total :</span>

                                <span>{claculateTotalCharge() ? claculateTotalCharge() + "$" : "calculating..."}</span>
                            </div>
                        </div>

                        <div className="bg-gray-100/25 mt-8 w-full p-6">
                            <div className="flex  justify-between text-black font-bold gap-6">
                                <span>Payment :</span>

                                <span className="flex gap-2">
                                    <BsCash /> (cash)
                                </span>
                            </div>

                            <div className="mt-6">
                                <div className="text-black font-bold">Collect payment from</div>
                                <Dropdown>
                                    <Dropdown.Button
                                        flat
                                        className="w-full"
                                        color="success"
                                        css={{ tt: "capitalize" }}
                                    >
                                        {receivePaymentFrom}
                                    </Dropdown.Button>
                                    <Dropdown.Menu
                                        disallowEmptySelection
                                        defaultChecked
                                        selectionMode="single"
                                        selectedKeys={receivePaymentFrom}
                                        onSelectionChange={
                                            setReceivePaymentFrom
                                        }
                                    >
                                        <Dropdown.Item  key={"pickup Location"} >
                                        pickup Location
                                        </Dropdown.Item>

                                        <Dropdown.Item key={"delivery Location"} >
                                        Delivery Location
                                        </Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-6 flex gap-8 justify-end">
                    <Button
                        onPress={() =>
                            navigate("/account/dashboard/place-new-order", {
                                state: state,
                            })
                        }
                        css={{ background: "Gray" }}
                        className="text-black"
                    >
                        back
                    </Button>
                    <Button onPress={handleStoreOrder} color={"success"}>create order</Button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default OrderResume;
