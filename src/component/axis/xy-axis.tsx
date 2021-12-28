import Axis from "./axis";

interface Props {
  xScale: any;
  yScale: any;
  height: any;
  ticks: any;
  t: any;
}

const XYAxis = (props: Props) => {
  const xSettings = {
    scale: props.xScale,
    orient: "bottom",
    transform: `translate(0, ${props.height})`,
    t: props.t,
  };
  const ySettings = {
    scale: props.yScale,
    orient: "left",
    transform: "translate(0, 0)",
    ticks: props.ticks,
    t: props.t,
  };
  return (
    <g className="axis-group">
      <Axis {...xSettings} />
      <Axis {...ySettings} />
    </g>
  );
};

export default XYAxis;
