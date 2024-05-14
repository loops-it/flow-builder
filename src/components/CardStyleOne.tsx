import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from '../service/deleteFunctions';
import { apiUrl } from '../service/idGenerateFunctions';
import { getNodeData } from '../service/getData';


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id }) => {
    const { setNodes } = useReactFlow();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [nodeId, setNodeId] = useState('');


    useEffect(() => {
        const fetchData = async () => {
            try {
                // console.log("node id here : ", id);
                const nodeData = await getNodeData();

                // console.log("Text Only Data:", nodeData.cardData);

                const desiredNodeId = id;
                const node = nodeData.cardData.find((node: { node_id: any; }) => node.node_id === desiredNodeId);

                if (node) {
                    // console.log("Text:", node.text);
                    setTitle(node.title);
                    setDescription(node.description);
                    setImage(node.image);
                } else {
                    console.log("Node not found");
                }

            } catch (error) {
                console.error("Error fetching node data:", error);
            }
        };

        fetchData();
    }, []);

    // node title input
    const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    };

    // node text area input
    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
    };

    // console.log the node data
    // const logUserInput = () => {
    //     console.log('node id :', id)
    //     console.log('Title:', title);
    //     console.log('Description:', description);
    // };


    // handle image upload
    const handleImageChange = (event: { target: { files: any[]; }; }) => {
        const file = event.target.files[0];
        console.log('Selected File:', file);
        setImage(file);
    };

    useEffect(() => {
        if (image) {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image || '');
            console.log('Form Data:', formData);
        }
    }, [image]);

    // add data from node to node list
    const saveNode = async () => {
        try {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image || '');

            // Convert FormData to plain object for logging
            // const formDataObject = {};
            // for (const pair of formData.entries()) {
            //     formDataObject[pair[0]] = pair[1];
            // }
            // console.log('Form Data:', formDataObject);

            // const response = await fetch(`${apiUrl}/data-flow-card-data`, {
            //     method: 'POST',
            //     body: formDataObject,
            // });

            // if (!response.ok) {
            //     throw new Error('Failed to save node');
            // }

            // console.log('Node saved successfully:', response);

            const response = await fetch(`${apiUrl}/data-flow-card-data`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, title: title, description: description, image: '/image1' }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete node');
            }
            console.log("card 1 : ", response)

        } catch (error) {
            console.error('Error saving node:', error);
        }
    };


    useEffect(() => {
        console.log("node id : ", nodeId)
        setNodeId(id)
    }, [nodeId])


    // delete node from list
    const deleteNode = async () => {
        deleteNodeCall(nodeId, "cardStyleOne")
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
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="nodrag"
                                />
                            </div>
                        </div>
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className="nodrag"
                        />
                        <label style={{ marginTop: '8px' }}>Description</label>
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            className="nodrag"
                            style={{ marginBottom: '5px' }}
                        ></textarea>

                        <button onClick={saveNode} className='saveButton'>Save</button>
                    </div>


                </div>


            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
});
