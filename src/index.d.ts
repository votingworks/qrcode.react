import * as React from 'react';

interface QRCodeProps {
  value: string | Uint8Array;
  size?: number;
  bgColor?: string;
  fgColor?: string;
  level?: 'L' | 'M' | 'Q' | 'H';
  renderAs?: 'svg' | 'canvas';
}

declare class QRCode extends React.Component<QRCodeProps> {}

export = QRCode;
