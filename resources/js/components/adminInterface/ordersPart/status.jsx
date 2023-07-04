
const Status = ({ order }) => {
    return (
        <div className="text-center  font-bold text-sm ">
            {order?.status == "draft" && (
                <div className="text-gray-600 px-2 py-2 rounded-lg bg-gray-300">
                    Draft
                </div>
            )}

            {order?.status == "create" && (
                <div className="text-green-600 px-2 py-2 rounded-lg bg-green-300">
                    Created
                </div>
            )}

            {order?.status == "courier_assigned" && (
                <div className="text-green-600 px-2 py-2 rounded-lg bg-green-300">
                    Assigned
                </div>
            )}

            {order?.status == "active" && (
                <div className="text-green-600 px-3 py-2 rounded-lg bg-green-300">
                    Active
                </div>
            )}

            {order?.status == "cancelled" && (
                <div className="text-red-600 px-3 py-2 rounded-lg bg-red-400">
                    Cancelled*
                </div>
            )}

            {order?.status == "departed" && (
                <div className="text-red-600 px-3 py-2 rounded-lg bg-red-400">
                    Departed*
                </div>
            )}

            {order?.status == "departed" && (
                <div className="text-red-600 px-3 py-2 rounded-lg bg-red-400">
                    Departed*
                </div>
            )}
        </div>
    );
};

export default Status