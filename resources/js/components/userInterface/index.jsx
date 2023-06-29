
import FollowShipment from "./pagesPartials/index/followShipment"
import PopularRoutes from "./pagesPartials/index/popularRoutes"
import WorkWith from "./pagesPartials/index/workWith"
import HowToShip from "./pagesPartials/index/ourServices"
import Navbar from "./pagesPartials/index/navbar"
import Brand from "./pagesPartials/index/brand"
import ParcelTypes from "./pagesPartials/index/parcelTypes"
import DeliveryMan from "./pagesPartials/index/deliveryMan"
import PointFooter from "./pagesPartials/index/2pointFooter"
import Prohibited from "./pagesPartials/index/prohibited"

const Index = () => {
    return(
        <div className="overflow-x-hidden !w-screen">
            <Navbar/>
            <Brand/>
            <WorkWith/>
            <ParcelTypes />
            <HowToShip/>
            <DeliveryMan />
            <Prohibited/>
            <FollowShipment/>
            <PopularRoutes/>
            <PointFooter />
        </div>
    )
}

export default Index