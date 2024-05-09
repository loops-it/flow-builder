import React, { memo } from 'react';
import { RiCloseCircleFill } from 'react-icons/ri';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';

export default memo(({ id, data }) => {
  const { setNodes } = useReactFlow();
  const label = useStore((s) => {
    const node = s.nodeInternals.get(id);

    if (!node) {
      return null;
    }

    return `position x:${parseInt(node.position.x)} y:${parseInt(
      node.position.y,
    )}`;
  });

  const apiUrl = 'https://dfcc-chat-bot.vercel.app';


  const deleteNode = async () => {
    try {
      const response = await fetch(`${apiUrl}/data-flow-delete-node`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({id}),
      });

      if (!response.ok) {
        throw new Error('Failed to delete node');
      }

      setNodes((prevNodes) => {
        const updatedNodes = prevNodes.filter(node => node.id !== id);
        console.log('Updated Node List:', updatedNodes);
        return updatedNodes;
      });
      console.log('Node deleted:', id);
      
    } catch (error) {
      console.error('Error deleting node:', error);
      // Handle error as needed
    }

    
  };

  return (
    <>

      <div className="wrapper plainColor" style={{ overflow: 'visible' }}>
        {/* <div className="inner">{label || 'no node connected'}</div> */}
        <div className="inner" style={{ color: '#333 !important', overflow: 'visible' }}>
          <div style={{ display: 'flex', justifyContent: 'end', position: 'absolute', top: -15, right: -5 }}>
            <button className='nodeCloseButton' onClick={deleteNode}>
              <RiCloseCircleFill style={{ color: '#000 !important', fontSize: '20px !important' }} />
            </button>
          </div>
          <p style={{ color: '#333 !important' }}>
            Start
          </p>
        </div>
      </div>
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});
