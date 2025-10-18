
using Microsoft.Data.Sqlite;
class Database
{
    private static string dbFile = "metrics.db";

    public static void Initialize()
    {
        using var connection = new SqliteConnection($"Data Source={dbFile}");
        connection.Open();
        var tableCmd = connection.CreateCommand();
        tableCmd.CommandText = @"
            CREATE TABLE IF NOT EXISTS Metrics (
                Id INTEGER PRIMARY KEY AUTOINCREMENT,
                Timestamp TEXT NOT NULL,
                CpuUsage REAL NOT NULL,
                MemoryUsed INTEGER NOT NULL,
                TotalMemory INTEGER NOT NULL,
                SecurityEvent TEXT NOT NULL
            );";
        tableCmd.ExecuteNonQuery();
    }

    public static async Task SaveMetricAsync(Metric metric)
    {
        using var connection = new SqliteConnection($"Data Source={dbFile}");
        await connection.OpenAsync();
        var insertCmd = connection.CreateCommand();
        insertCmd.CommandText = @"
            INSERT INTO Metrics (Timestamp, CpuUsage, MemoryUsed,TotalMemory, SecurityEvent)
            VALUES ($timestamp, $cpu, $memory, $totalMem, $event);";
        insertCmd.Parameters.AddWithValue("$timestamp", metric.Timestamp.ToString("yyyy-MM-dd HH:mm:ss"));
        insertCmd.Parameters.AddWithValue("$cpu", metric.CpuUsage);
        insertCmd.Parameters.AddWithValue("$memory", metric.MemoryUsed);
        insertCmd.Parameters.AddWithValue("$totalMem", metric.TotalMemory);
        insertCmd.Parameters.AddWithValue("$event", metric.SecurityEvent);
        await insertCmd.ExecuteNonQueryAsync();
    }
}