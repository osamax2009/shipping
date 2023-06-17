import { useEffect, useState } from "react";
import { getWithAxios } from "../../../api/axios";
import { Link } from "react-router-dom";

const PopularRoutes = () => {

    const [countries, setCountries] = useState(null);
    const [cities, setCities] = useState(null);

    const getCountries = async () => {
        const { data } = await getWithAxios("/api/country-list");

        if (data) {
            setCountries(data);
        }
    };

    const getCities = async () => {
        const { data } = await getWithAxios("/api/city-list");

        if (data) {
            setCities(data);
        }
    };

    const getCitiesPhoto = async () => {
       
        cities.map( async (city) => {

            const dataToSend = {
                search_text: city.name,
                country_code: "ca",
                language: "en",
            };

            const res = await getWithAxios(
                "/api/place-autocomplete-api",
                dataToSend
            );
            
            const dataToSend2 = {
                placeid : res.predictions[0].place_id
            }
            const res2 = await getWithAxios("/api/place-detail-api",dataToSend2)

            console.log(res2)
            
        })
       
    }

    useEffect(() => {
        getCountries();
    }, []);

    useEffect(() => {
        getCities();
    }, []);

    useEffect(() => {
        getCitiesPhoto();
    }, []);


    return (
        <div class="styles_section__CZ5qB">
            <div class="styles_container___qBCq">
                <span class="styles_sizeMedium__LSn_Z styles_sub__pDiu9 styles_dark__4aXoy">
                    TAILORED TO YOU
                </span>
                <h3 class="styles_title__p_41M">
                    2Ppoint delivery - Popular Routes
                </h3>
                <div>
                    <div class="styles_tabs__3IhxM">
                        <div
                            tabindex="-1"
                            class="styles_wrapper__K_cyX  styles_isActive__xkjaA "
                            role="button"
                        >
                            <div class="styles_title__zVAA9">From UK</div>
                        </div>
                        <div
                            tabindex="-1"
                            class="styles_wrapper__K_cyX   "
                            role="button"
                        >
                            <div class="styles_title__zVAA9">To UK</div>
                        </div>
                    </div>
                    <div class="styles_section__CZ5qB styles_show__G7nUX">
                        <Link
                            to={"/account/dashboard/place-new-order"}
                            class="styles_card__gXa2X"
                        >
                            <div>
                                <div class="styles_loaded___m4M3">
                                    <img
                                        src="https://www.eurosender.com/home/tailored/from/en-0.jpg"
                                        alt="Ship from the UK to Germany"
                                        class="styles_image__QgkbV"
                                    />
                                </div>
                            </div>
                            <div class="styles_description__2nvG_">
                                <div class="styles_text__TEfPQ">
                                    Ship from {cities? cities[0].name : null}  to {cities? cities[1].name : null}
                                </div>
                                <div class="styles_cta__7Gk_S">
                                    Send now
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-right"
                                        class="svg-inline--fa fa-arrow-right styles_ctaIcon__7HzMw"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to={"/account/dashboard/place-new-order"}
                            class="styles_card__gXa2X"
                        >
                            <div>
                                <div class="styles_loaded___m4M3">
                                    <img
                                        src="https://www.eurosender.com/home/tailored/from/en-1.jpg"
                                        alt="Ship from the UK to Sweden"
                                        class="styles_image__QgkbV"
                                    />
                                </div>
                            </div>
                            <div class="styles_description__2nvG_">
                                <div class="styles_text__TEfPQ">
                                Ship from {cities? cities[0].name : null}  to {cities? cities[3].name : null}
                                </div>
                                <div class="styles_cta__7Gk_S">
                                    Send now
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-right"
                                        class="svg-inline--fa fa-arrow-right styles_ctaIcon__7HzMw"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to="/en/gdd/shipping-united-kingdom-india"
                            class="styles_card__gXa2X"
                        >
                            <div>
                                <div class="styles_loaded___m4M3">
                                    <img
                                        src="https://www.eurosender.com/home/tailored/from/en-2.jpg"
                                        alt="Ship from the UK to India"
                                        class="styles_image__QgkbV"
                                    />
                                </div>
                            </div>
                            <div class="styles_description__2nvG_">
                                <div class="styles_text__TEfPQ">
                                Ship from {cities? cities[0].name : null}  to {cities? cities[5].name : null}
                                </div>
                                <div class="styles_cta__7Gk_S">
                                    Send now
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-right"
                                        class="svg-inline--fa fa-arrow-right styles_ctaIcon__7HzMw"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                        <Link
                            to="/en/gdd/shipping-united-kingdom-united-states"
                            class="styles_card__gXa2X"
                        >
                            <div>
                                <div class="styles_loaded___m4M3">
                                    <img
                                        src="https://www.eurosender.com/home/tailored/from/en-3.jpg"
                                        alt="Ship from the UK to the United States"
                                        class="styles_image__QgkbV"
                                    />
                                </div>
                            </div>
                            <div class="styles_description__2nvG_">
                                <div class="styles_text__TEfPQ">
                                Ship from {cities? cities[0].name : null}  to {cities? cities[9].name : null}
                                </div>
                                <div class="styles_cta__7Gk_S">
                                    Send now
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="arrow-right"
                                        class="svg-inline--fa fa-arrow-right styles_ctaIcon__7HzMw"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 448 512"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                                        ></path>
                                    </svg>
                                </div>
                            </div>
                        </Link>
                    </div>
                    
                </div>
            </div>
        </div>
    );
};

export default PopularRoutes

const DeliverRoute = ({from, to}) => {

   const cityDetails = () => {

   }
   
    return (
        <Link
        to="/account/dashobard/place-new-order"
        class="styles_card__gXa2X"
    >
        <div>
            <div class="styles_loaded___m4M3">
                <img
                    src="https://www.eurosender.com/home/tailored/from/en-0.jpg"
                    alt="Ship from the UK to Germany"
                    class="styles_image__QgkbV"
                />
            </div>
        </div>
        <div class="styles_description__2nvG_">
            <div class="styles_text__TEfPQ">
                Ship from {from} to {to}
            </div>
            <div class="styles_cta__7Gk_S">
                Send now
                <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="arrow-right"
                    class="svg-inline--fa fa-arrow-right styles_ctaIcon__7HzMw"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                >
                    <path
                        fill="currentColor"
                        d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
                    ></path>
                </svg>
            </div>
        </div>
    </Link>
    )
}