import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

import logoImage from "../assets/images/logo_mobile.png";
import rocketImage from "../assets/images/rocket.png";

import ratioIcon from "../assets/icons/ratio.svg";
import oridnals from "../assets/icons/ordinals.svg";
import ExchangeIcon from "../assets/icons/ExchangeIcon";
import LinkIcon from "../assets/icons/LinkIcon";
import SwapIcon from "../assets/icons/SwapIcon";
import PoolIcon from "../assets/icons/PoolIcon";
import NFTIcon from "../assets/icons/NFTIcon";
import { Link } from "react-router-dom";
import { dayilyData } from "../utils/chartdata";
import { formatTime } from "../utils/constants";
import useGetURL from "../hooks/useGetChartData";
import useGetChartData from "../hooks/useGetChartData";
import Modal from "../components/Modal";
import LPIcon from "../assets/icons/LPIcon";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip
);
const options = {
  responsive: true,
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
};
const periods = ["DAY", "WEEK", "MONTH", "YEAR"];

const labels = ["January", "February", "March", "April", "May", "June", "July"];
const defaultData = {
  labels,
  datasets: [
    {
      data: [0, 0, 0, 0, 0, 0, 0],
      borderColor: "#efe9e010",
      fill: "start",
      backgroundColor: (context) => {
        const ctx = context.chart.ctx;
        const gradient = ctx.createLinearGradient(0, 0, 0, 400);
        gradient.addColorStop(0, "#efe9e0");
        gradient.addColorStop(1, "#141414");
        return gradient;
      },
      lineTension: 1,
    },
  ],
};

function Dashboard() {
  const [period, setPeriod] = useState(0);
  const [chartData] = useGetChartData();

  const [reactChartData, setReactChartData] = useState(defaultData);

  const [currentPrice, setCurrentPrice] = useState("$0.00");
  const [percent, setPercent] = useState("0.00%");
  const [negativePercent, setNegativePercent] = useState(false);
  useEffect(() => {
    if (!chartData) return;
    const labels = chartData[period].map((row) => formatTime(row[0]));
    const data = {
      labels,
      datasets: [
        {
          data: chartData[period].map((row) => row[1]),
          borderColor: "#efe9e010",
          fill: "start",
          backgroundColor: (context) => {
            const ctx = context.chart.ctx;
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, "#efe9e0");
            gradient.addColorStop(1, "#141414");
            return gradient;
          },
          lineTension: 0.4,
          pointRadius: 1,
        },
      ],
    };
    setReactChartData(data);
    const current = chartData[0].slice(-1)[0][1].toFixed(2);
    const start = chartData[period][0][1].toFixed(2);
    const pro = (100 * (current - start)) / start;
    setCurrentPrice("$" + current);
    const negative = pro >= 0 ? "+" : "";
    setNegativePercent(pro < 0);
    setPercent(negative + pro.toFixed(2) + "%");
  }, [chartData, period]);
  return (
    <section className="dashboard__container">
      <img src={logoImage} width={50} alt="Logo" />
      <h3>Ordiswap</h3>
      <p>Ordiswap brings dynamic AMM infrastructure to BRC-20</p>

      <section className="content">
        <article className="content__detail glass-effect">
          <header>
            <div className="left"></div>

            <div className="btn-group btn-group-vertical lg:btn-group-horizontal bg-white p-1 ">
              {periods.map((item, index) => (
                <button
                  className={`bg-white btn ${index == period && "btn-active"}`}
                  key={item}
                  onClick={() => {
                    setPeriod(index);
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </header>

          <div className="absolute top-[15px] ml-[15px] text-left">
            <h3 className="!text-[14px] font-medium">Ordinals</h3>
            {negativePercent && (
              <>
                <div className="text-[20px] text-[#D74136] font-medium">
                  {currentPrice}
                </div>
                <div className="text-[15px] text-[#D74136]">{percent}</div>
              </>
            )}
            {!negativePercent && (
              <>
                <div className="text-[20px] text-[#D74136] font-medium">
                  {currentPrice}
                </div>
                <div className="text-[15px] text-[#3BDC68]">{percent}</div>
              </>
            )}
          </div>

          <Line options={options} data={reactChartData} />
        </article>

        <article className="content__info mt-[20px] xl:mt-0">
          <section className="glass-effect">
            <h3 className="!text-[16px]">Ordinals</h3>
            <p className="!text-[14px]">
              This gives anyone the ability to create a market by depositing
              their crypto assets into a liquidity pool.
            </p>
          </section>
          <div className="flex gap-5 flex-wrap mt-5">
            <Link to="/swap">
              <button className="btn">Swap</button>
            </Link>
            <Link to="/liquidity">
              <button className="btn">Liquidity</button>
            </Link>
            <Link to="/pool">
              <button className="btn">Pool</button>
            </Link>
          </div>
        </article>
      </section>
    </section>
  );
}

export default Dashboard;
