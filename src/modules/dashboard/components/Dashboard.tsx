import { info } from "console";
import { MessageCircleHeart } from "lucide-react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CircleX,
  ArrowUpWideNarrow,
  ChevronDownIcon,
  BadgeCheck,
} from "lucide-react";
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Cell, Pie, PieChart } from "recharts";
import { useSimpTargets } from "@/modules/simp-target/hooks/useSimpTarget";
import { useGetRomanticEvent } from "@/modules/romantic-event/hooks/useRomanticEvent";
import SimpTargetMiniCard from "@/modules/simp-target/components/SimpTargetMiniCard";
import EventMiniCard from "@/modules/romantic-event/components/EventMiniCard";
import Link from "next/link";
import { PieLabelRenderProps } from "recharts";
const RADIAN = Math.PI / 180;
const COLORS = ["#3c9aeb", "#50C099", "#FFC565", "#FF8042"];

type CustomLabelProps = {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index?: number;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelRenderProps) => {
  const cX = Number(cx ?? 0);
  const cY = Number(cy ?? 0);
  const iR = Number(innerRadius ?? 0);
  const oR = Number(outerRadius ?? 0);
  const angle = Number(midAngle ?? 0);
  const p = Number(percent ?? 0); // << important for the arithmetic

  const radius = iR + (oR - iR) * 0.5;
  const x = cX + radius * Math.cos(-angle * RADIAN);
  const y = cY + radius * Math.sin(-angle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cX ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(p * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Dashboard() {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
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
      color: "bg-primary",
    },
    {
      name: "All targets",
      num: 4,
      img: <User color="white" />,
      color: "bg-blue",
    },
    {
      name: "Successful dates",
      num: 9,
      img: <BadgeCheck color="white" />,
      color: "bg-green",
    },
    {
      name: "Declined dates",
      num: 3,
      img: <CircleX color="white" />,
      color: "bg-red",
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

  const { data: targets, isLoading: targetsLoading } = useSimpTargets();

  const { data: romanticEvents, isLoading: EventsLoading } =
    useGetRomanticEvent();

  return (
    <section className="flex flex-col gap-4 h-full ">
      <section className="flex-none">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((info, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg flex gap-5 bg-card"
            >
              <div
                className={`min-w-12 min-h-12 max-w-12 max-h-12  rounded-full flex ${info.color} justify-center items-center`}
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

      <section className="h-full ">
        <div className="flex lg:flex-row flex-col h-full gap-4 ">
          <div className="justify-center items-center flex-[2] min-h-[45vh] lg:min-h-[50vh]  bg-card rounded-lg border border-border p-3">
            <div className="flex justify-between">
              <p>Events Created</p>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-1.5 max-[479px]:h-8">
                    <span>
                      <span className="min-[480px]:hidden" aria-hidden="true">
                        Week
                      </span>
                      <span className="max-[479px]:sr-only">Week</span>
                    </span>
                    <ChevronDownIcon
                      className="-me-1 opacity-60"
                      size={16}
                      aria-hidden="true"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-32">
                  <DropdownMenuItem>Month</DropdownMenuItem>
                  <DropdownMenuItem>Week</DropdownMenuItem>
                  <DropdownMenuItem>Day</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

           
            <ResponsiveContainer
              style={{
                paddingRight: "50px",
                paddingTop: "10px",
          
              }}
              width="100%"
              height="80%"
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
                  stroke="#465ef6"
                  strokeWidth={2}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>

             <div className="flex justify-around ml-12 mr-10">
              {/* Stat 1 */}
              <div className="relative flex items-end gap-2">
                <div className="relative">
                  <p className="text-3xl font-semibold">5</p>
                   <div className="absolute -top-2 left-3 lg:-top-1 lg:left-5 flex items-center">
                    <p className="text-[0.6rem] font-semibold text-[#02a92b]">
                      +2.5%
                    </p>
                    <ArrowUpWideNarrow
                      className="w-[0.6rem] h-[0.6rem] ml-[1px]"
                      color="#02a92b"
                    />
                  </div>
                </div>
                <p className="text-xs lg:text-base text-muted-foreground">events created</p>
              </div>

              {/* Stat 2 */}
              <div className="relative flex items-end gap-2">
                <div className="relative">
                  <p className="text-3xl font-semibold">2</p>
                  <div className="absolute -top-2 left-3 lg:-top-1 lg:left-5 flex items-center">
                    <p className="text-[0.6rem] font-semibold text-[#02a92b]">
                      +1.3%
                    </p>
                    <ArrowUpWideNarrow
                      className="w-[0.6rem] h-[0.6rem] ml-[1px]"
                      color="#02a92b"
                    />
                  </div>
                </div>
                <p className="text-xs lg:text-base text-muted-foreground">targets added</p>
              </div>

              {/* Stat 3 */}
              <div className="flex items-end gap-2">
                <p className="text-3xl font-semibold">4</p>
                <p className="text-xs lg:text-base text-muted-foreground">
                  events completed
                </p>
              </div>
            </div>

          </div>

          <div className="justify-center items-center flex-[1] bg-card min-h-[40vh] lg:min-h-[50vh] rounded-lg border border-border p-3">
            <p>Events Status</p>
            <div className="flex flex-col items-center h-full">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart width={100} height={60}>
                  <Pie
                    data={PieChartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
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
              <div className="flex gap-5  ">
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4 bg-blue rounded-full"></div>
                  <p className="text-sm">Accepted</p>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4 bg-green rounded-full"></div>
                  <p className="text-sm">Declined</p>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="w-4 h-4 bg-yellow rounded-full"></div>
                  <p className="text-sm">Pending</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* flex-1 min-h-0 */}
      <section className="lg:max-h-[40vh] ">
        <div className="flex h-full gap-4 flex-col lg:flex-row">
          <div className="w-full bg-card max-h-96 rounded-lg border border-border px-3 overflow-auto">
            <div className="flex pt-3 pb-2 justify-between items-center sticky top-0 bg-card">
              <p>Romantic Events</p>
              <Link href="/romantic-event">
                <span className="text-primary text-base">View all</span>
              </Link>
            </div>
            {EventsLoading ? (
              <div className="animate-pulse text-muted-foreground p-3 text-center">
                Loading...
              </div>
            ) : romanticEvents &&
              Array.isArray(romanticEvents) &&
              romanticEvents.length > 0 ? (
              romanticEvents.map((event, index) => (
                <EventMiniCard key={index} event={event} />
              ))
            ) : (
              <p className="text-muted-foreground p-3 text-center">
                No events found
              </p>
            )}
          </div>

          <div className="w-full bg-card max-h-96 rounded-lg border border-border px-3 overflow-auto">
            <div className="flex pt-3 pb-2 justify-between items-center sticky top-0 bg-card">
              <p>Simp targets</p>
              <Link href="/simp-target">
                <span className="text-primary text-base">View all</span>
              </Link>
            </div>

            {targetsLoading ? (
              <div className="animate-pulse text-muted-foreground p-3 text-center">
                Loading...
              </div>
            ) : targets && Array.isArray(targets) && targets.length > 0 ? (
              targets.map((target, index) => (
                <SimpTargetMiniCard key={index} target={target} />
              ))
            ) : (
              <p className="text-muted-foreground p-3 text-center">
                No targets found
              </p>
            )}
          </div>
        </div>
      </section>
    </section>
  );
}
