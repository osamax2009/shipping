import About from "./pagesPartials/index/about"
import FollowShipment from "./pagesPartials/index/followShipment"
import Footer from "./pagesPartials/index/footer"
import ForEveryNeed from "./pagesPartials/index/forEveryNeed"
import LogisticSolutions from "./pagesPartials/index/logisticSolutions"
import PopularRoutes from "./pagesPartials/index/popularRoutes"
import PopularShipment from "./pagesPartials/index/popularShipments"
import ResumeSection from "./pagesPartials/index/resumeSection"
import WorkWith from "./pagesPartials/index/workWith"
import HowToShip from "./pagesPartials/index/howToShip"
import Navbar from "./pagesPartials/index/navbar"



import Brand from "./pagesPartials/index/brand"
import AskQuestion from "../partials/askQuestion"
import ParcelTypes from "./pagesPartials/index/parcelTypes"
import DeliveryMan from "./pagesPartials/index/deliveryMan"
import PointFooter from "./pagesPartials/index/2pointFooter"
import Prohibited from "./pagesPartials/index/prohibited"

const Index = () => {
    return(
        <div>
            <Navbar/>
            <Brand/>
            <WorkWith/>
            <ParcelTypes />
            <HowToShip/>
            <DeliveryMan />
            <Prohibited/>
            <FollowShipment/>
            {/* <LogisticSolutions /> */}            
            {/* <About/> */}
            <PopularRoutes/>
            {/* <PopularShipment/>
            <ForEveryNeed />
            <ResumeSection /> */}
            {/* <Footer /> */}
            {/* <AskQuestion /> */}
            <PointFooter />
        </div>
    )
}

export default Index