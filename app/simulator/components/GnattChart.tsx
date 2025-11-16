import { GnattChartProps } from "../utils/type";

const GnattChart = ({ gnatt, scale = 40 }: GnattChartProps) => {
  if (gnatt.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      <h2>Gnatt Chart</h2>
      <div className="flex ">
        {gnatt.map((segment, i) => (
          <div
            key={i}
            className="bg-blue-700 flex flex-col items-center justify-center text-white text-sm font-medium m-0.5 "
            style={{
              width: `${(segment.end - segment.start) * scale}px`,
            }}
          >
            <span>{segment.pid}</span>
            <span>
              {segment.start}-{segment.end}
            </span>
          </div>
        ))}
      </div>
      <div className="flex ">
        {gnatt.map((segment, i) => (
          <div
            key={i}
            style={{
              width: `${(segment.end - segment.start) * scale}px`,
            }}
          >
            {segment.start}ms
          </div>
        ))}
        <div>{gnatt.length > 0 ? gnatt[gnatt.length - 1].end : 0}ms</div>
      </div>
    </div>
  );
};

export default GnattChart;
