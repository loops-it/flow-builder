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
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');

    const [inputs, setInputs] = useState([
        { type: 'text', value: '', placeholder: 'Name' }
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



    const handleInputChange = (index, event) => {
        const values = [...inputs];
        values[index].value = event.target.value;
        setInputs(values);
    };

    const addInput = (type) => {
        setInputs([...inputs, { type, value: '', placeholder: capitalizeFirstLetter(type) }]);
    };

    const capitalizeFirstLetter = (string) => {
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

                            <div style={{ display: 'flex', flexDirection: 'row', position: 'relative', }}>
                                <button onClick={() => addInput('name')} className='addButton' style={{ marginLeft: '10px', marginTop: '10px' }}>Name</button>
                                <button onClick={() => addInput('email')} className='addButton' style={{ marginLeft: '10px', marginTop: '10px' }}>Email</button>
                                <button onClick={() => addInput('text')} className='addButton' style={{ marginLeft: '10px', marginTop: '10px' }}>Contact</button>
                                <button onClick={() => addInput('date')} className='addButton' style={{ marginLeft: '10px', marginTop: '10px' }}>Date</button>
                            </div>
                            {inputs.map((input, index) => (
                                <div key={index} style={{ display: 'flex', flexDirection: 'column', marginBottom: '10px' }}>
                                    <label>{capitalizeFirstLetter(input.placeholder)}</label>
                                    <input
                                        type={input.type}
                                        value={input.value}
                                        onChange={(event) => handleInputChange(index, event)}
                                        className="nodrag cardInput"
                                    />
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
