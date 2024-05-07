import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id, type, data, position }) => {
    const { setNodes } = useReactFlow();
    const [title, setTitle] = useState(data.label || '');
    const [description, setDescription] = useState(data.description || '');

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
    const saveNode = () => {
        setNodes((prevNodes) => {
            const updatedNodes = prevNodes.map(node => {
                if (node.id === id) {
                    return {
                        ...node,
                        data: {
                            ...node.data,
                            title,
                            description
                        }
                    };
                }
                return node;
            });
            console.log('Updated Node List:', updatedNodes);
            return updatedNodes;
        });
    };

    // delete node from list
    const deleteNode = () => {
        setNodes((prevNodes) => {
            const updatedNodes = prevNodes.filter(node => node.id !== id);
            console.log('Updated Node List:', updatedNodes);
            return updatedNodes;
        });
        console.log('Node deleted:', id);
    };


    

    return (
        <>
            <div className='elementWrap'>
                <div className="wrapper gradient elementWrap">

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
        </>
    );
});
