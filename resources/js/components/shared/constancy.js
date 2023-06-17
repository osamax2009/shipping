import { BsBox, BsBox2Heart, BsEnvelope, BsFileText, BsFolder } from "react-icons/bs"

export const appName = '2pointDelivery'

export const parcelTypes = [
    {
        label : "Court Document",
        icon :  <BsFolder />
    },

    {
        label : "Envelopes",
        icon : <BsEnvelope/>
    },

    {
        label : "Letters",
        icon : <BsFileText />
    },

    {
        label : "Pharmaceutical Package",
        icon : <BsBox2Heart />
    },

    {
        label : "Small Package Box",
        icon : <BsBox />
    }
]

export const deliveryDetails = [
    {
        title : "Work on your schedule",
        description : "delivery for few hours in the mornings; every nightn or just on weekends... it's up to you. You are your own boss and you can choose when and how much you work."
    },

    {
        title : "Choose your wheels",
        description : "depending on the rules in your city, you may be able to deliver with your car, bike..."
    },

    {
        title : "Earn good money",
        description : "You will make by bringing people the things they love. Between deliveries, it's just you"
    }
]

