import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zuhssrhdezptsgemxofh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1aHNzcmhkZXpwdHNnZW14b2ZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAzNzE5MjcsImV4cCI6MjA4NTk0NzkyN30.Tb0y2zGuy3hGRimE5SY4zHIY8FMfgYt9uDofVQeKBX0"
);

export default function Home() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    const { data } = await supabase
      .from("logs")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(50);

    setLogs(data || []);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Top Access Dashboard</h1>

      <h2>Últimos accesos</h2>

      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            {log.result} - {log.created_at}
          </li>
        ))}
      </ul>
    </div>
  );
}
