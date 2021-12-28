import * as d3 from "d3";
import React, { Component } from "react";

interface Props {
  scale: any;
  orient: string;
  transform: string;
  ticks?: any;
  t: any;
}
class Axis extends Component<Props> {
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
    const { scale, orient, ticks } = this.props;
    const node = this.myRef.current;
    let axis: any;

    if (orient === "bottom") {
      axis = d3.axisBottom(scale);
    }
    if (orient === "left") {
      axis = d3.axisLeft(scale).ticks(ticks);
    }
    d3.select(node).call(axis);
  }
  updateAxis() {
    const { scale, orient, ticks, t } = this.props;

    if (orient === "left") {
      const axis: any = d3.axisLeft(scale).ticks(ticks);
      d3.selectAll(`.${orient}`).transition(t).call(axis);
    }
  }
  render() {
    const { orient, transform } = this.props;
    return (
      <g ref={this.myRef} transform={transform} className={`${orient} axis`} />
    );
  }
}
export default Axis;
