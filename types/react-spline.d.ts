declare module '@splinetool/react-spline' {
  import * as React from 'react';

  interface SplineProps {
    scene: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onLoad?: (spline: any) => void;
    className?: string;
    style?: React.CSSProperties;
  }

  const Spline: React.FC<SplineProps>;
  export default Spline;
}
