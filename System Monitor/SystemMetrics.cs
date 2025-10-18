using System.Diagnostics;
using Microsoft.VisualBasic.Devices;


class SystemMetrics
{
    private static PerformanceCounter _cpuCounter =
        new PerformanceCounter("Processor", "% Processor Time", "_Total", true);

    public static float GetCpuUsage()
    {
        _cpuCounter.NextValue();
        // first call returns 0
        Thread.Sleep(1000);
        return _cpuCounter.NextValue();
    }

    public static ulong[] GetMemoryUsage()
    {
        try
        {
            ComputerInfo compInfo = new ComputerInfo();
            ulong totalMemory = compInfo.TotalPhysicalMemory;
            ulong availableMemory = compInfo.AvailablePhysicalMemory;
            ulong usedMemory = (totalMemory - availableMemory) / (1024 * 1024);
            return new ulong[] { usedMemory, totalMemory /(1024 * 1024) };
        }
        catch
        {
            return new ulong[] { 0, 0 };
        }
    }
}

class SecurityEvent
{
    public static string GetLatestEventSummary()
    {
        try
        {
            EventLog securityLog = new EventLog("Security");
            if (securityLog.Entries.Count > 0)
            {
                var lastEntry = securityLog.Entries[securityLog.Entries.Count - 1];
                string eventType = lastEntry.EntryType.ToString();
                string[] messageLines = lastEntry.Message.Split(Environment.NewLine);
                string summary = messageLines.Length > 0 ? messageLines[0] : lastEntry.Message;
                return $"{eventType} - {summary}";
            }
        }
        catch (Exception ex)
        {
            return $"Error reading security log: {ex.Message}";
        }

        return "No security events found";
    }
}