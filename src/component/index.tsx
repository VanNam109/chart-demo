import * as d3 from "d3";
import React, { Component } from "react";
import XYAxis from "./axis/xy-axis";
import Bar from "./bar";
import Grid from "./gird";
import Line from "./line";

interface Props {}
interface State {
  data: any[];
}
class Chart extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: [
        { name: "React", value: 3000 },
        { name: "VueJS", value: 1000 },
        { name: "Angular", value: 2000 },
        { name: "C#", value: 500 },
        { name: "C++", value: 500 },
        { name: "JavaScrip", value: 600 },
        { name: "Python", value: 800 },
      ],
    };
  }
  // random data display chart
  randomizeData = (e: any) => {
    e.preventDefault();
    const data = this.state.data.map((obj) => ({
      name: obj.name,
      value: Math.floor(Math.random() * 1000 + 1),
    }));
    console.log(data);
    this.setState({ data });
  };
  render() {
    const { data } = this.state;
    const parentWidth = 600;
    const margin = {
      top: 10,
      right: 10,
      bottom: 20,
      left: 40,
    };
    const ticks = 6;
    const t = d3.transition().duration(1000);

    // with height chart
    const width = parentWidth - margin.left - margin.right;
    const height = parentWidth * 0.5 - margin.top - margin.bottom;

    // Bar Chart
    const xScale = d3
      .scaleBand()
      .domain(
        data.map((i: any) => {
          return i.name;
        })
      )
      .range([0, width])
      .padding(0.26);

    const yScale = d3
      .scaleLinear()
      .domain([0, Math.max(...data.map((i: any) => i.value))])
      .range([height, 0])
      .nice();
    // Line Chart
    const xScaleLine = d3
      .scaleBand()
      .domain(data.map((d) => d.name))
      .rangeRound([0, width])
      .padding(0.1);
    const yScaleLine = d3
      .scaleLinear()
      .domain(
        d3.extent(data, (d: any) => {
          return d.value;
        }) as any
      )
      .range([height, 0])
      .nice();
    const lineGenerator = d3
      .line()
      .x((d: any) => xScaleLine(d.name) as any)
      .y((d: any) => yScaleLine(d.value) as number)
      .curve(d3.curveMonotoneX);
    return (
      <div>
        <div>
          <h2>Bar chart example</h2>
          <button onClick={this.randomizeData}>Randomize data</button>
        </div>
        <svg
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Grid {...{ xScale, yScale, width, ticks, t }} />
            <Bar
              {...{
                xScale,
                yScale,
                data,
                height,
                t,
              }}
            />
          </g>
        </svg>
        <h3>Line chart example</h3>
        <svg
          className="lineChartSvg"
          width={width + margin.left + margin.right}
          height={height + margin.top + margin.bottom}
        >
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line
              data={data}
              xScale={xScale}
              yScale={yScale}
              lineGenerator={lineGenerator}
              width={width}
              height={height}
            />
          </g>
        </svg>
      </div>
    );
  }
}
export default Chart;
