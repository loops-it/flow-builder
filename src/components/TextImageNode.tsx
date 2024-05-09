import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id, data }) => {
    const { setNodes } = useReactFlow();
    const [title, setTitle] = useState(data.label || '');
    const [description, setDescription] = useState(data.description || '');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');

    const apiUrl = 'https://dfcc-chat-bot.vercel.app';


    // Update title state when props change
    useEffect(() => {
        setTitle(data.title || '');
        setDescription(data.description || '');
    }, [data]);


    // node title input
    const handleTitleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(event.target.value);
    };

    // node text area input
    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
    };



    // console.log the node data
    const logUserInput = () => {
        console.log('node id :', id)
        console.log('Title:', title);
        console.log('Description:', description);
    };


    // add data from node to node list
    // const saveNode = () => {
    //     setNodes((prevNodes) => {
    //         const updatedNodes = prevNodes.map(node => {
    //             if (node.id === id) {
    //                 return {
    //                     ...node,
    //                     data: {
    //                         ...node.data,
    //                         title,
    //                         description
    //                     }
    //                 };
    //             }
    //             return node;
    //         });
    //         console.log('Updated Node List:', updatedNodes);
    //         return updatedNodes;
    //     });
    // };

    // handle image upload
    const handleImageChange = (event: { target: { files: any[]; }; }) => {
        const file = event.target.files[0];
        console.log('Selected File:', file);
        setImage(file);
    };



    // useEffect(() => {
    //     if (image) {
    //         const formData = new FormData();
    //         formData.append('id', id);
    //         formData.append('title', title);
    //         formData.append('description', description);
    //         formData.append('image', image || ''); 
    //         console.log('Form Data:', formData);
    //     }
    // }, [image]);


    useEffect(() => {
        if (image) {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image || '');

            // fetch('uploadImage', {
            //     method: 'POST',
            //     body: formData
            // })
            // .then(response => response.json())
            // .then(data => {
            //     setImageUrl(data.imageUrl);
            // })
            // .catch(error => console.error('Error uploading image:', error));
        }
    }, [image]);


    // add data from node to node list
    const saveNode = () => {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('image', image || '');

        console.log('Form Data:', formData);
        const formDataObject = {};
        for (const pair of formData.entries()) {
            formDataObject[pair[0]] = pair[1];
        }
        console.log('Form Data:', formDataObject);
    };


    // delete node from list
    const deleteNode = async () => {
        try {
            const response = await fetch(`${apiUrl}/data-flow-delete-node`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({id}),
            });
      
            if (!response.ok) {
              throw new Error('Failed to delete node');
            }
      
            setNodes((prevNodes) => {
              const updatedNodes = prevNodes.filter(node => node.id !== id);
              console.log('Updated Node List:', updatedNodes);
              return updatedNodes;
            });
            console.log('Node deleted:', id);
            
          } catch (error) {
            console.error('Error deleting node:', error);
            // Handle error as needed
          }
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
                        {/* {imageUrl && ( */}

                        {/* )} */}
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
                        ></textarea>

                        {/* <button onClick={saveNode} className='saveButton'>Save</button> */}
                    </div>


                </div>


            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
});
