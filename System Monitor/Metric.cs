using System;

public class Metric
{
    public DateTime Timestamp { get; set; }
    public float CpuUsage { get; set; }
    public ulong MemoryUsed { get; set; }
    public ulong TotalMemory { get; set; }
    public string SecurityEvent { get; set; }
}