import React, { memo, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { deleteNodeCall } from '../service/deleteFunctions';
import { apiUrl } from '../service/idGenerateFunctions';
import { getNodeData } from '../service/getData';


export default memo((id: any) => {
    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const [nodeId, setNodeId] = useState('');
    const [nodeType, setType] = useState('group');
    const [intent, setIntent] = useState('');
    const [parentID, setParentID] = useState('');

    const [formData, setFormData] = useState({
        id: id.id,
        title: '',
        description: '',
        image: null,
        intent: '',
        type: 'group',
    });

    useEffect(() => {
        console.log("parentID : ", parentID)
    }, [parentID])


    useEffect(() => {
        const fetchData = async () => {
            try {

                const nodeData = await getNodeData();

                const desiredNodeId = id.id;
                const node = nodeData.cardData.find((node: { node_id: any; }) => node.node_id === desiredNodeId);
                const nodePatent = nodeData.nodes.find((node: { node_id: any; }) => node.node_id === desiredNodeId);

                console.log("nodePatent:", nodePatent);
                if (nodePatent) {
                    console.log("Parent ID found:", nodePatent.parentId);
                    setParentID(nodePatent.parentId);
                } else {
                    console.log("Parent node not found");
                }
                const nodeIntent = nodeData.nodes.find((node: { node_id: any; }) => node.node_id === nodePatent.parentId);

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
                        type: 'group',
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

   
    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: files ? files[0] : value,
        }));
    };


    useEffect(() => {
        console.log('Form Data:', formData);
    }, [formData]);


    const saveNode = async () => {
        console.log("Parent ID found ============== :", parentID);
        try {
            console.log('Form Data 2:', formData);

            if (parentID === null) {
                throw new Error('Parent ID is null');
            }

            const updatedFormData = { ...formData, parentID };
            console.log('FormDataToSend Data:', updatedFormData);

            const response = await fetch(`${apiUrl}/data-flow-card-data`, {
                method: 'POST',
                body: JSON.stringify(updatedFormData),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                throw new Error('Failed to save node');
            }

            console.log("card header response : ", response)
        } catch (error) {
            console.error('Error saving node:', error);
        }
    };


    useEffect(() => {
        setNodeId(id.id)
    }, [nodeId])



    const deleteNode = async () => {
        deleteNodeCall(nodeId, "cardHeader", setNodes, setEdges)
    };




    return (
        <>
            <div className='elementWrap' style={{ zIndex: '99998 !important' }}>
                {/* gradient */}
                <div className="wrapper plainColor  elementWrap" style={{ borderRadius: '10px', margin: '10px' }}>

                    <div className="inner" style={{ display: 'flex', flexDirection: 'column', padding: '10px', borderRadius: '10px' }}>
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
            {/* <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} /> */}
        </>
    );
});
