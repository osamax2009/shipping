import { Avatar, Modal, Button, Loading } from "@nextui-org/react";
import {
    BsEnvelope,
    BsFillEnvelopeFill,
    BsFillTelephoneFill,
    BsPerson,
    BsPhoneFill,
    BsPinMapFill,
} from "react-icons/bs";
import { useLocation, useParams } from "react-router-dom";
import { getWithAxios, postWithAxios } from "../api/axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useEffect } from "react";

const ViewUser = () => {
    const [open, setOpen] = useState(false);
    const [user, setUser] = useState(user_id);

    const params = useParams();
    const user_id = params.user_Id;

    const getUserDetails = async () => {
        const res = await getWithAxios("/api/user-detail", { id: user_id });
        if (res.data) {
            setUser(res.data);
        }
    };

    useEffect(() => {
        if (!open) {
            getUserDetails();
        }
    }, [open]);

    return (
        <div>
            <div className="font-bold text-lg">View User</div>
            {user ? (
                <div className="flex p-12 w-full">
                    <div className="border-2 border-gray-500 dark:border-white rounded-lg py-3 px-8 flex flex-col gap-2 justify-center items-center">
                        <Avatar size={"xl"} icon={<BsPerson />} />
                        <div className="flex gap-2 items-center py-2 text-lg">
                            {user?.name}
                        </div>
                        <div>
                            <button
                                onClick={() => setOpen(true)}
                                className="py-2 px-4 border-2 font-bold rounded-lg focus:bg-gray-100"
                            >
                                {user?.status != 1 ? "disable" : "enable"}
                            </button>
                        </div>
                        <div>
                            <div className="flex gap-2 items-center py-2 text-lg">
                                <BsFillEnvelopeFill />{" "}
                                <span> {user?.email} </span>
                            </div>

                            <div className="flex gap-2 items-center py-2 text-lg">
                                <BsFillTelephoneFill />{" "}
                                <span> {user?.contact_number} </span>
                            </div>

                            <div className="flex gap-2 items-center py-2 text-lg">
                                <BsPinMapFill /> <span> {user?.address} </span>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <Loading type="points" />
            )}
            <StatusModal open={open} setOpen={setOpen} user={user} />
        </div>
    );
};

export default ViewUser;

const StatusModal = ({ open, setOpen, user }) => {
    const handleStatus = async () => {
        const dataToSend = {
            id: user?.id,
            status: user?.status == 1 ? 0 : 1,
        };

        const res = await postWithAxios("/api/update-user-status", dataToSend);
        if (res) {
            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });
        }

        setOpen(false);
    };

    return (
        <Modal open={open} closeButton onClose={() => setOpen(false)}>
            <Modal.Header>
                <div className="text-lg">
                    {user?.status == 1 ? "Disable User ?" : "Enable User ?"}
                </div>
            </Modal.Header>
            <Modal.Body>
                <div className="text-center">
                    Do you want to {user?.status == 1 ? "disable" : "enable"}{" "}
                    this user ?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div className="flex flex-wrap w-full gap-6 justify-between sm:justify-end">
                    <Button
                        auto
                        css={{ backgroundColor: "Grey" }}
                        className="text-black"
                        onPress={() => setOpen(false)}
                    >
                        No
                    </Button>

                    <Button
                        auto
                        color={"error"}
                        onPress={handleStatus}
                        className="text-black"
                    >
                        Yes
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
};
