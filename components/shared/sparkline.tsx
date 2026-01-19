import Svg, { Polyline } from "react-native-svg";

export function Sparkline({
  data,
  up,
}: {
  data: number[];
  up: boolean;
}) {
  if (!data || data.length < 2) return null;

  const max = Math.max(...data);
  const min = Math.min(...data);

  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * 90;
      const y = 40 - ((v - min) / (max - min || 1)) * 40;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Svg width={90} height={40}>
      <Polyline
        points={points}
        fill="none"
        stroke={up ? "#22C55E" : "#EF4444"}
        strokeWidth={2}
      />
    </Svg>
  );
}
