import React, { memo, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';

// const dimensionAttrs = ['width', 'height'];

export default memo(({ id }) => {
    const { setNodes } = useReactFlow();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const logUserInput = () => {
        console.log('node id :',id)
        console.log('Title:', title);
        console.log('Description:', description);
    };

    return (
        <>
            <div className='elementWrap'>
                <div className="wrapper gradient elementWrap">
                    <div className="inner">
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
                        <button onClick={logUserInput} className='saveButton'>Save</button>
                    </div>
                    
                    
                </div>
                
                
            </div>
            <Handle type="target" position={Position.Top} />
        </>
    );
});
