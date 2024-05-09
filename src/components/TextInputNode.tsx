import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id, type, data, position }) => {
    const { setNodes } = useReactFlow();
    const [title, setTitle] = useState(data.label || '');
    const [description, setDescription] = useState(data.description || '');
    const [image, setImage] = useState(null);

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
        console.log('Selected File:', file); // Log the selected file
        setImage(file);
    };

    useEffect(() => {
        if (image) {
            const formData = new FormData();
            formData.append('id', id);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image || ''); // Make sure image is appended properly

            console.log('Form Data:', formData);
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
            <div className='elementWrap'>
                {/* gradient */}
                <div className="wrapper plainColor elementWrap">

                    <div className="inner">
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                                <RiCloseCircleFill style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                        <label>Title</label>
                        <input
                            type="text"
                            value={title}
                            onChange={handleTitleChange}
                            className="nodrag"
                        />
                        <label>Description</label>
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            className="nodrag"
                        ></textarea>
                        {/* <label>Image</label>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            className="nodrag"
                        /> */}
                        <button onClick={saveNode} className='saveButton'>Save</button>
                    </div>


                </div>


            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
});
