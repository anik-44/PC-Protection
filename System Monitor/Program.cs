namespace System_Monitor;

class Program
{
    static async Task Collect()
    {
        Console.WriteLine("System Monitor Started...");
        while (true)
        {
            try
            {
                float cpu = SystemMetrics.GetCpuUsage();
                ulong[] memoryInfo = SystemMetrics.GetMemoryUsage();
                ulong memoryUsed = memoryInfo[0];
                ulong totalMemory = memoryInfo[1];
                string secEvent = SecurityEvent.GetLatestEventSummary();
                DateTime timestamp = DateTime.Now;
                var metric = new Metric
                {
                    Timestamp = timestamp, CpuUsage = cpu, MemoryUsed = memoryUsed, TotalMemory = totalMemory, SecurityEvent = secEvent
                };
                Console.WriteLine($"[{timestamp}] CPU: {cpu:F2}% | Memory: {memoryUsed} MB| TotalMemory: {totalMemory} MB| Security Event: {secEvent}");

                // save to Db local
                await Database.SaveMetricAsync(metric);

                // call to server
                await ServerClient.SendMetricToServerAsync(metric);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in Collection: {ex.Message}");
            }

            // 15 sec delay
            await Task.Delay(15000);
        }
        // ReSharper disable once FunctionNeverReturns
    }

    static async Task Main()
    {
        Database.Initialize();
        await Collect();
    }
}