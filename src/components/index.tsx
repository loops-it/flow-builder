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
  updateEdge,
} from "reactflow";

import initialNodes from "../data/nodes";
import initialEdges from "../data/edges";
import ButtonEdge from "./ButtonEdge";
import TextInputNode from "./TextInputNode";

import '../styles/overview.css';
import ToolBarNode from "./ToolBarNode";
import { v4 as uuidv4 } from 'uuid';
import CircleNode from "./CircleNode";
import AnotationNode from "./AnotationNode";
import { FaFirstdraft, FaRegObjectGroup, FaTools } from "react-icons/fa";
import { MdSimCard } from "react-icons/md";
import ButtonNode from "./ButtonNode";
import TextImageNode from "./TextImageNode";






const nodeTypes = {
  textinput: TextInputNode,
  tools: ToolBarNode,
  start: CircleNode,
  annotation: AnotationNode,
  button: ButtonNode,
  cardHeader: TextImageNode
};


const edgeTypes = {
  button: ButtonEdge,
};

const processNode = {
  color: '#fff',
  borderColor: '#872341',
};

const nodeClassName = (node: { type: any; }) => node.type;


// node id generate
// const generateNodeId = () => `node_${Math.random().toString(36).substr(2, 9)}`;
const generateNodeId = () => `node_${uuidv4()}`;

// edge id generate
// const generateEdgeId = () => `edge_${Math.random().toString(36).substr(2, 9)}`;
const generateEdgeId = () => `edge_${uuidv4()}`;



const FlowPanel = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const addTextNode = () => {
    const newNodeId = generateNodeId();
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

  const addToolNode = () => {
    const newNodeId = generateNodeId();
    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      type: 'tools',
      style: processNode,
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });
  };

  const addCircleNode = () => {
    const newNodeId = generateNodeId();
    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      type: 'start',
      style: processNode,
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });
  };


  const addButtonNode = () => {
    const newNodeId = generateNodeId();
    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      type: 'button',
      style: processNode,
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });
  };


  const addCardHeaderNode = () => {
    const newNodeId = generateNodeId();
    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
      },
      type: 'cardHeader',
      style: processNode,
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });
  };


  const onEdgeUpdate = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      const updatedEdge = updateEdge(oldEdge, newConnection, edges);
      updatedEdge.type = 'button';
      setEdges((prevEdges) => {
        const updatedEdges = prevEdges.map((edge) =>
          edge.id === updatedEdge.id ? updatedEdge : edge
        );
        console.log('Updated Edges List:', updatedEdges);
        return updatedEdges;
      });
    },
    [edges, setEdges]
  );

  const onConnect = useCallback(
    (params: Edge | Connection) => {
      if (!('id' in params)) {
        params.id = generateEdgeId();
      }
      params.type = 'button';
      setEdges((prevEdges) => {
        const newEdges = addEdge(params, prevEdges);
        console.log('Updated Edges List:', newEdges);
        return newEdges;
      });
    },
    [setEdges]
  );

  const onNodeDragStop = useCallback(
    (event, node) => {
      const { x, y } = node.position;
      setNodes((prevNodes) =>
        prevNodes.map((n) =>
          n.id === node.id ? { ...n, position: { x, y } } : n
        )
      );
      console.log('Updated Node List:', nodes);
    },
    [nodes, setNodes]
  );


  return (
    <>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 999, display: 'flex', flexDirection: 'column' }}>
        <button onClick={addCircleNode} ><FaFirstdraft /></button>
        <button onClick={addTextNode} style={{ marginTop: '10px' }}><MdSimCard /></button>
        <button onClick={addToolNode} style={{ marginTop: '10px' }}><FaTools /></button>
        <button onClick={addButtonNode} style={{ marginTop: '10px' }}>
          <FaRegObjectGroup />
        </button>
        <button onClick={addCardHeaderNode} style={{ marginTop: '10px' }}>
          <FaRegObjectGroup />
        </button>
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodeDragStop={onNodeDragStop}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onEdgeUpdate={onEdgeUpdate}
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
