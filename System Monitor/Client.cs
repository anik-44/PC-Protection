using System.Net.Http.Json;

namespace System_Monitor;

public static class ServerClient
{
    public static async Task SendMetricToServerAsync(Metric metric)
    {
        const string BASE_URL = "https://pc-protection.onrender.com";
        using var client = new HttpClient();
        try
        {
            await client.PostAsJsonAsync($"{BASE_URL}/api/analytics/upload", metric);
            Console.WriteLine("Upload completed");
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error sending metric: {ex.Message}");
        }
    }
}