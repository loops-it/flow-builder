import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id }) => {
    const { setNodes } = useReactFlow();

    const apiUrl = 'https://dfcc-chat-bot.vercel.app';


    // delete node from list
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
            <div className='elementWrap'>
                {/* gradient */}
                <div className="wrapper plainColor elementWrap" style={{ borderRadius: '10px'}}>

                    <div className="inner" style={{height: '100px'}}>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                                <RiCloseCircleFill style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                    </div>


                </div>


            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
});
