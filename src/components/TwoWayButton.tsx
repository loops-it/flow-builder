import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { apiUrl } from '../service/idGenerateFunctions';
import { deleteNodeCall } from '../service/deleteFunctions';


// const dimensionAttrs = ['width', 'height'];

export default memo(({ id }) => {
    const { setNodes } = useReactFlow();
    const [text, setText] = useState('Button');
    const [link, setLink] = useState('#');
    const [buttonId, setButtonId] = useState('')
    const [popupOpen, setPopupOpen] = useState(false);
    const [buttonText, setButtonText] = useState('Edit');


    const openPopup = () => {
        setPopupOpen(true);
    };

    const closePopup = () => {
        setPopupOpen(false);
    };


    // node title input
    const handleTextChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setText(event.target.value);
    };

    // node text area input
    const handleLinkChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setLink(event.target.value);
    };


    const savePopup = () => {
        setButtonText(text);
        setLink(link);
        closePopup();
        // saveNode();
    };

    // console.log the node data
    const logUserInput = () => {
        console.log('node id :', id)
        console.log('Text:', text);
        console.log('Link:', link);
    };


    // add data from node to node list
    const saveNode = async () => {
        console.log('button id :', id)
        setButtonId(id)
        setButtonText(text);
        setLink(link);
        
        try {
            console.log(" id : ", id)
            console.log(" text : ", text)
            console.log(" link : ", link)

            const response = await fetch(`${apiUrl}/data-flow-button-data`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id, text: text, link: link}), 
              });
        
            if (!response.ok) {
              throw new Error('Failed to delete node');
            }
            console.log("text : ",response)

        } catch (error) {
            
        }
        closePopup();
    };


    // delete node from list
    const deleteNode = async () => {
        
        deleteNodeCall(id, "button")
            setNodes((prevNodes) => {
              const updatedNodes = prevNodes.filter(node => node.id !== id);
            //   console.log('Updated Node List:', updatedNodes);
              return updatedNodes;
            });
            console.log('Node deleted:', id);
    };




    return (
        <>
            <div className='elementWrap' style={{zIndex: '99999 !important'}}>
                {/* gradient */}
                <div className="wrapper  elementWrap">

                    <div className="inner">
                        <div style={{ display: 'flex', justifyContent: 'end' }}>
                            <button className='nodeCloseButton' onClick={deleteNode}>
                                <RiCloseCircleFill style={{ color: '#000 !important', fontSize: '20px !important' }} />
                            </button>
                        </div>
                        <button onClick={openPopup} className='saveButton'>{text}</button>
                    </div>


                </div>


            </div>
            {popupOpen && (
                <div className="popup">
                    <div className="popupInner" style={{padding: '10px'}}>
                        <label>Text</label>
                        <input
                            type="text"
                            value={text}
                            onChange={handleTextChange}
                        />
                        <label>Link</label>
                        <input
                            type="text"
                            value={link}
                            onChange={handleLinkChange}
                            style={{ marginBottom: '10px'}}
                        />
                        <button onClick={saveNode}>Save</button>
                        <button onClick={closePopup} style={{ marginLeft: '10px'}}>Cancel</button>
                    </div>
                </div>
            )}
            {/* <Handle type="source" position={Position.Right} /> */}
            <Handle type="source" position={Position.Bottom} />
            <Handle type="target" position={Position.Left} />
        </>
    );
});
