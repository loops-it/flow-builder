import React, { useCallback } from 'react';
import ReactFlow, { useNodesState, useEdgesState, addEdge, Controls, MiniMap, Background, NodeToolbar, Connection, Edge } from 'reactflow';

import initialNodes from '../data/nodes'
import initialEdges from '../data/edges'


const FlowPanel = () => {

    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback(
        (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
        [setEdges],
    );

    return (
        <>
            <div style={{ width: '100vw', height: '100vh' }}>
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                >
                    <Controls />
                    <MiniMap />
                    <Background variant="dots" gap={12} size={1} />
                    <NodeToolbar />
                </ReactFlow>
            </div>
        </>
    )
}

export default FlowPanel