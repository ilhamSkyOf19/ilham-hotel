import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// data kebutuhan
const kebutuhan = [
  { name: "P", value: 2 },
  { name: "P", value: 3 },
  { name: "E", value: 4 },
  { name: "P", value: 5 },
  { name: "P", value: 6 },
];

// data terkumpul
const terkumpul = [
  { name: "P", value: 1 },
  { name: "P", value: 1 },
  { name: "E", value: 3 },
  { name: "P", value: 3 },
  { name: "P", value: 2 },
];

const SimpleBarChart = () => {
  // state — data persentase
  const [data, setData] = useState<{ name: string; value: number }[]>([]);

  useEffect(() => {
    const hasil = terkumpul.map((item, index) => {
      const kebutuhanValue = kebutuhan[index].value;
      const percent = (item.value / kebutuhanValue) * 100;

      return {
        name: item.name,
        value: percent,
        index: index, // <-- penting untuk tooltip
      };
    });

    setData(hasil);
  }, []);

  return (
    <div className="w-full flex flex-col gap-8 items-center py-10">
      {/* UI Kebutuhan & Terkumpul */}
      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Tabel Kebutuhan */}
        <div className="border rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">Data Kebutuhan</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">Nama</th>
                <th className="border px-3 py-2">Kebutuhan</th>
              </tr>
            </thead>
            <tbody>
              {kebutuhan.map((item, i) => (
                <tr key={i}>
                  <td className="border px-3 py-2 text-center">{item.name}</td>
                  <td className="border px-3 py-2 text-center">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabel Terkumpul */}
        <div className="border rounded-xl p-4 shadow">
          <h2 className="text-lg font-semibold mb-3">Data Terkumpul</h2>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="border px-3 py-2">Nama</th>
                <th className="border px-3 py-2">Terkumpul</th>
              </tr>
            </thead>
            <tbody>
              {terkumpul.map((item, i) => (
                <tr key={i}>
                  <td className="border px-3 py-2 text-center">{item.name}</td>
                  <td className="border px-3 py-2 text-center">{item.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Chart */}
      <BarChart
        style={{
          width: "100%",
          maxWidth: "450px",
          maxHeight: "70vh",
          aspectRatio: 1.4,
        }}
        responsive
        data={data}
        margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width="auto" domain={[0, 100]} />
        <Tooltip content={<CustomTooltip />} />

        <Legend />
        <Bar
          dataKey="value"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
      </BarChart>
    </div>
  );
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const index = payload[0].payload.index; // posisi bar
    const kebutuhanValue = kebutuhan[index].value;
    const terkumpulValue = terkumpul[index].value;

    return (
      <div className="bg-white shadow p-3 rounded border">
        <p className="font-semibold">Nama: {label}</p>
        <p>Kebutuhan: {kebutuhanValue}</p>
        <p>Terkumpul: {terkumpulValue}</p>
        <p>
          Persentase: {((terkumpulValue / kebutuhanValue) * 100).toFixed(0)}%
        </p>
      </div>
    );
  }
  return null;
};

export default SimpleBarChart;
