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



const nodeTypes = {
    textinput: TextInputNode,
  };


const edgeTypes = {
  button: ButtonEdge,
};

const nodeClassName = (node: { type: any; }) => node.type;

const FlowPanel = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Edge | Connection) => setEdges((eds) => addEdge(params, eds)),
    []
  );

  return (
    <>
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
