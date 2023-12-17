import Svg, {Path} from 'react-native-svg';

export const Bookmark = ({
  width = 24,
  height = 24,
  stroke = 'currentColor',
  strokeWidth = 2,
  fill = 'none',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill={fill}
      stroke={stroke}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round">
      <Path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
    </Svg>
  );
};
