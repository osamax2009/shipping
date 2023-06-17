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

/* import './css/72429db1360ffe22.css'
import './css/825e4518863dd04c.css'
import './css/0254f7c1f346d767.css'
import './css/9be2033fd17fdf2f.css'
import './css/fe699058e63f5db4.css'
import './css/f32964b10281b9b2.css'

import './css/d325.style-ef83e7318dd10ce571bf.css'
import './css/d41d8.style-01f1f8559dddac3d7ede.css'
import './css/9cf2.style-4501a7264ba2cff67161.css' */


import Brand from "./pagesPartials/index/brand"
import AskQuestion from "../partials/askQuestion"
import ParcelTypes from "./pagesPartials/index/parcelTypes"
import DeliveryMan from "./pagesPartials/index/deliveryMan"
import PointFooter from "./pagesPartials/index/2pointFooter"

const Index = () => {
    return(
        <div>
            <Navbar/>
            <Brand/>
            <ParcelTypes />
            {/* <HowToShip/> */}
            <FollowShipment/>
            <LogisticSolutions />
            <DeliveryMan />
           {/*  <WorkWith/> */}
            <About/>
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