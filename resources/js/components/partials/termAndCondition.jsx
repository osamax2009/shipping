import { useContext } from "react";
import PointFooter from "../userInterface/pagesPartials/index/2pointFooter";
import { AppSettingsContext } from "../contexts/appSettings";

const TermAndCondition = () => {
    const {appSettings, setApSettings} = useContext(AppSettingsContext)
    return (
        <div className=" flex flex-col justify-between min-h-screen">
            <div className="py-24 text-center text-white font-bold text-4xl bg-appGreen">Term & Condition</div>
            <div className="h-full px-12 py-12 text-justify bg-white font-bold">
                {appSettings?.term_and_condition}
            </div>

            <PointFooter />
        </div>
    );
};

export default TermAndCondition;
