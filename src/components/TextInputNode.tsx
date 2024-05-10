import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from '../service/deleteFunctions';
import { apiUrl } from '../service/idGenerateFunctions';


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id, type, data, position }) => {

    const { setNodes } = useReactFlow();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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
