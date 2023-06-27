import { useParams } from "react-router-dom";
import { getWithAxios } from "../api/axios"
import { Loading } from "@nextui-org/react";

const VerifyDocuments = () => {

    const params = useParams();
    const delivery_man_id = params.delivery_man_id;


    const getDeliveryPerson = async () => {

        const res = await getWithAxios("/api/delivery-man-document-list", {
            delivery_man_id : delivery_man_id
        })
    }


    return ( 
        <div className="h-full w-full flex items-center justify-center">
            <Loading type="points" />
        </div>
    )
}

export default VerifyDocuments