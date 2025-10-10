import { info } from "console";
import { MessageCircleHeart } from "lucide-react";
import { Rose } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { CircleX } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Cell, Pie, PieChart } from "recharts";
import { useSimpTargets } from "@/modules/simp-target/hooks/useSimpTarget";
import SimpTargetMiniCard from "@/modules/simp-target/components/SimpTargetMiniCard";
import Link from "next/link";
const RADIAN = Math.PI / 180;
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Dashboard() {
  const stats = [
    {
      name: "All dates",
      num: 12,
      img: <MessageCircleHeart color="white" />,
      color: "bg-chart-1",
    },
    {
      name: "All targets",
      num: 4,
      img: <Rose color="white" />,
      color: "bg-chart-2",
    },
    {
      name: "Successful dates",
      num: 9,
      img: <BadgeCheck color="white" />,
      color: "bg-chart-3",
    },
    {
      name: "Declined dates",
      num: 3,
      img: <CircleX color="white" />,
      color: "bg-chart-4",
    },
  ];

  const LineChartData = [
    { date: "09-28", eventsCreated: 3 },
    { date: "09-29", eventsCreated: 5 },
    { date: "09-30", eventsCreated: 4 },
    { date: "10-01", eventsCreated: 8 },
  ];

  const PieChartData = [
    { name: "Accepted", value: 400 },
    { name: "Declined", value: 300 },
    { name: "Pending", value: 300 },
  ];

  const { data: targets, isLoading } = useSimpTargets();

  return (
    <section className="flex flex-col gap-4 h-full min-h-0 flex-grow">
      <section className="flex-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((info, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg flex gap-5 bg-background"
            >
              <div
                className={`w-12 h-12 rounded-full flex ${info.color} justify-center items-center`}
              >
                {info.img}
              </div>
              <div className="flex flex-col">
                <h2 className="text-md ">{info.name}</h2>
                <p className="text-xl font-semibold ">{info.num}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex-1 min-h-0">
        <div className="flex h-full gap-4 ">
          <div className="justify-center items-center flex-[2] bg-background rounded-lg border border-border p-3">
            Events Created Per Day
            <ResponsiveContainer
              style={{
                paddingRight: "50px",
                paddingTop: "20px",
              }}
              width="100%"
              height="90%"
            >
              <LineChart
                data={LineChartData}
                margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  padding={{ left: 0, right: 0 }}
                  domain={["dataMin", "dataMax"]}
                  tick={{ fontSize: 12 }}
                  interval="preserveStartEnd"
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    fontSize: 12,
                    borderRadius: 8,
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="eventsCreated"
                  stroke="#8884d8"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="justify-center items-center flex-[1] bg-background rounded-lg border border-border p-3">
            Events Status
            <div className="flex items-center h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart width={500} height={500}>
                  <Pie
                    data={PieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {PieChartData.map((entry, index) => (
                      <Cell
                        key={`cell-${entry.name}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-col mr-5">
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4 bg-[#0088FE]"></div>
                  <p className="text-sm">Accepted</p>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4 bg-[#00C49F]"></div>
                  <p className="text-sm">Declined</p>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4 bg-[#FFBB28]"></div>
                  <p className="text-sm">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex-1 min-h-0 ">
        <div className="flex h-full gap-4 ">
          <div className="w-full bg-background rounded-lg border border-border p-3">
            <p>Simp targets</p>
          </div>

          <div className="w-full bg-background max-h-[400px] rounded-lg border border-border px-3 overflow-auto">
            <div className="flex pt-3 pb-2 justify-between items-center sticky top-0 bg-background">
              <span> Simp targets</span>
              <Link href="/simp-target">
                <span className="text-blue-500 text-base">View all</span>
              </Link>
            </div>

            {isLoading && <div>Loading...</div>}
            {targets?.map((target, index) => (
              <SimpTargetMiniCard key={index} target={target} />
            ))}
          </div>
        </div>
      </section>
    </section>
  );
}
