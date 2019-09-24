import * as React from 'react';

export interface ImageSettings {
  src: string;
  height: number;
  width: number;
  excavate: boolean;
  x?: number;
  y?: number;
}

export interface QRCodeProps {
  value: string | Uint8Array;
  size?: number;
  level?: 'L' | 'M' | 'Q' | 'H';
  bgColor?: string;
  fgColor?: string;
  style?: React.CSSProperties;
  includeMargin?: boolean;
  imageSettings?: ImageSettings;
  renderAs?: 'svg' | 'canvas';
}

declare class QRCode extends React.Component<QRCodeProps> {}

export = QRCode;
