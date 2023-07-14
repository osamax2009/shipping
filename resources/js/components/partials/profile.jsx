import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/userContext";
import { Grid, Text, Button, input } from "@nextui-org/react";
import { getWithAxios } from "../api/axios";
import UpdateProfil from "./updateProfil";
import UpdatePassword from "./changePassword";


const Profile = () => {
    const { user, setUser } = useContext(UserContext);
    const [address, setAddress] = useState();
    const [passModalOpen, setPassModalOpen] = useState(false);
    const [profilModalOpen, setProfilModalOpen] = useState(false);

    const getCityAndCountry = async () => {
        const dataToSend = {
            id: user?.city_id,
        };

        const res = await getWithAxios("/api/city-detail", dataToSend);

        console.log(res);

        setAddress(res.data);
    };

    const handlePassModal = () => {
        passModalOpen ? setPassModalOpen(false) : setPassModalOpen(true);
    };

    useEffect(() => {
        getCityAndCountry();
    }, [user]);

    return (
        <div>
            <div className=" flex flex-col items-center w-full px-12 ">
                <div className="flex  items-center justify-center ">
                    <Text b className="text-gray-500 dark:text-white text-center">
                        User informations
                    </Text>
                </div>

                <div className=" grid justify-center w-full md:w-2/3 px-4 py-10  ">
                    <div>
                        <div className="grid gap-3 w-full ">
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 ">
                                <div className="grid">
                                    <Text
                                        b
                                        className="text-sm ml-4 mb-2 text-gray-500  dark:text-white"
                                    >
                                        {" "}
                                        Name
                                    </Text>
                                    <input
                                        className="form-control"
                                        disabled
                                        value={user?.name}
                                        aria-label={"Name"}
                                        color={"primary"}
                                    />
                                </div>

                                <div className="grid">
                                    <Text
                                        b
                                        className="text-sm ml-4 mb-2 text-gray-500  dark:text-white"
                                    >
                                        {" "}
                                        Username
                                    </Text>
                                    <input
                                        className="form-control"
                                        disabled
                                        value={user?.username}
                                        aria-label={"username"}
                                        color={"primary"}
                                    />
                                </div>

                                <div className="grid">
                                    <Text
                                        b
                                        className="text-sm ml-4 mb-2 text-gray-500  dark:text-white"
                                    >
                                        Address
                                    </Text>
                                    <input
                                        className="form-control"
                                        disabled
                                        value={user?.address}
                                        aria-label={"Pseudo"}
                                        color={"primary"}
                                    />
                                </div>

                                <div className="grid">
                                    <Text
                                        b
                                        className="text-sm ml-4 mb-2 text-gray-500  dark:text-white"
                                    >
                                        City
                                    </Text>
                                    <input
                                        className="form-control"
                                        disabled
                                        value={address?.name}
                                        aria-label={"Pseudo"}
                                        color={"primary"}
                                    />
                                </div>

                                <div className="grid">
                                    <Text
                                        b
                                        className="text-sm ml-4 mb-2 text-gray-500  dark:text-white"
                                    >
                                        Country
                                    </Text>
                                    <input
                                        className="form-control"
                                        disabled
                                        value={address?.country_name}
                                        aria-label={"country"}
                                        color={"primary"}
                                    />
                                </div>

                                <div className="grid">
                                    <Text
                                        b
                                        className="text-sm ml-4 mb-2 text-gray-500  dark:text-white"
                                    >
                                        {" "}
                                        Email
                                    </Text>
                                    <input
                                        className="form-control"
                                        disabled
                                        value={
                                            user
                                                ? user.email
                                                : "johndoe@email.com"
                                        }
                                        aria-label={"Email"}
                                    />
                                </div>

                                <div className="grid">
                                    <Text
                                        b
                                        className="text-sm ml-4 mb-2 text-gray-500  dark:text-white"
                                    >
                                        {" "}
                                        Contact
                                    </Text>
                                    <input
                                        className="form-control"
                                        disabled
                                        value={user?.contact_number}
                                        aria-label={"Email"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end items-center mt-4 w-full gap-4">
                        <Button
                            auto
                            type={null}
                            css={{ background: "#BF7B2A" }}
                            onClick={handlePassModal}
                        >
                            <p className="font-bold">Change password</p>
                        </Button>

                        <Button
                            auto
                            type={null}
                            onClick={() => setProfilModalOpen(true)}
                        >
                            <p className="font-bold">Update my profil</p>
                        </Button>
                    </div>
                </div>
            </div>
            <UpdatePassword open={passModalOpen} setOpen={setPassModalOpen} />
            <UpdateProfil open={profilModalOpen} setOpen={setProfilModalOpen} />
        </div>
    );
};

export default Profile;
