import { useEffect, useState } from "react";

import API from "../api/axios";

import DashboardCard from "../components/DashboardCard";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  const [stats, setStats] =
    useState(null);

  useEffect(() => {
    const getStats = async () => {
      try {
        const { data } =
          await API.get(
            "/dashboard/stats"
          );

        setStats(data);
      } catch (error) {
        console.log(error);
      }
    };

    getStats();
  }, []);

  if (!stats) {
    return (
      <div
        className="
        flex
        justify-center
        items-center
        h-screen
        text-xl
        "
      >
        Loading Dashboard...
      </div>
    );
  }

  const chartData = [
    {
      name: "Todo",
      value: stats.todoTasks,
    },
    {
      name: "In Progress",
      value:
        stats.inProgressTasks,
    },
    {
      name: "Done",
      value: stats.doneTasks,
    },
  ];

  const COLORS = [
    "#6366F1",
    "#F59E0B",
    "#22C55E",
  ];

  return (
    <div>

      {/* Header */}

      <div
        className="
        mb-8
        "
      >
        <h1
          className="
          text-3xl
          font-bold
          text-white
          "
        >
          Dashboard
        </h1>

        <p
          className="
          text-slate-400
          mt-2
          "
        >
          Monitor project
          progress and tasks
        </p>
      </div>

      {/* Cards */}

      <div
        className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-5
        gap-5
        "
      >
        <DashboardCard
          title="Total Tasks"
          value={
            stats.totalTasks
          }
        />

        <DashboardCard
          title="Todo"
          value={
            stats.todoTasks
          }
        />

        <DashboardCard
          title="In Progress"
          value={
            stats.inProgressTasks
          }
        />

        <DashboardCard
          title="Done"
          value={
            stats.doneTasks
          }
        />

        <DashboardCard
          title="Overdue"
          value={
            stats.overdueTasks
          }
        />
      </div>

      {/* Chart Section */}

      <div
        className="
        mt-10
        grid
        lg:grid-cols-2
        gap-6
        "
      >

        {/* Pie Chart */}

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-xl
          p-6
          "
        >
          <h2
            className="
            text-xl
            font-semibold
            mb-5
            "
          >
            Task Status
          </h2>

          <div
            className="
            h-80
            "
          >
            <ResponsiveContainer
              width="100%"
              height="100%"
            >
              <PieChart>

                <Pie
                  data={
                    chartData
                  }
                  dataKey="value"
                  nameKey="name"
                  outerRadius={
                    120
                  }
                  label
                >
                  {chartData.map(
                    (
                      entry,
                      index
                    ) => (
                      <Cell
                        key={
                          index
                        }
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Tasks Per User */}

        <div
          className="
          bg-slate-900
          border
          border-slate-800
          rounded-xl
          p-6
          "
        >
          <h2
            className="
            text-xl
            font-semibold
            mb-5
            "
          >
            Tasks Per User
          </h2>

          <div
            className="
            space-y-4
            "
          >
            {stats.tasksPerUser?.map(
              (
                user,
                index
              ) => (
                <div
                  key={
                    index
                  }
                  className="
                  bg-slate-800
                  p-4
                  rounded-lg
                  flex
                  justify-between
                  items-center
                  "
                >
                  <div>
                    <h3
                      className="
                      font-medium
                      "
                    >
                      {
                        user.userName
                      }
                    </h3>

                    <p
                      className="
                      text-sm
                      text-slate-400
                      "
                    >
                      {
                        user.email
                      }
                    </p>
                  </div>

                  <span
                    className="
                    bg-indigo-600
                    px-3
                    py-1
                    rounded-lg
                    "
                  >
                    {
                      user.totalTasks
                    }{" "}
                    Tasks
                  </span>
                </div>
              )
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;