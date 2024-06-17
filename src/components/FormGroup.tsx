import React, { memo, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { deleteNodeCall } from '../service/deleteFunctions';
import { apiUrl, formElementId } from '../service/idGenerateFunctions';
import { getNodeData } from '../service/getData';



export default memo((id: any) => {
    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [nodeId, setNodeId] = useState('');
    const [name, setName] = useState('');

    const [field, setField] = useState('');
    const [intent, setIntent] = useState('');

    const [inputs, setInputs] = useState([
        { id: formElementId(), type: 'text', value: '', placeholder: 'text' }
    ]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const nodeData = await getNodeData();
                const desiredNodeId = id.id;
                const nodeIntent = nodeData.nodes.find((node: { node_id: any; }) => node.node_id === desiredNodeId);

                if (nodeIntent) {
                    setName(nodeIntent.intent);
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


    const saveNode = async () => {
        try {
            const response = await fetch(`${apiUrl}/data-flow-button-group`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id.id, name: name }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete node');
            }
            console.log("button group save node : ", response)
        } catch (error) {

        }
    };


    const deleteNode = async () => {
        deleteNodeCall(nodeId, "formGroup", setNodes, setEdges)
    };



    const handleInputChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
        const values = [...inputs];
        values[index].value = event.target.value;
        setInputs(values);
    };

    const handleIntentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntent(event.target.value);
    };

    const handleLabelChange = (index: string | number, event: { target: { value: any; }; }) => {
        const values = [...inputs];
        values[index].label = event.target.value;
        setInputs(values);
    };

    const addInput = (type: string) => {
        setInputs([...inputs, { id: formElementId(), type, value: '', placeholder: capitalizeFirstLetter(type), label: capitalizeFirstLetter(type) }]);
    };

    const capitalizeFirstLetter = (string: string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    };


    console.log("inputs in form : ", inputs, id.id)
    return (
        <>
            <div className='elementWrap'>
                {/* gradient */}
                <div className="wrapper elementWrap" style={{ borderRadius: '10px' }}>

                    <div style={{ height: 'max-content', minHeight: '250px', backgroundColor: '#E9F1FF', margin: '10px', marginTop: '0px', padding: '10px', borderRadius: '4px', boxShadow: '0 1px 10px rgba(0, 0, 0, 0.103) !important' }}>
                        <div className='topBarGroup'>
                            <div></div>
                            <div style={{ display: 'flex', justifyContent: 'end' }}>
                                <button className='nodeCloseButton' onClick={deleteNode}>
                                    <IoClose style={{ color: '#000 !important', fontSize: '20px !important' }} />
                                </button>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', padding: '0px 20px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
                                <button onClick={() => addInput('text')} className='addButton' style={{ marginLeft: '10px', marginTop: '10px' }}>Text Field</button>
                                <button onClick={() => addInput('message')} className='addButton' style={{ marginLeft: '10px', marginTop: '10px' }}>TextArea</button>
                                <button onClick={() => addInput('date')} className='addButton' style={{ marginLeft: '10px', marginTop: '10px' }}>Date</button>
                            </div>

                            <div style={{display: 'flex', flexDirection: 'column'}}>
                            <label>Intent</label>
                        <input
                            type="text"
                            value={intent || ''}
                            onChange={handleIntentChange}
                            className="nodrag cardInput"
                        />
                            </div>
                            
                            {inputs.map((input, index) => (
                                <div key={input.id} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                    <label>
                                        <input
                                            type="text"
                                            className="nodrag cardInput"
                                            value={input.label}
                                            onChange={(event) => handleLabelChange(index, event)}
                                            placeholder="Label"
                                            style={{ marginBottom: "0px",
                                                paddingBottom: "5px",
                                                outline: "none", backgroundColor: 'transparent' }}
                                        />
                                    </label>
                                    {input.type === 'message' ? (
                                        <textarea
                                            value={input.value}
                                            onChange={(event) => handleInputChange(index, event)}
                                            className="nodrag cardInput"
                                            placeholder={input.placeholder}
                                        />
                                    ) : (
                                        <input
                                            type={input.type}
                                            value={input.value}
                                            onChange={(event) => handleInputChange(index, event)}
                                            className="nodrag cardInput"
                                            placeholder={input.placeholder}
                                        />
                                    )}
                                </div>
                            ))}
                            <button onClick={saveNode} className='saveButton' style={{ marginLeft: '10px', marginTop: '10px' }}>Save</button>
                        </div>
                    </div>


                </div>


            </div>
            <Handle type="target" position={Position.Top} />
        </>
    );
});
