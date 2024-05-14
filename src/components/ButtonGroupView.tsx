import React, { memo, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from '../service/deleteFunctions';
import { apiUrl } from '../service/idGenerateFunctions';



export default memo((id: any) => {
    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [nodeId, setNodeId] = useState('');
    const [intent, setIntent] = useState('');


    useEffect(() => {
        setNodeId(id.id)
    }, [nodeId])

    // node intent input
    const handleIntentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntent(event.target.value);
    };

    const saveNode = async () => {
        try {
            console.log("intent : ", intent, id.id)
            // const response = await fetch(`${apiUrl}/data-flow-text-box`, {   //group api call
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ id: id, intent: intent }),
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to delete node');
            // }
            // console.log("title , description : ", response)
        } catch (error) {

        }
    };

    const deleteNode = async () => {
        deleteNodeCall(nodeId, "buttonGroup", setNodes, setEdges)
    };




    return (
        <>
            <div className='elementWrap'>
                {/* gradient */}
                <div className="wrapper groupColor elementWrap" style={{ borderRadius: '10px' }}>

                    <div className="inner" style={{ height: '150px' }}>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                                <RiCloseCircleFill style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', padding: '0px 20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Add Intent</label>
                                <input
                                    type="text"
                                    value={intent || ''}
                                    onChange={handleIntentChange}
                                    className="nodrag intent_input"
                                />
                            </div>
                            <button onClick={saveNode} className='saveButton' style={{marginLeft: '10px'}}>Save</button>
                        </div>
                    </div>


                </div>


            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
});
