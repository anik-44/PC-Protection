const {db} = require('../db.js');

const uploadData = (req, res) => {
    try {
        const {timestamp, cpuUsage, memoryUsed, totalMemory, securityEvent} = req.body;

        console.log(req.body);

        if (!timestamp || cpuUsage === undefined || memoryUsed === undefined || totalMemory === undefined || !securityEvent) {
            console.error("Invalid data");
            return res.status(400).json({message: "Invalid data"});
        }

        db.run(
            `INSERT INTO Metrics (Timestamp, CpuUsage, MemoryUsed, TotalMemory, SecurityEvent)
             VALUES (?, ?, ?, ?, ?)`, // 5 placeholders
            [timestamp, cpuUsage, memoryUsed, totalMemory, securityEvent], // 5 values
            function (err) {
                if (err) {
                    console.error(err.message);
                    return res.status(500).json({message: err.message});
                }
                res.status(200).json({message: "Metric saved"});
            }
        );
    } catch (e) {
        console.error(e);
        return res.status(500).json({message: e.message});
    }
}

const getData = (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 50;
        db.all(`SELECT *
                FROM Metrics
                ORDER BY Id DESC LIMIT ?`, [limit], (err, rows) => {
            if (err) {
                console.error(err.message);
                return res.status(500).json({message: err.message});
            }
            res.json(rows);
        });
    } catch (e) {
        console.error(e);
        return res.status(500).json({message: e.message});
    }
}

module.exports = {
    uploadData,
    getData
}
