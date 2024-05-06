import React from 'react';
import { memo, useState } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';

const labelStyle = {
  position: 'absolute',
  color: '#555',
  bottom: -20,
  fontSize: 12,
  fontFamily: '"Poppins", sans-serif',
};

function ToolbarNode({ data }) {
  const [title, setTitle] = useState(() => 'Title 1');

  return (
    <>
      <NodeToolbar isVisible>
        <button className='toolbarButton' onClick={() => setTitle('Title 1')}>Title 1</button>
        <button className='toolbarButton' onClick={() => setTitle('Title 2')}>Title 2</button>
        <button className='toolbarButton' onClick={() => setTitle('Title 3')}>Title 3</button>
      </NodeToolbar>
      <div style={{ padding: '30px 20px', minWidth: '150px' }}>
        <div>{title}</div>
      </div>
      <Handle type="target" position={Position.Left} />
      <Handle type="source" position={Position.Right} />

      <div style={labelStyle}>{data.label}</div>
    </>
  );
}

export default memo(ToolbarNode);
