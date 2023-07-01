import { Button, Image, Radio } from "@nextui-org/react";
import { useRef } from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getWithAxios, postWithAxios } from "../api/axios";
import { toast } from "react-toastify";

const PaymentSetup = () => {
    const [selected, setSelected] = useState({
        id: "",
        title: "",
        type: "",
        status: 1,
        is_test: 1,
        test_value: {},
        live_value: "",
        gateway_logo: "",
    });
    const [images, setImages] = useState([]);
    const [mode, setMode] = useState(1);
    const [fields, setFields] = useState({});
    const [current, setCurrent] = useState();
    const [payments, setPayments] = useState();

    const params = useParams();
    const payment_type = params?.payment_type;
    const navigate = useNavigate();

    const gateways = [
        {
            method: {
                label: "Stripe",
                value: "stripe",
            },

            fields: [
                {
                    label: "Secret Key",
                    value: "secret_key",
                },
                {
                    label: "Publishable key",
                    value: "publishable_key",
                },
            ],
        },
        {
            method: {
                label: "Razorpay",
                value: "razorpay",
            },

            fields: [
                {
                    label: "Key Id",
                    value: "key_id",
                },
                {
                    label: "Publishable key",
                    value: "publishable_key",
                },
            ],
        },

        {
            method: {
                label: "PayStack",
                value: "paystack",
            },

            fields: [
                {
                    label: "Public Key",
                    value: "public_key",
                },
            ],
        },

        {
            method: {
                label: "FlutterWave",
                value: "flutterwave",
            },

            fields: [
                {
                    label: "Public Key",
                    value: "public_key",
                },
                {
                    label: "Secret key",
                    value: "secret_key",
                },

                {
                    label: "Encryption key",
                    value: "encryption_key",
                },
            ],
        },

        {
            method: {
                label: "PayPal",
                value: "paypal",
            },

            fields: [
                {
                    label: "Tokenization key",
                    value: "tokenization_key",
                },
            ],
        },

        {
            method: {
                label: "PayTabs",
                value: "paytabs",
            },

            fields: [
                {
                    label: "Profil Id",
                    value: "profil_id",
                },
                {
                    label: "Server key",
                    value: "server_key",
                },

                {
                    label: "Client key",
                    value: "client_key",
                },
            ],
        },

        {
            method: {
                label: "Mercado pago",
                value: "mercadopago",
            },

            fields: [
                {
                    label: "Public Key",
                    value: "public_key",
                },
                {
                    label: "Access Token",
                    value: "access_token",
                },
            ],
        },

        {
            method: {
                label: "Paytm",
                value: "paytm",
            },

            fields: [
                {
                    label: "MID",
                    value: "mid",
                },
                {
                    label: "Merchant Key",
                    value: "merchant_key",
                },
            ],
        },

        {
            method: {
                label: "My Fatoorah",
                value: "myfatoorah",
            },

            fields: [
                {
                    label: "Token",
                    value: "token",
                },
            ],
        },
    ];

    const navigateBack = () => {
        navigate("/admin/paymentgateway");
    };

    const getPaymentGateway = async () => {
        const res = await getWithAxios("/api/paymentgateway-list");
        setPayments(res.data);
        console.log(res.data);

        if (payment_type) {
            res.data.map((i) => {
                if (i.type == payment_type) {
                    return setSelected(i);
                }
            });
        } else {
            setSelected({
                id: "",
                title: "",
                type: "",
                status: 1,
                is_test: 1,
                test_value: {},
                live_value: "",
                gateway_logo: "",
            });
        }
    };

    useEffect(() => {
        getPaymentGateway();
    }, [payment_type]);

    useEffect(() => {
        gateways.map((i) => {
            if (i.method.value == payment_type) {
                return setCurrent(i);
            }
        });
    }, [payment_type]);

    return (
        <div className="relative">
            <div className="absolute top-5 right-3">
                <Button
                    auto
                    color={"secondary"}
                    size={"lg"}
                    onPress={navigateBack}
                >
                    <div className="font-bold text-lg">back</div>
                </Button>
            </div>
            <div className="flex flex-wrap w-3/4 gap-6 font-bold text-lg">
                {gateways.map((gateway, index) => (
                    <GatewayLink
                        gateway={gateway}
                        key={index}
                        setSelected={setSelected}
                        current={current}
                    />
                ))}
            </div>

            <div className="flex w-full justify-center pt-8 pb-4">
                <UpdateForm
                    selected={selected}
                    setSelected={setSelected}
                    images={images}
                    setImages={setImages}
                    fields={fields}
                    setFields={setFields}
                    mode={mode}
                    setMode={setMode}
                    current={current}
                    setCurrent={setCurrent}
                />
            </div>
        </div>
    );
};

export default PaymentSetup;

const UpdateForm = ({
    selected,
    setSelected,
    images,
    setImages,
    fields,
    setFields,
    mode,
    setMode,
    current,
    setCurrent,
}) => {
    const navigate = useNavigate();

    const changeMethod = (e) => {
        setSelected({ ...selected, title: e.target.value });
    };

    const updatePaymentGatway = async () => {
        var formData = new FormData();
        formData.append(
            "gateway_logo",
            document.getElementById("logo").files[0]
        );
        formData.append("id", selected?.id);

        if (images[0]) {
            const dataTosend = {
                id: selected?.id,
                title:
                    selected?.title != ""
                        ? selected?.title
                        : current?.method.label,
                type: current?.method.value,
                status: 1,
                is_test: selected?.is_test ? selected?.is_test : mode,
                value: fields,
                live_value: "",
                gateway_logo: images[0],
            };

            console.log(dataTosend);
            const res = await postWithAxios(
                "/api/paymentgateway-save",
                dataTosend
            );
            // const logo =  await postWithAxios("/api/paymentgateway-save", formData)
            /*   console.log(res)
        console.log(logo)
        console.log(formData); */

            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });

            navigate("/admin/paymentgateway");
            
        } else {
            const dataTosend = {
                id: selected?.id,
                title:
                    selected?.title != ""
                        ? selected?.title
                        : current?.method.label,
                type: current?.method.value,
                status: 1,
                is_test: selected?.is_test ? selected?.is_test : mode,
                value: fields,
                live_value: "",
            };

            console.log(dataTosend);
            const res = await postWithAxios(
                "/api/paymentgateway-save",
                dataTosend
            );
            // const logo =  await postWithAxios("/api/paymentgateway-save", formData)
            /*   console.log(res)
        console.log(logo)
        console.log(formData); */

            toast(res.message, {
                type: "info",
                hideProgressBar: true,
            });

            navigate("/admin/paymentgateway");
        }
    };

    useEffect(() => {
        setMode(selected?.is_test);
    }, [selected]);

    useEffect(() => {
        setFields(selected?.test_value);
    }, [selected]);

    return (
        <div className="p-4 border-2 w-4/5  md:w-2/4 rounded-xl">
            <div className="font-bold w-full text-lg text-start py-4">
                {current?.method.label} Payment
            </div>
            <div className="form-group">
                <label htmlFor=""> Payment Method </label>
                <input
                    type="text"
                    className="form-control"
                    value={
                        selected?.title
                            ? selected?.title
                            : current?.method.label
                    }
                    onChange={changeMethod}
                />
            </div>
            <div className="py-2">
                <div className="py-2">Mode</div>
                <div className="flex">
                    <Radio.Group
                        orientation="horizontal"
                        color="secondary"
                        value={mode}
                        defaultChecked
                        onChange={setMode}
                    >
                        <Radio value={1} className="px-12">
                            Test
                        </Radio>

                        <Radio value={0} className="px-12">
                            Live
                        </Radio>
                    </Radio.Group>
                </div>
            </div>
            <div>
                {current?.fields.map((field, index) => (
                    <FieldInput
                        key={index}
                        field={field}
                        fields={fields}
                        setFields={setFields}
                        selected={selected}
                    />
                ))}
            </div>

            <div>
                <ImageUploader
                    images={images}
                    setImages={setImages}
                    selected={selected}
                />
            </div>
            <div className="flex items-center justify-center w-full py-4">
                <Button
                    color={"secondary"}
                    size={"lg"}
                    onPress={updatePaymentGatway}
                >
                    <div className="text-center font-bold">Update</div>
                </Button>
            </div>
        </div>
    );
};

const FieldInput = ({ field, fields, setFields, selected }) => {
    const [value, setValue] = useState("");

    const label = field.value;

    const changeField = (e) => {
        setValue(e.target.value);
        const previous = fields;

        previous[label] = value;
        setFields(previous);
    };

    useEffect(() => {
        if (selected?.test_value) {
            setValue(selected?.test_value[label]);
        }
    }, [selected]);

    return (
        <div className="form-group">
            <label htmlFor=""> {field.label}</label>
            <input
                type="text"
                className="form-control"
                value={value}
                onChange={changeField}
            />
        </div>
    );
};

const ImageUploader = ({ images, setImages, selected }) => {
    const [imageURLS, setImageURLS] = useState([]);
    const inputRef = useRef(null);

    const handleFocus = () => {
        inputRef.current.click();
    };

    const uploadImageToClient = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImages((imageList) => [...imageList, event.target.files[0]]);
            setImageURLS((urlList) => [
                ...urlList,
                URL.createObjectURL(event.target.files[0]),
            ]);
        }
    };
    return (
        <div className="form-group ">
            <div className="flex gap-4 items-center py-8 font-bold">
                <div>Image</div>
                <button
                    onClick={handleFocus}
                    className="py-2 px-4 text-lg rounded-lg bg-gray-300 font-bold text-gray-400"
                >
                    Select image
                </button>
            </div>

            <input
                ref={inputRef}
                id="logo"
                type="file"
                className="w-[2px] h-[1px] fixed -z-10"
                onChange={uploadImageToClient}
            />

            <div className="flex w-full justify-center items-center">
                {imageURLS[0] ? (
                    <img
                        className="border border-white w-64 h-64 outline-none"
                        src={imageURLS[0]}
                    />
                ) : (
                    <img
                        className="border border-white w-64 h-64 outline-none"
                        src={selected?.gateway_logo}
                    />
                )}
            </div>
        </div>
    );
};

const GatewayLink = ({ gateway, setSelected, current }) => {
    const navigate = useNavigate();

    const goTo = () => {
        const url = "/admin/paymentsetup/payment_type/" + gateway.method.value;
        /* setSelected({
            id: "",
            title: "",
            type: "",
            status: 1,
            is_test: 1,
            test_value: {},
            live_value: "",
            gateway_logo: "",
        });  */
        navigate(url);
        //   window.location.reload()
    };

    return (
        <button
            onClick={goTo}
            className={
                gateway.method.label == current?.method.label
                    ? "py-2 px-4 bg-appGreen text-white rounded-lg"
                    : "py-2 px-4 bg-gray-300 text-black rounded-lg"
            }
        >
            {gateway.method.label}
        </button>
    );
};
