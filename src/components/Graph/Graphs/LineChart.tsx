import ReactApexChart from "react-apexcharts";

interface LineChartProps {
  colors: string[];
  xAxisLabel: string[];
  seriesData: {
    name: string;
    data: number[];
  }[];
  type?: "line"
  | "area"
  | "bar"
  | "pie"
  | "donut"
  | "radialBar"
  | "scatter"
  | "bubble"
  | "heatmap"
  | "treemap"
  | "boxPlot"
  | "candlestick"
  | "radar"
  | "polarArea"
  | "rangeBar",
}
export const LineChart = ({ colors, seriesData, xAxisLabel,type }: LineChartProps) => {
  const option2 = {
    series: seriesData,
  };

  return (
    <div className="h-full  pt-5 pb-3" id="chart apexOuter">
      <ReactApexChart
        style={{
          display: "block",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          outerHeight:"100%"
        }}
        options={{
          chart: {
            id: "chart",
            toolbar: {
              show: false,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
                selection: false,
                zoom: false,
                zoomin: false,
                zoomout: false,
                pan: false,
                reset: false,
                customIcons: [],
              },
            },
          },
          xaxis: {
            categories: xAxisLabel,
            axisTicks: {
              show: false,
          },
          axisBorder:{
            show: true
          }
          },
          
          grid:{
            yaxis: {
              lines: {
                show: false, // Show horizontal grid lines
              }
            },
            xaxis: {
              lines: {
                show: true, // Show vertical grid lines
              }},
              row: {
                opacity: 0.5, 
              },
            
          },
          stroke: {
            curve: "smooth",
            lineCap: "round",
            colors: colors,
            width: 2,
          },
          legend: {
            show: false,
            position: "top",
          },
        }}
        fill={colors}
        width={"100%"}
        height={300}
        series={option2.series}
        type={type}
      />
    </div>
  );
};


export const LineChart2 = ({ colors, seriesData, xAxisLabel,type }: LineChartProps) => {
  const option2 = {
    series: seriesData,
  };

  return (
    <div className="h-full pt-5 pb-3" id="chart apexOuter">
      <ReactApexChart
        style={{
          display: "block",
          justifyContent: "center",
          marginLeft: "auto",
          marginRight: "auto",
          outerHeight:"100%"
        }}
        options={{
          chart: {
            id: "chart",
            toolbar: {
              show: false,
            },
            type: "area",
            sparkline: {
              enabled: true
            }
          },
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 0.7,
              opacityTo: 0.9,
              stops: [0, 90, 100]
            }
          },
          xaxis: {
            categories: xAxisLabel,
            axisBorder: {
              show: true, 
            },
            
            axisTicks: {
              show: false,
          },
            labels: {
              show: false, 
            },
             // Hide tick marks on the x-axis
          },
          yaxis: {
            show: false, // Hide y-axis
            labels: {
              show: false, // Hide y-axis labels
            },
          },
          grid: {
            show: false, // Hide grid lines
          },
          stroke: {
            curve: "smooth",
            lineCap: "round",
            colors: colors,
            width: 2,
            
          },
          legend: {
            show: false,
            position: "top",
          },
        }}
        
        
        fill={colors}
        width={"100%"}
        height={200}
        series={option2.series}
        type={type}
      />
    </div>
  );
};
