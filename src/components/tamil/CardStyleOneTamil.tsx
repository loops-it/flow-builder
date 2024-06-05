import React, { memo, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { getSinhalaNodeData } from '../../service/getData';
import { apiUrl } from '../../service/idGenerateFunctions';
import { deleteNodeCall, deleteNodeCallTamil } from '../../service/deleteFunctions';



export default memo((id: any) => {
    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [nodeId, setNodeId] = useState('');
    const [intent, setIntent] = useState('');
    // const [nodeType, setType] = useState('card');

    const [formData, setFormData] = useState({
        id: id.id,
        title: '',
        description: '',
        image: null,
        intent: '',
        type: 'card',
    });


    useEffect(() => {
        const fetchData = async () => {
            try {
                const nodeData = await getSinhalaNodeData();


                const desiredNodeId = id.id;
                const node = nodeData.cardData.find((node: { node_id: any; }) => node.node_id === desiredNodeId);
                const nodeIntent = nodeData.nodes.find((node: { node_id: any; }) => node.node_id === desiredNodeId);
                if (node) {
                    setTitle(node.title);
                    setDescription(node.description);
                    setImage(node.image);
                    setIntent(nodeIntent.intent);
                    setFormData({
                        id: id.id,
                        title: node.title,
                        description: node.description,
                        image: node.image,
                        intent: nodeIntent.intent,
                        type: 'card',
                    });
                } else {
                    console.log("Node not found");
                }

            } catch (error) {
                console.error("Error fetching node data:", error);
            }
        };

        fetchData();
    }, []);

    // node intent input
    const handleIntentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIntent(event.target.value);
    };

    // node title input
    const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    };

    // node text area input
    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
    };


    // handle image upload
    const handleImageChange = (event: { target: { files: any[]; }; }) => {
        const file = event.target.files[0];
        console.log('Selected File:', file);
        setImage(file);
    };

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value,
        }));
    };


    // add data from node to node list
    const saveNode = async () => {
        try {
            

            const response = await fetch(`${apiUrl}/data-flow-card-data`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to delete node');
            }

            console.log("card style one response : ", response)

        } catch (error) {
            console.error('Error saving node:', error);
        }
    };


    useEffect(() => {
        setNodeId(id.id)
    }, [nodeId])


    // delete node from list
    const deleteNode = async () => {
        deleteNodeCallTamil(nodeId, "cardStyleOne", setNodes, setEdges)
    };




    return (
        <>
            <div className='elementWrap' style={{ zIndex: '99998 !important' }}>
                {/* gradient */}
                <div className="wrapper plainColor  elementWrap" style={{ borderRadius: '10px', margin: '10px' }}>

                    <div className="inner" style={{ display: 'flex', flexDirection: 'column', padding: '10px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                                <RiCloseCircleFill style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <img src='/images/Slide 06.png' alt="Uploaded Image" style={{ width: '150px', marginBottom: '8px' }} />
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center'
                            }}>
                                <label style={{ marginTop: '8px' }}>Image</label>
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    className="nodrag"
                                />
                            </div>
                        </div>
                        <label>Intent</label>
                        <input
                            type="text"
                            name="intent"
                            value={formData.intent || ''}
                            onChange={handleChange}
                            className="nodrag"
                        />
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="nodrag"
                        />
                        <label style={{ marginTop: '8px' }}>Description</label>
                        <textarea
                            value={formData.description}
                            name="description"
                            onChange={handleChange}
                            className="nodrag"
                            style={{ marginBottom: '5px' }}
                        ></textarea>

                        <button onClick={saveNode} className='saveButton'>Save</button>
                    </div>


                </div>


            </div>
            <Handle type="target" position={Position.Top} />
            {/* <Handle type="source" position={Position.Bottom} /> */}
        </>
    );
});
