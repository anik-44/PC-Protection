import React from "react";
import {ValidationStrategy as PropTypes} from "@eslint/object-schema";

const MetricTable = ({data}) => {

    return (
        <div
            className="bg-gray-800/70 backdrop-blur rounded-2xl shadow-xl p-6 border border-gray-700 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-4 text-cyan-400 text-center">Recent Logs</h2>
            <div className="w-11/12 overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="text-gray-400 border-b border-gray-700">
                        <th className="py-3 px-2">Timestamp</th>
                        <th className="py-3 px-2">CPU (%)</th>
                        <th className="py-3 px-2">Memory (GB)</th>
                        <th className="py-3 px-2">Event</th>
                        <th className="py-3 px-2">Security Log</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data.map((val) => (
                        <tr key={val.id} className="border-b border-gray-700 hover:bg-gray-700/30 transition">
                            <td className="py-2 px-2 text-gray-300">{val.timestamp}</td>
                            <td className={`py-2 px-2 font-medium ${val.cpu > 70 ? 'text-red-400' : val.cpu > 50 ? 'text-yellow-400' : 'text-green-400'}`}>{val.cpu}</td>
                            <td className={`py-2 px-2 font-medium ${(val.memory / val.totalMemory) > 0.8 ? 'text-red-400' : (val.memory / val.totalMemory) > 0.5 ? 'text-yellow-400' : 'text-green-400'}`}>{val.memory}</td>
                            <td className="py-2 px-2 text-gray-200">{val.event}</td>
                            <td className="py-2 px-2 text-sm text-gray-400 italic">{val.securityLog}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MetricTable;
