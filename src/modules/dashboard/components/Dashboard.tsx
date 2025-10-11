import { info } from "console";
import { MessageCircleHeart } from "lucide-react";
import { Rose } from "lucide-react";
import { BadgeCheck } from "lucide-react";
import { CircleX } from "lucide-react";
import { BarChart, Bar } from "recharts";
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
  const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
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
    <section className="flex flex-col gap-4 h-full ">
      <section className="flex-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((info, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg flex gap-5 bg-card"
            >
              <div
                className={`w-12 h-12 rounded-full flex ${info.color} justify-center items-center`}
              >
                {info.img}
              </div>
              <div className="flex flex-col">
                <h2 className="text-md text-muted-foreground">{info.name}</h2>
                <p className="text-xl font-semibold ">{info.num}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="h-full min-h-[40vh]">
        <div className="flex lg:flex-row flex-col h-full gap-4 ">
          <div className="justify-center items-center flex-[2] bg-card rounded-lg border border-border p-3">
            Events Created
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
            {/* <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeWidth={1} strokeOpacity={100} strokeDasharray={2} />
                <XAxis tick={{ fontSize: 12 }} dataKey="name" />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip />
               
                <Bar dataKey="pv" stackId="a" fill="#465ef6" />
                <Bar dataKey="uv" stackId="a" fill="#262626"  />
              </BarChart>
            </ResponsiveContainer> */}
          </div>
          <div className="justify-center items-center flex-[1] bg-card rounded-lg border border-border p-3">
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
{/* flex-1 min-h-0 */}
      <section className="max-h-[40vh] ">
        <div className="flex h-full gap-4 ">
          <div className="w-full bg-card rounded-lg border border-border p-3">
            <p>Simp targets</p>
          </div>

          <div className="w-full bg-card max-h-[400px] rounded-lg border border-border px-3 overflow-auto">
            <div className="flex pt-3 pb-2 justify-between items-center sticky top-0 bg-card">
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
