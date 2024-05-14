import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow, useNodesState, useEdgesState } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from '../service/deleteFunctions';
import initialNodes from "../data/nodes";
import initialEdges from "../data/edges";


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id, data }) => {
    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [nodeId, setNodeId] = useState('');

    // console.log("data ", data)


    useEffect(() => {
        // console.log("node id : ", nodeId)
        setNodeId(id)
    }, [nodeId])

    // delete node from list
    const deleteNode = async () => {
        // console.log("node id : ", nodeId)
        deleteNodeCall(nodeId, "cardGroup",setNodes, setEdges)
        // console.log("node id : ", nodeId)
        // setNodes((prevNodes) => {
        //     const updatedNodes = prevNodes.filter(node => node.id !== id);
        //     //   console.log('Updated Node List:', updatedNodes);
        //     return updatedNodes;
        // });
        // console.log('Node deleted:', id);
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
