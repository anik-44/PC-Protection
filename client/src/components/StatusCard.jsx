import React from "react";
import {FaMemory, FaMicrochip} from "react-icons/fa";

const StatusCard = ({data}) => {
    const latest = data && data[0];
    if (!latest) return null;

    const cpuStatus =
        latest.cpu > 90 ? "bg-red-500" :
            latest.cpu > 70 ? "bg-yellow-500" : "bg-green-500";

    const memStatus =
        latest.memory / latest.totalMemory > 0.8 ? "bg-red-500" :
            latest.memory / latest.totalMemory > 0.5 ? "bg-yellow-500" :
                "bg-green-500";

    return (
        <div className="flex flex-wrap gap-4 w-full max-w-4xl">
            {/* CPU Usage */}
            <div className={`flex items-center gap-3 p-4 rounded-xl shadow-md w-56 ${cpuStatus}`}>
                <FaMicrochip className="w-8 h-8 text-white/80"/>
                <div>
                    <h3 className="text-base font-medium text-white/90">CPU Usage</h3>
                    <p className="text-xl font-semibold text-white">{latest?.cpu ?? 0}%</p>
                </div>
            </div>

            {/* Memory Usage */}
            <div className={`flex items-center gap-3 p-4 rounded-xl shadow-md w-56 ${memStatus}`}>
                <FaMemory className="w-8 h-8 text-white/80"/>
                <div>
                    <h4 className="text-base font-medium text-white/90">Memory Used</h4>
                    <p className="text-xl font-semibold text-white">
                        {(latest?.memory ?? 0)} GB
                    </p>
                </div>
            </div>
        </div>
    )
        ;
};

export default StatusCard;
