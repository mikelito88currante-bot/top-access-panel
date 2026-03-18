import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "AQUI_TU_URL",
  "AQUI_TU_ANON_KEY"
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
