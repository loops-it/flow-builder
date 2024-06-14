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
                const nodeData = await getNodeData();


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

    // const handleChange = (event) => {
    //     const { name, value, files } = event.target;
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         [name]: files ? files[0] : value,
    //     }));
    // };


    // add data from node to node list
    // const saveNode = async () => {
    //     try {


    //         const response = await fetch(`${apiUrl}/data-flow-card-data`, {
    //             method: 'POST',
    //             body: JSON.stringify(formData),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         if (!response.ok) {
    //             throw new Error('Failed to delete node');
    //         }

    //         console.log("card style one response : ", response)

    //     } catch (error) {
    //         console.error('Error saving node:', error);
    //     }
    // };


    // =================================================
    // const handleChange = (e: { target: { name: any; value: any; files: any; }; }) => {
    //     const { name, value, files } = e.target;
    //     if (name === 'image') {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             image: files[0]
    //         }));
    //     } else {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [name]: value
    //         }));
    //     }
    // };

    // const [formData, setFormData] = useState({ image: null });
    const [preview, setPreview] = useState('');

    // const handleChange = (e: { target: { name: any; value: any; files: any; }; }) => {
    //     const { name, value, files } = e.target;
    //     if (name === 'image') {
    //         const file = files[0];
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             image: file
    //         }));
    //         setPreview("/images/Slide 06.png");
    //     } else {
    //         setFormData((prevData) => ({
    //             ...prevData,
    //             [name]: value
    //         }));
    //     }
    // };

    // const handleDrop = (e: { preventDefault: () => void; dataTransfer: { files: any[]; }; }) => {
    //     e.preventDefault();
    //     const file = e.dataTransfer.files[0];
    //     setFormData((prevData) => ({
    //         ...prevData,
    //         image: file
    //     }));
    //     setPreview("/images/Slide 06.png");
    // };

    // const handleDragOver = (e: { preventDefault: () => void; }) => {
    //     e.preventDefault();
    // };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setFormData((prevData) => ({
                ...prevData,
                image: file
            }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        setFormData((prevData) => ({
            ...prevData,
            image: file
        }));
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };


    const saveNode = async () => {
        try {


            const formDataToSend = new FormData();
            formDataToSend.append('intent', formData.intent);
            formDataToSend.append('title', formData.title);
            formDataToSend.append('description', formData.description);
            formDataToSend.append('image', formData.image);

            console.log("formDataToSend : ", formDataToSend)
            // Log formDataToSend contents
            for (let [key, value] of formDataToSend.entries()) {
                console.log(`${key}:`, value);
            }

            const response = await fetch(`${apiUrl}/data-flow-card-data`, {
                method: 'POST',
                body: formDataToSend,
            });

            if (!response.ok) {
                throw new Error('Failed to save node');
            }

            const data = await response.json();
            console.log("Card style one save node: ", data);
        } catch (error) {
            console.error('Error saving node:', error);
        }
    };


    useEffect(() => {
        setNodeId(id.id)
    }, [nodeId])


    // delete node from list
    const deleteNode = async () => {
        deleteNodeCall(nodeId, "cardStyleOne", setNodes, setEdges)
    };




    return (
        <>
            <div className='elementWrap' style={{ zIndex: '99998 !important' }}>
                {/* gradient */}
                <div className="wrapper plainColor  elementWrap" style={{ borderRadius: '10px', margin: '10px' }}>

                    <div className="inner" style={{ display: 'flex', flexDirection: 'column', padding: '10px', borderRadius: '10px' }}>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                                <IoClose style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {/* <img src='/images/Slide 06.png' alt="Uploaded Image" style={{ width: '150px', marginBottom: '8px' }} /> */}
                            {/* <div style={{
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
                            </div> */}
                            {/* <div
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    border: '2px dashed #ccc',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    width: '220px',
                                    height: '120px',
                                    position: 'relative',
                                    cursor: 'pointer',
                                    marginBottom: '10px',
                                    backgroundColor: '#fff'
                                }}
                            >
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Uploaded"
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                ) : (
                                    <div className='ImageUploadWrapper' style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                        <img src='/images/imageUploadIcon.png' alt="Uploaded Image" style={{ width: '50px', marginBottom: '8px' }} />
                                        <p className='mb-0'>Drop your image here, or <span>browse</span></p>
                                        <span className='mb-0'>Supports: PNG, JPG, JPEG,WEBP</span>
                                    </div>
                                )}
                                <input
                                    type="file"
                                    name="image"
                                    accept="image/*"
                                    onChange={handleChange}
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        opacity: 0,
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>
                        </div> */}
                        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                border: '2px dashed #ccc',
                padding: '20px',
                borderRadius: '10px',
                width: '200px',
                height: '80px',
                position: 'relative',
                cursor: 'pointer',
                marginBottom: '10px',
                backgroundColor: '#fff'
            }}
        >
            {preview ? (
                <img
                    src={preview}
                    alt="Uploaded"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            ) : (
                <div className='ImageUploadWrapper' style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <img src='/images/imageUploadIcon.png' alt="Uploaded Image" style={{ width: '50px', marginBottom: '8px' }} />
                    <p>Drop your image here, or <span>browse</span></p>
                    <span>Supports: PNG, JPG, JPEG, WEBP</span>
                </div>
            )}
            <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    opacity: 0,
                    cursor: 'pointer'
                }}
            />
        </div>
                        <label>Intent</label>
                        <input
                            type="text"
                            name="intent"
                            value={formData.intent}
                            onChange={handleChange}
                            className="nodrag cardInput"
                        />
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="nodrag cardInput"
                        />
                        <label style={{ marginTop: '8px' }}>Description</label>
                        <textarea
                            value={formData.description}
                            name="description"
                            onChange={handleChange}
                            className="nodrag cardInput"
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
