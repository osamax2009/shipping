import {
    BsBox,
    BsBox2,
    BsBox2Heart,
    BsEnvelope,
    BsFileText,
    BsFlower1,
    BsFolder,
    BsTruck,
} from "react-icons/bs";
import { FaShippingFast } from "react-icons/fa";

import { LuBus } from "react-icons/lu";

export const appName = "2point Delivery";

export const parcelTypes = [
    {
        label: "Court Document",
        value : "court_document",
        icon: <BsFolder />,
    },

    {
        label: "Envelopes",
        value : "envelopes",
        icon: <BsEnvelope />,
    },

    {
        label: "Farm Packages",
        value : "farm_packages",
        icon: <BsBox />,
    },

    {
        label: "Flowers",
        value : "flowers",
        icon: <BsFlower1 />,
    },

    {
        label: "Letters",
        value : "letters",
        icon: <BsFileText />,
    },

    {
        label: "Pharmaceutical",
        value : "pharmaceutical",
        icon: <BsBox2Heart />,
    },

    {
        label: "Small Package Box",
        value : "small_package_box",
        icon: <BsBox />,
    },
];

export const deliveryDetails = [
    {
        title: "Work on your schedule",
        description:
            "delivery for few hours in the mornings; every nightn or just on weekends... it's up to you. You are your own boss and you can choose when and how much you work.",
    },

    {
        title: "Choose your wheels",
        description:
            "depending on the rules in your city, you may be able to deliver with your car, bike...",
    },

    {
        title: "Earn good money",
        description:
            "You will make by bringing people the things they love. Between deliveries, it's just you",
    },
];

export const deliveryServices = [
    {
        title: "Express Package",
        description: "Urgent deliveries in 24 - 72  hours worldwide",
        icon: <FaShippingFast />,
    },

    {
        title: "Standard Package",
        description: "Simple and affordable solution for sending regular box",
        icon: <BsBox2 />,
    },

    {
        title: "Freight Transport",
        description: "Efficient solution for transporting large quantities",
        icon: <BsTruck />,
    },

    {
        title: "Van Delivery",
        description: "A dedicated van for transport within Europe",
        icon: <LuBus />,
    },
];

export const howItWorks = [{
    title : "Select the cities",
    description : "of pick-up and delivery on the booking tool"
},

{
    title : "Insert the address",
    description : "where you want to the parcel to be collected and dellivered"
},

{
    title : "Pack your times",
    description : "and have the package ready on the scheduled date"
},

{
    title : "The courier will collect it",
    description : "and  deliver exactly where you wish"
}];

export const OrderStatus = [
    {
        label : "All",
        value : ""
    },

    {
        label : "Draft",
        value : "draft"
    },

    {
        label : "Departed",
        value : "departed"
    },

    {
        label : "Accepted",
        value : "accepted"
    },

    {
        label : "Cancelled",
        value : "cancelled"
    },

    {
        label : "Assigned",
        value : "courier_assigned"
    },

    {
        label : "Arrived",
        value : "arrived"
    },

    {
        label : "Picked Up",
        value : "active"
    },

    {
        label : "Delivered",
        value : "delivered"
    },

    {
        label : "Created",
        value : "create"
    },

   
]
