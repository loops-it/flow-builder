import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from '../service/deleteFunctions';
import { apiUrl } from '../service/idGenerateFunctions';
import { getNodeData } from '../service/getData';


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id, type, data, position }) => {

    const { setNodes } = useReactFlow();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');


    useEffect(() => {
        const fetchData = async () => {
          try {
            // console.log("node id here : ", id);
                const nodeData = await getNodeData();
    
                // console.log("Text Only Data:", nodeData.textBox);
    
                const desiredNodeId = id; 
                const node = nodeData.textBox.find((node: { node_id: any; }) => node.node_id === desiredNodeId);
    
                if (node) {
                    // console.log("Text:", node.text);
                    setTitle(node.title);
                    setDescription(node.description);
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

    // add data from node to node list
    const saveNode = async () => {
        try {
            // console.log(" text data : ", id, "-", description)
            const response = await fetch(`${apiUrl}/data-flow-text-box`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({id: id, title: title, description: description}), 
              });
        
            if (!response.ok) {
              throw new Error('Failed to delete node');
            }
            console.log("title , description : ",response)
        } catch (error) {
            
        }
    };


    // delete node from list
    const deleteNode = async () => {
        deleteNodeCall(id, "textinput")
            setNodes((prevNodes) => {
              const updatedNodes = prevNodes.filter(node => node.id !== id);
            //   console.log('Updated Node List:', updatedNodes);
              return updatedNodes;
            });
            console.log('Node deleted:', id);
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
                        <button onClick={saveNode} className='saveButton'>Save</button>
                    </div>


                </div>


            </div>
            <Handle type="target" position={Position.Top} />
            <Handle type="source" position={Position.Bottom} />
        </>
    );
});
