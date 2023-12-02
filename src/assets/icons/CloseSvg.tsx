import React from 'react';
import Svg, {Path} from 'react-native-svg';

const CloseSvg: React.FC = ({...props}) => {
  return (
    <Svg width="22" height="22" viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M21 21L1 1"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <Path
        d="M21 1L1 21"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </Svg>
  );
};

export default CloseSvg;
