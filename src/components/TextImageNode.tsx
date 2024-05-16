import React, { memo, useEffect, useState } from 'react';
import { Handle, Position, useReactFlow } from 'reactflow';
import { deleteNodeCall } from '../service/deleteFunctions';
import { apiUrl } from '../service/idGenerateFunctions';
import { getNodeData } from '../service/getData';


export default memo((id:any) => {
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
                
                setParentID(nodePatent.parentId)
                const nodeIntent = nodeData.nodes.find((node: { node_id: any; }) => node.node_id === nodePatent.parentId);

                // console.log("nodeIntent ------> ", nodeIntent)
                // console.log("node ------> ", nodeIntent.intent)

                if (node) {
                    setTitle(node.title);
                    setDescription(node.description);
                    setImage(node.image);
                    setIntent(nodeIntent.intent);
                } else {
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
        setImage(file);
    };

    useEffect(() => {
        if (image) {
            const formData = new FormData();
            formData.append('id', id.id);
            formData.append('title', title);
            formData.append('description', description);
            formData.append('image', image);
            formData.append('intent', intent);
            formData.append('type', "group");
            formData.append('parentID', parentID);
        }
    }, [image]);


    // add data from node to node list
    // const saveNode = async () => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('id', id.id);
    //         formData.append('title', title);
    //         formData.append('description', description);
    //         console.log("intent : ",intent)
    //         console.log("parentId : ",parentID)
           
    //         const response = await fetch(`${apiUrl}/data-flow-card-data`, {
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ id: id.id, title: title, description: description, image: '/image1', intent: intent, type: "group", parentID: parentID }), 
    //           });
        
    //         if (!response.ok) {
    //           throw new Error('Failed to delete node');
    //         }
            
    //     } catch (error) {
    //         console.error('Error saving node:', error);
    //     }
    // };

    const saveNode = async () => {
        try {
            if (image) {
                const formData = new FormData();
                formData.append('id', id.id);
                formData.append('title', title);
                formData.append('description', description);
                formData.append('image', image);
                formData.append('intent', intent);
                formData.append('type', "group");
                formData.append('parentID', parentID);
    
                const response = await fetch(`${apiUrl}/data-flow-card-data`, {
                    method: 'POST',
                    body: formData,
                });
    
                if (!response.ok) {
                    throw new Error('Failed to save node');
                }
    
                // Handle successful response here if needed
            } else {
                throw new Error('Image not selected');
            }
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
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="nodrag"
                                />
                            </div>
                        </div>
                        <label>Intent</label>
                        <input
                            type="text"
                            value={intent || ''}
                            onChange={handleIntentChange}
                            className="nodrag"
                        />
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
