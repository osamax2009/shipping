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

