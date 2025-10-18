export function mappedData(data) {
    return data.map(item => {
        return {
            id: item.Id,
            timestamp: new Date(item.Timestamp).toLocaleString(),
            cpu: item.CpuUsage.toFixed(2),
            memory: (item.MemoryUsed / 1024).toFixed(2),
            totalMemory: (item.TotalMemory / 1024).toFixed(2),
            event: item.SecurityEvent.split(' - ')[0],
            securityLog: item.SecurityEvent

        }
    })
}
