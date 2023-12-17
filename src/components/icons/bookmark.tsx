import Svg, {Path} from 'react-native-svg';

export const EmptyBookmark = ({
  width = 8,
  height = 12,
  stroke = 'currentColor',
  strokeWidth = 2,
  fill = 'currentColor',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 380 508"
      fill={fill}
      stroke={stroke}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round">
      <Path d="M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z" />
    </Svg>
  );
};

export const Bookmark = ({
  width = 8,
  height = 12,
  stroke = 'currentColor',
  strokeWidth = 2,
  fill = 'currentColor',
}) => {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 380 508"
      fill={fill}
      stroke={stroke}
      stroke-width={strokeWidth}
      stroke-linecap="round"
      stroke-linejoin="round">
      <Path d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z" />
    </Svg>
  );
};
