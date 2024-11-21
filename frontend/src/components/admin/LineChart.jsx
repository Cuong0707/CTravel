import Dashboard from "./Dashboard";
import React from "react";
import ReactApexChart from "react-apexcharts";
import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [
        {
          name: "Desktops",
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      options: {
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false,
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "straight",
        },
        title: {
          text: "View Page by Month",
          align: "left",
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
            opacity: 0.5,
          },
        },
        xaxis: {
          categories: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
          ],
        },
      },
    };
  }

  render() {
    return (
      <div className="container mt-4">
        <Box sx={{ display: "flex" }}>
          <Dashboard />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              marginTop: "30px",
            }}
          >
            <Toolbar />
            <div id="chart">
              <ReactApexChart
                options={this.state.options}
                series={this.state.series}
                type="line"
                height={350}
              />
            </div>
          </Box>
        </Box>
      </div>
    );
  }
}
const drawerWidth = 240;
export default LineChart;