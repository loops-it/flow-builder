import React, { memo, useEffect, useState } from 'react';
import { Handle, useStore, Position, useReactFlow, useEdgesState, useNodesState } from 'reactflow';
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from '../service/deleteFunctions';
import { apiUrl } from '../service/idGenerateFunctions';
import { getNodeData } from '../service/getData';
import initialNodes from "../data/nodes";
import initialEdges from "../data/edges";



// const dimensionAttrs = ['width', 'height'];

export default memo((id : any ) => {

    const { setNodes } = useReactFlow();
    const { setEdges } = useReactFlow();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [nodeId, setNodeId] = useState('');



    useEffect(() => {
        const fetchData = async () => {
            try {
                const nodeData = await getNodeData();

                const desiredNodeId = id.id;
                const node = nodeData.textBox.find((node: { node_id: any; }) => node.node_id === desiredNodeId);

                if (node) {
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
            const response = await fetch(`${apiUrl}/data-flow-text-box`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id.id, title: title, description: description }),
            });

            if (!response.ok) {
                throw new Error('Failed to delete node');
            }
            console.log("title , description : ", response)
        } catch (error) {

        }
    };

    useEffect(() => {
        setNodeId(id.id)
    }, [nodeId])



    // delete node from list
    const deleteNode = async () => {
        deleteNodeCall(nodeId, "textinput", setNodes, setEdges)
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
