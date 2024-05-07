import React from 'react';
import { memo, useState } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { Handle, Position, NodeToolbar, useReactFlow } from 'reactflow';

const labelStyle = {
  position: 'absolute' as Position,
  color: '#555',
  bottom: -20,
  fontSize: 12,
  fontFamily: '"Poppins", sans-serif',
};

interface ToolbarNodeProps {
  data: {
    label: string;
  };
}

function ToolbarNode({ data, id }: ToolbarNodeProps) {
  const [title, setTitle] = useState(() => 'Title 1');
  const { setNodes } = useReactFlow();

  const deleteNode = () => {
    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.filter(node => node.id !== id);
      console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });
    console.log('Node deleted:', id);
  };

  return (
    <>
      <div style={{display: 'flex', flexDirection: 'column'}}>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <button className='nodeCloseButton' onClick={deleteNode}>
          <RiCloseCircleFill style={{ color: '#000 !important', fontSize: '20px !important' }} />
        </button>
      </div>
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
      </div>
    </>
  );
}

export default memo(ToolbarNode);
