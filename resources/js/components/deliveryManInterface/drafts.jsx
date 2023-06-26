import { useEffect } from "react"
import { getWithAxios } from "../api/axios"
import { Table } from "@nextui-org/react"
import { useState } from "react"
import { useContext } from "react"
import { UserContext } from "../contexts/userContext"

const Drafts = () => {
    const [orders, setOrders] = useState([])
    const {user, setUser} = useContext(UserContext)

    const getOrders = async () => {
        const dataToSend = {
            client_id : user?.id
        }
        const res = await getWithAxios("/api/order-list",dataToSend)
        console.log(res)
        setOrders(res.data)
    }

    useEffect(() => {
        getOrders()
    },[user])
    
    return(
        <div>
            <Table>
                <Table.Header>
                    <Table.Column>Order id</Table.Column>
                </Table.Header>
                <Table.Body>
                   {
                    orders?.map((order, index) =>  <Table.Row key={index}>
                    <Table.Cell> {order.id} </Table.Cell>
                </Table.Row>)
                   }
                </Table.Body>
            </Table>
        </div>
    )
}

export default Drafts