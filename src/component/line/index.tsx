import { select } from "d3-selection";
import React from "react";
interface Props {
  xScale: any;
  yScale: any;
  height: any;
  width: number;
  data: any;
  t?: any;
  lineGenerator: any;
}
class Line extends React.Component<Props> {
  myRef: React.RefObject<any>;
  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef();
  }
  componentDidMount() {
    const node = this.myRef.current;
    const { data, lineGenerator } = this.props;
    const initialData = data.map((d: any) => ({
      name: d.name,
      value: 0,
    }));

    select(node)
      .append("path")
      .datum(initialData)
      .attr("id", "line")
      .attr("stroke", "red")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("d", lineGenerator);

    this.updateChart();
  }
  componentDidUpdate() {
    this.updateChart();
  }
  updateChart() {
    const { lineGenerator, data, t } = this.props;
    const line = select("#line");
    line.datum(data).transition(t).attr("d", lineGenerator);
  }
  render() {
    return <g className="line-group" ref={this.myRef} />;
  }
}

export default Line;
