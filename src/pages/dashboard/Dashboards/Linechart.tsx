import styled from "@emotion/styled";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  ChartData,
  ChartOptions,
  Filler,
  ScriptableContext,
} from "chart.js";
import { useState } from "react";
import { Line as BaseLine } from "react-chartjs-2";
import { colors } from "style/theme";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

function LineChart() {
  const options = {
    responsive: false,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        grid: {
          color: "#3B4758",
        },
      },
    },
  } as ChartOptions<"line">;

  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July"],
    datasets: [
      {
        data: [33, 53, 85, 41, 44, 65, 77],
        fill: "start",
        borderColor: colors.pointColorPurple,
        backgroundColor: (context: ScriptableContext<"line">) => {
          const ctx = context.chart.ctx;
          const gradient = ctx.createLinearGradient(0, 0, 0, 380);
          gradient.addColorStop(0, "rgba(177, 66, 245, 0.60)");
          gradient.addColorStop(1, "rgba(29, 35, 44, 0)");
          return gradient;
        },
        tension: 0.35,
      },
    ],
  } as ChartData<"line", number[], string>;

  const chartDateFilterlist = [
    { key: "Today", label: "Today" },
    { key: "1d", label: "1d" },
    { key: "7d", label: "7d" },
    { key: "1m", label: "1m" },
    { key: "1y", label: "1y" },
  ];

  const [selectedDateFilter, setSelectedDateFilter] = useState(chartDateFilterlist[0].key);

  return (
    <LineChartBox>
      <LineChartHeader>
        <h3>총 접수건</h3>

        <fieldset>
          {chartDateFilterlist.map(({ key, label }) => (
            <button
              key={label}
              className={key === selectedDateFilter ? "active" : ""}
              onClick={() => {
                setSelectedDateFilter(key);
              }}
            >
              {label}
            </button>
          ))}
        </fieldset>
      </LineChartHeader>
      <Line options={options} data={data} width={976} height={268} />
    </LineChartBox>
  );
}

const LineChartBox = styled.div`
  width: 1000px;
  height: 410px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.indigo};
  padding: 24px;
  overflow: hidden;
  border-radius: 12px;
  position: relative;
`;
const LineChartHeader = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  & h3 {
    color: #eef0f4;
    font-size: 16px;
    font-family: Roboto;
    font-weight: 700;
    word-wrap: break-word;
  }

  & fieldset {
    display: flex;
    gap: 36px;
    border: none;

    & button {
      color: #eef0f4;
      font-size: 14px;
      font-family: Roboto;
      font-weight: 400;
      word-wrap: break-word;
      transition: all ease-in-out 0.3s;

      &.active {
        color: #319dff;
      }
    }
  }
`;

const Line = styled(BaseLine)`
  margin-top: 44px;
`;

export default LineChart;
