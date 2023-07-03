import { Button, Image, Radio } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ImageUploader from "../../partials/imageUploader";
import { getWithAxios, postWithAxios } from "../../api/axios";
import { useNavigate } from "react-router-dom";

const GatewayLayout = ({ title, type, fields }) => {
    const [selected, setSelected] = useState({
        id: "",
        title: "",
        type: type,
        status: 1,
        is_test: 1,
        test_value: {},
        live_value: "",
        gateway_logo: "",
    });
    const [images, setImages] = useState([]);
    const [current, setCurrent] = useState({
        id: "",
        title: "",
        type: "",
        status: 1,
        is_test: 1,
        test_value: {},
        live_value: "",
        gateway_logo: "",
    });
    const [payments, setPayments] = useState();

    const navigate = useNavigate()

    const getPaymentGateway = async () => {
        const res = await getWithAxios("/api/paymentgateway-list");
        setPayments(res.data);

        res.data.map((i) => {
            if (i.type == type) {
                return setSelected(i);
            }
        });
    };

    const updatePaymentGatway = async () => {
        var data = new FormData();

        data.append("id", current?.id);
        data.append("title", current?.title);
        data.append("type", current?.type);
        data.append("is_test", current?.is_test); 
        data.append("live_value", current?.live_value);

        if (images[0]) {
            data.append("gateway_logo", images[0]);
        }

        console.log(current?.test_value)
        console.log(data.get('value'))

        const res = await postWithAxios("/api/paymentgateway-save", data);

        const gateways = await getWithAxios("/api/paymentgateway-list");

        let id = null

        gateways.data.map((i) => {
            if (i.type == current?.type) {
                return id = i.id;
            }
        });

        const dataToSend = {
            id : id,
            value : current?.test_value

        }

        console.log(dataToSend)

        const value = await  postWithAxios("/api/paymentgateway-save", dataToSend);

        
        toast(value.message, {
            type: "info",
            hideProgressBar: true,
        });

        toast(res.message, {
            type: "info",
            hideProgressBar: true,
        });

        navigate("/admin/paymentgateway");
    };

    useEffect(() => {
        getPaymentGateway();
    }, []);

    useEffect(() => {
        setCurrent(selected);
    }, [selected]);

    return (
        <div className="p-4 border-2 w-4/5  md:w-2/4 rounded-xl">
            <div className="font-bold w-full text-lg text-start py-4">
                {title} Payment
            </div>
            <div className="form-group">
                <label htmlFor=""> Payment Method </label>
                <input
                    type="text"
                    className="form-control"
                    value={current?.title}
                    onChange={(e) =>
                        setCurrent({
                            ...current,
                            title: e.target.value,
                        })
                    }
                />
            </div>
            <div className="py-2">
                <div className="py-2">Mode</div>
                <div className="flex">
                    <Radio.Group
                        orientation="horizontal"
                        color="secondary"
                        value={current?.is_test}
                        defaultChecked
                        onChange={(e) => setCurrent({ ...current, is_test: e })}
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
                {fields?.map((field, index) => (
                    <FieldInput
                        key={index}
                        label={field?.label}
                        value={field?.value}
                        current={current}
                        setCurrent={setCurrent}
                    />
                ))}
            </div>

            <div>
                <ImageUploader
                    images={images}
                    setImages={setImages}
                    oldImagePath={selected?.gateway_logo}
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

export default GatewayLayout;

const FieldInput = ({ label, value, setCurrent, current }) => {
    const [inputValue, setInputValue] = useState("");

    const changeField = (e) => {
     //   setInputValue(e.target.value);
        const previous = current?.test_value;

        previous[value] = e.target.value;
        setCurrent({...current, test_value : previous});
    };

    useEffect(() => {
        if (current?.test_value) {
            setInputValue(current?.test_value[value]);
        }
    }, [current]);

    return (
        <div className="form-group">
            <label htmlFor=""> {label} </label>
            <input
                type="text"
                className="form-control"
                value={inputValue}
                onChange={changeField}
            />
        </div>
    );
};
