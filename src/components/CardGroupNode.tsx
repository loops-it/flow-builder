import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id,  data }) => {
    const { setNodes } = useReactFlow();
    const [description, setDescription] = useState(data.description || '');

    // Update title state when props change
    useEffect(() => {
        setDescription(data.description || '');
    }, [data]);

    // node text area input
    const handleDescriptionChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setDescription(event.target.value);
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
            <div className='elementWrap' style={{zIndex: '99998 !important'}}>
                {/* gradient */}
                <div className="wrapper plainColor  elementWrap" style={{borderRadius: '10px',margin: '10px'}}>

                    <div className="inner" style={{display: 'flex' ,flexDirection: 'column', padding: '10px', borderRadius: '10px'}}>
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                                <RiCloseCircleFill style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                        <label style={{marginBottom: '10px'}}>Add your text here</label>
                        <textarea
                            value={description}
                            onChange={handleDescriptionChange}
                            className="nodrag"
                            style={{marginBottom: '10px'}}
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
