import * as d3 from "d3";
import React, { Component } from "react";
interface Props {
  xScale: any;
  yScale: any;
  height: any;
  data: any;
  t: any;
}
class Bar extends Component<Props> {
  myRef: React.RefObject<any>;
  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    this.init();
  }
  componentDidUpdate() {
    this.barTransition();
  }
  barTransition() {
    const node = this.myRef.current;
    const { yScale, height, data, t } = this.props;

    d3.select(node)
      .selectAll(".bar")
      .data(data)
      .transition(t)
      .attr("y", (i: any) => {
        return yScale(i.value);
      })
      .attr("height", (i: any) => {
        return height - yScale(i.value);
      })
      .attr("fill", "tomato");
  }
  init() {
    const { xScale, data, height } = this.props;
    const node = this.myRef.current;
    // prepare initial data from where transition starts.
    const initialData = data.map((obj: any) => ({
      name: obj.name,
      value: 0,
    }));
    // prepare the field
    const bar = d3.select(node).selectAll(".bar").data(initialData);
    // add rect to svg
    bar
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", (i: any) => {
        return xScale(i.name) || 0;
      })
      .attr("y", height)
      .attr("width", xScale.bandwidth());
    this.barTransition();
  }
  render() {
    return <g className="bar-group" ref={this.myRef} />;
  }
}
export default Bar;
