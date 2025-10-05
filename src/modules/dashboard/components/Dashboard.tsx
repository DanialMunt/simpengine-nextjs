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

  const data = [
    { date: "2025-09-28", eventsCreated: 3 },
    { date: "2025-09-29", eventsCreated: 5 },
    { date: "2025-09-30", eventsCreated: 4 },
    { date: "2025-10-01", eventsCreated: 8 },
  ];

  return (
    <section className="flex flex-col gap-4 h-full min-h-0 flex-grow">
      <section className="flex-none">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((info, index) => (
            <div
              key={index}
              className="p-4 border border-border rounded-lg flex gap-2 bg-background"
            >
              <div
                className={`w-12 h-12 rounded-full flex ${info.color} justify-center items-center`}
              >
                {info.img}
              </div>
              <div className="flex flex-col gap-1">
                <h2 className="text-md ">{info.name}</h2>
                <p className="text-xl font-semibold ">{info.num}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex-1 min-h-0">
        <div className="flex h-full gap-4 ">
          <div className=" w-2/3 bg-background rounded-lg border border-border p-3">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tick={{
                    fontSize: 13,
                    fontFamily: "Times New Roman",
                    
                    
                  }}
                 
                />
                <YAxis 
                 tick={{
                    fontSize: 13,
                    fontFamily: "Times New Roman",
                    
                    
                  }}
                 
                 />
                <Tooltip />
                {/* <Legend style={{
                    fontSize: 10,
                    fontFamily: "Times New Roman",
                }}
                 /> */}
                <Line
                  type="monotone"
                  dataKey="eventsCreated"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="w-1/3 bg-background">Other charts</div>
        </div>
      </section>

      <section className="flex-1 min-h-0">
        <div className="flex h-full gap-4 ">
          <div className="w-full bg-background rounded-lg border border-border p-3">
            Upcoming Events
          </div>
          <div className="w-full bg-background rounded-lg border border-border p-3">
            Simp targets
          </div>
        </div>
      </section>
    </section>
  );
}
