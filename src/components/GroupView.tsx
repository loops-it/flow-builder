import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow, useEdgesState, useNodesState } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from '../service/deleteFunctions';
import { getNodeData, loadDataOnMount } from '../service/getData';


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id }) => {
    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [nodeId, setNodeId] = useState('');



    useEffect(() => {
        console.log("node id : ", nodeId)
        setNodeId(id)
    }, [nodeId])


    // delete node from list
    const deleteNode = async () => {
      deleteNodeCall(nodeId, "buttonGroup", setNodes, setEdges)
      console.log("node id : ", nodeId)
        //   setNodes((prevNodes) => {
        //     const updatedNodes = prevNodes.filter(node => node.id !== id);
        //     return updatedNodes;
        //   });
  };




    return (
        <>
            <div className='elementWrap'>
                {/* gradient */}
                <div className="wrapper groupColor elementWrap" style={{ borderRadius: '10px'}}>

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
