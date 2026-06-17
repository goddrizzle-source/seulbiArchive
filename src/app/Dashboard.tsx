import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const SUPABASE_URL = "https://hnlfdtiuxapjyyhotxzq.supabase.co";
const ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhubGZkdGl1eGFwanl5aG90eHpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE1ODk0ODQsImV4cCI6MjA5NzE2NTQ4NH0.U3GCqb3EN18oPf31yr9P0cRzMCzIEUghp_0od1Sz810";
const PASSWORD = "slbi2026";

type DailyVisit = { date: string; count: number };

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

export default function Dashboard() {
  const [authed, setAuthed] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);
  const [data, setData] = useState<DailyVisit[]>([]);
  const [loading, setLoading] = useState(false);

  const login = () => {
    if (input === PASSWORD) {
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    if (!authed) return;
    setLoading(true);
    fetch(
      `${SUPABASE_URL}/rest/v1/daily_visits?select=*&order=date.asc`,
      { headers: { apikey: ANON_KEY, Authorization: `Bearer ${ANON_KEY}` } }
    )
      .then((r) => r.json())
      .then((rows: DailyVisit[]) => setData(rows))
      .finally(() => setLoading(false));
  }, [authed]);

  const today = new Date().toISOString().slice(0, 10);
  const todayCount = data.find((d) => d.date === today)?.count ?? 0;
  const totalCount = data.reduce((sum, d) => sum + d.count, 0);
  const peakDay = data.reduce(
    (max, d) => (d.count > max.count ? d : max),
    { date: "-", count: 0 }
  );

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#080808] flex items-center justify-center">
        <div className="w-80">
          <p className="font-['Archivo'] text-white/30 text-xs tracking-[0.4em] uppercase mb-6 text-center">
            Dashboard
          </p>
          <input
            type="password"
            placeholder="비밀번호"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && login()}
            className="w-full bg-white/5 border border-white/10 text-white text-sm px-4 py-3 outline-none focus:border-white/30 transition-colors font-['Archivo'] tracking-wider mb-3"
          />
          {error && (
            <p className="font-['Archivo'] text-red-400/70 text-xs tracking-wider mb-3">
              비밀번호가 틀렸습니다
            </p>
          )}
          <button
            onClick={login}
            className="w-full bg-white text-black font-['Archivo'] text-xs tracking-[0.3em] uppercase py-3 hover:bg-white/90 transition-colors"
          >
            Enter
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] px-8 md:px-16 py-16">
      {/* 헤더 */}
      <div className="mb-16">
        <p className="font-['Archivo'] text-white/30 text-xs tracking-[0.4em] uppercase mb-3">
          Analytics
        </p>
        <h1 className="font-['Archivo_Black'] text-white text-5xl md:text-7xl leading-none tracking-tight">
          VISITS
        </h1>
        <div className="h-[1px] bg-white/10 mt-8" />
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-px bg-white/10 mb-16">
        {[
          { label: "Today", value: todayCount },
          { label: "Total", value: totalCount },
          { label: "Peak", value: `${peakDay.count}${peakDay.date !== "-" ? ` (${formatDate(peakDay.date)})` : ""}` },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#080808] px-8 py-10">
            <p className="font-['Archivo'] text-white/30 text-[10px] tracking-[0.4em] uppercase mb-3">
              {stat.label}
            </p>
            <p className="font-['Archivo_Black'] text-white text-4xl md:text-5xl">
              {loading ? "—" : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* 차트 */}
      <div className="mb-4">
        <p className="font-['Archivo'] text-white/30 text-[10px] tracking-[0.4em] uppercase mb-8">
          Daily Visits
        </p>
        {loading ? (
          <div className="h-64 flex items-center justify-center">
            <p className="font-['Archivo'] text-white/20 text-xs tracking-[0.3em]">Loading...</p>
          </div>
        ) : data.length === 0 ? (
          <div className="h-64 flex items-center justify-center">
            <p className="font-['Archivo'] text-white/20 text-xs tracking-[0.3em]">No data yet</p>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={data} barSize={data.length < 10 ? 32 : undefined}>
              <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.05)" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "Archivo" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 11, fontFamily: "Archivo" }}
                axisLine={false}
                tickLine={false}
                allowDecimals={false}
                width={30}
              />
              <Tooltip
                contentStyle={{
                  background: "#111",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 0,
                  fontFamily: "Archivo",
                  fontSize: 12,
                  color: "white",
                }}
                labelFormatter={formatDate}
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
              />
              <Bar dataKey="count" fill="white" name="방문" />
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* 날짜별 테이블 */}
      <div className="mt-16">
        <p className="font-['Archivo'] text-white/30 text-[10px] tracking-[0.4em] uppercase mb-6">
          All Records
        </p>
        <div className="border-t border-white/10">
          {[...data].reverse().map((row) => (
            <div
              key={row.date}
              className={`flex justify-between items-center py-4 border-b border-white/5 ${
                row.date === today ? "opacity-100" : "opacity-50"
              }`}
            >
              <span className="font-['Archivo'] text-white text-sm tracking-wider">
                {row.date}
                {row.date === today && (
                  <span className="ml-3 text-[10px] text-white/40 tracking-[0.3em] uppercase">Today</span>
                )}
              </span>
              <span className="font-['Archivo_Black'] text-white text-xl">{row.count}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
