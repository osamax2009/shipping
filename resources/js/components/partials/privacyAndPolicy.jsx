import PointFooter from "../userInterface/pagesPartials/index/2pointFooter";

const PrivacyAndPolicy = () => {
    return (
        <div className=" flex flex-col justify-between min-h-screen">
            <div className="py-24 text-center text-white font-bold text-4xl bg-appGreen">Privacy Policy</div>
            <div className="h-full px-12 py-12 text-justify bg-white font-bold">
                At 2Point Delivery, accessible from <a href="/">https://2pointdelivery.com</a>,
                one of our main priorities is the privacy of our visitors. This
                Privacy Policy document contains types of information that is
                collected and recorded by 2Point Delivery and how we use it. If
                you have additional questions or require more information about
                our Privacy Policy, do not hesitate to contact us. This Privacy
                Policy applies only to our online activities and is valid for
                visitors to our website with regards to the information that
                they shared and/or collect in 2Point Delivery. This policy is
                not applicable to any information collected offline or via
                channels other than this website. If you have additional
                questions or require more information about our Privacy Policy,
                do not hesitate to contact us.
                <br />
                <br />
                This Privacy Policy applies only to our online activities and is
                valid for visitors to our website with regards to the
                information that they shared and/or collect in 2Point Delivery.
                This policy is not applicable to any information collected
                offline or via channels other than this website.
            </div>

            <PointFooter />
        </div>
    );
};

export default PrivacyAndPolicy;
