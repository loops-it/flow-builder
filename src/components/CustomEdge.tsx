import React from 'react';
import { EdgeText } from 'reactflow';
 
export function CustomEdgeLabel({ label }) {
  return (
    <EdgeText
      x={100}
      y={100}
      label={label}
      labelStyle={{ fill: 'white' }}
      labelShowBg
      labelBgStyle={{ fill: 'red' }}
      labelBgPadding={[2, 4]}
      labelBgBorderRadius={2}
    />
  );
}