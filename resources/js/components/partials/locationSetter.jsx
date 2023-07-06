import { useRef } from "react";
import { useState } from "react";
import { getWithAxios } from "../api/axios";
import { useEffect } from "react";

const LocationSetter = ({ cityName, setCityName}) => {
    const [expanded, setExpanded] = useState(false);
    const [cities, setCities] = useState(null);
    const [p_cities, setP_cities] = useState();
    const [selected, setSelected] = useState();
    const [places, setPlaces] = useState();
    const [place, setPlace] = useState();

    const divRef = useRef(null);

    const getPlaces = async () => {
        const dataToSend = {
            search_text: cityName,
            country_code: "ca",
            language: "en",
        };
        const res = await getWithAxios(
            "/api/place-autocomplete-api",
            dataToSend
        );

        if (res.status == "OK") {
            setPlaces(res.predictions);
        }
    };

    useEffect(() => {
        if (expanded) {
            getPlaces();
        }
    }, [cityName]);

    useEffect(() => {
        setCityName(selected?.description);
        setExpanded(false);
    }, [selected]);

   /*  useEffect(() => {
        if(!open)
        {
            setCityName(null)
        }
       
    }, [open]); */

    return (
        <div ref={divRef} className="relative w-full cursor-pointer">
            <input
                type="text"
                className="form-control w-max"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                onFocus={() => setExpanded(true)}
                required
                placeholder="Address"
            />
            {expanded && places?.length > 0 ? (
                <div className="bg-white max-h-[290px] z-50 shadow absolute top-12 left-0 right-0 border rounded-lg overflow-hidden overflow-y-scroll ">
                    {places?.map((place, index) => (
                        <div
                            key={index}
                            onMouseDown={() => setSelected(place)}
                            className="flex hover:bg-gray-100 cursor-pointer gap-2 py-3 px-4"
                        >
                            <div>{place.description}</div>
                        </div>
                    ))}
                </div>
            ) : null}
        </div>
    );
};

export default LocationSetter