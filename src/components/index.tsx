import React, { useCallback } from "react";
import ReactFlow, {
  useNodesState,
  useEdgesState,
  addEdge,
  Controls,
  MiniMap,
  Background,
  NodeToolbar,
  Connection,
  Edge,
} from "reactflow";

import initialNodes from "../data/nodes";
import initialEdges from "../data/edges";
import ButtonEdge from "./ButtonEdge";
import TextInputNode from "./TextInputNode";

import '../styles/overview.css';
import ToolBarNode from "./ToolBarNode";



const nodeTypes = {
    textinput: TextInputNode,
    tools: ToolBarNode,
  };


const edgeTypes = {
  button: ButtonEdge,
};

const processNode = {
    color: '#872341',
    borderColor: '#872341',
  };

const nodeClassName = (node: { type: any; }) => node.type;

const generateId = () => `node_${Math.random().toString(36).substr(2, 9)}`;


const FlowPanel = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const addTextNode = () => {
    const newNodeId = generateId();
    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      type: 'textinput',
      style: processNode,
    };

    setNodes((prevNodes) => {
        const updatedNodes = [...prevNodes, newNode];
        console.log('Updated Node List:', updatedNodes);
        return updatedNodes;
      });
  };

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <>
    <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 999 }}>
        <button onClick={addTextNode}>Add Text Node</button>
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
        >
          <Controls />
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
          <NodeToolbar />
        </ReactFlow>
      </div>
    </>
  );
};

export default FlowPanel;
