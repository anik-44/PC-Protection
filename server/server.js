const express = require("express");
const cors = require("cors");
const {db} = require('./db.js');
const analyticsRouter = require("./route/analytics.route");

const app = express();

const allowedOrigins = [
    "http://localhost:5173",
    "https://pcprotection.netlify.app"
];

app.use(cors({
    origin: allowedOrigins,
    methods: ["GET"],
}));

app.use(express.json());

// create metrics table
db.run(`
    CREATE TABLE IF NOT EXISTS Metrics (
                                           Id INTEGER PRIMARY KEY AUTOINCREMENT,
                                           Timestamp TEXT NOT NULL,
                                           CpuUsage REAL NOT NULL,
                                           MemoryUsed INTEGER NOT NULL,
                                           TotalMemory INTEGER NOT NULL,
                                           SecurityEvent TEXT NOT NULL
    )
`);

app.use('/api/analytics', analyticsRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`API running on port ${PORT}`);
});
