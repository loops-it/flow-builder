import React, { memo } from 'react';
import { Handle, useStore, Position } from 'reactflow';

export default memo(({ id }) => {
  const label = useStore((s) => {
    const node = s.nodeInternals.get(id);

    if (!node) {
      return null;
    }

    return `position x:${parseInt(node.position.x)} y:${parseInt(
      node.position.y,
    )}`;
  });

  return (
    <>
      <div className="wrapper plainColor">
        {/* <div className="inner">{label || 'no node connected'}</div> */}
        <div className="inner">Start</div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});
