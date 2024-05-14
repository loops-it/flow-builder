import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from '../service/deleteFunctions';


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id, data }) => {
    const { setNodes } = useReactFlow();
    const [nodeId, setNodeId] = useState('');

    console.log("data ", data)

    const apiUrl = 'https://dfcc-chat-bot.vercel.app';

    useEffect(() => {
        console.log("node id : ", nodeId)
    }, [nodeId])

    // delete node from list
    const deleteNode = async () => {
        setNodeId(id)
        console.log("node id : ", nodeId)
        deleteNodeCall(nodeId, "cardGroup")
        console.log("node id : ", nodeId)
        setNodes((prevNodes) => {
            const updatedNodes = prevNodes.filter(node => node.id !== id);
            //   console.log('Updated Node List:', updatedNodes);
            return updatedNodes;
        });
        console.log('Node deleted:', id);
    };



    return (
        <>
            <div className='elementWrap'>
                {/* gradient */}
                <div className="wrapper groupColor elementWrap" style={{ borderRadius: '10px' }}>

                    <div className="inner" style={{ height: '450px', width: '300px' }}>
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
