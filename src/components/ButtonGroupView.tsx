import React, { memo, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { deleteNodeCall } from '../service/deleteFunctions';
import { apiUrl } from '../service/idGenerateFunctions';
import { getNodeData } from '../service/getData';



export default memo((id: any) => {
    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [nodeId, setNodeId] = useState('');
    const [intent, setIntent] = useState('');
    const [isSelected, setIsSelected] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const nodeData = await getNodeData();
                // console.log("child data ------> ", nodeData)
                const desiredNodeId = id.id;
                const nodeIntent = nodeData.nodes.find((node: { node_id: any; }) => node.node_id === desiredNodeId);

                if (nodeIntent) {
                    setIntent(nodeIntent.intent);
                } else {
                }

            } catch (error) {
                console.error("Error fetching node data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        setNodeId(id.id)
    }, [nodeId])

    // node intent input
    const handleIntentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntent(event.target.value);
    };

    const saveNode = async () => {
        try {
            // console.log("intent : ", intent, id.id)
            const response = await fetch(`${apiUrl}/data-flow-button-group`, {   //group api call
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id.id, intent: intent }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete node');
            }
            console.log("button group save node : ", response)
        } catch (error) {

        }
    };


    // const toggleSelection = () => {
    //     setIsSelected(!isSelected);
    //     localStorage.setItem('selectedEnglishButtonID', id.id);
    // };
    const toggleSelection = () => {
        if (isSelected) {
          localStorage.removeItem('selectedEnglishButtonID');
        //   setEnglishButtonID(null);
        } else {
          localStorage.setItem('selectedEnglishButtonID', id.id);
        //   setEnglishButtonID(id.id);
        }
        setIsSelected(!isSelected);
      };
    // console.log("selected : ", isSelected)

    const deleteNode = async () => {
        deleteNodeCall(nodeId, "buttonGroup", setNodes, setEdges)
    };




    return (
        <>
            <div className='elementWrap'>
                {/* gradient */}
                <div className="wrapper elementWrap" style={{ borderRadius: '10px' }}>
                    <div className='topBarGroup'>
                        <input type="checkbox" checked={isSelected} onChange={toggleSelection} className="select-checkbox" />
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                                <IoClose style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                    </div>
                    {/* <div className="inner" style={{ height: '150px' }}>

                        <div style={{ display: 'flex', flexDirection: 'row', padding: '0px 20px', alignItems: 'end' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Add Intent</label>
                                <input
                                    type="text"
                                    value={intent || ''}
                                    onChange={handleIntentChange}
                                    className="nodrag cardInput"
                                />
                            </div>
                            <button onClick={saveNode} className='saveButton' style={{ marginLeft: '10px' }}>Save</button>
                        </div>
                    </div> */}
                    <div style={{ height: '100px', backgroundColor: '#E9F1FF', margin: '10px', marginTop: '0px', padding: '10px', borderRadius: '4px', boxShadow: '0 1px 10px rgba(0, 0, 0, 0.103) !important' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 20px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label>Add Intent</label>
                                <input
                                    type="text"
                                    value={intent || ''}
                                    onChange={handleIntentChange}
                                    className="nodrag  cardInput"
                                />
                            </div>
                            <button onClick={saveNode} className='saveButton' style={{ marginLeft: '10px', marginTop: '10px' }}>Save</button>
                        </div>
                    </div>


                </div>


            </div>
            <Handle type="target" position={Position.Top} />
            {/* <Handle type="source" position={Position.Bottom} /> */}
        </>
    );
});
