import * as d3 from "d3";
import React from "react";

interface Props {
  xScale: any;
  yScale: any;
  width: any;
  ticks: any;
  t?: any;
}
class Grid extends React.Component<Props> {
  myRef: React.RefObject<any>;
  constructor(props: Props) {
    super(props);
    this.myRef = React.createRef();
  }

  componentDidMount() {
    this.renderAxis();
  }
  componentDidUpdate() {
    this.updateAxis();
  }
  renderAxis() {
    const node = this.myRef.current;
    const { yScale, ticks, width } = this.props;
    d3.select(node).call(
      d3
        .axisLeft(yScale)
        .ticks(ticks)
        .tickSize(-width)
        .tickFormat(() => {
          return "";
        })
    );
  }
  updateAxis() {
    const { t } = this.props;
    const { yScale, ticks, width } = this.props;
    const node = this.myRef.current;
    d3.select(node)
      .transition(t)
      .call(
        d3
          .axisLeft(yScale)
          .ticks(ticks)
          .tickSize(-width)
          .tickFormat(() => {
            return "";
          })
      );
  }
  render() {
    return <g ref={this.myRef} className="grid-group" />;
  }
}

export default Grid;
