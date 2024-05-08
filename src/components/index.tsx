import React, { useCallback, useEffect, useState } from "react";
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
  Position,
  ControlButton,
  NodeResizeControl,
} from "reactflow";

import initialNodes from "../data/nodes";
import initialEdges from "../data/edges";
import ButtonEdge from "./ButtonEdge";
import TextInputNode from "./TextInputNode";

import '../styles/overview.css';
import ToolBarNode from "./ToolBarNode";
import CircleNode from "./CircleNode";
import AnotationNode from "./AnotationNode";
import ButtonNode from "./ButtonNode";
import TextImageNode from "./TextImageNode";
import CardGroupNode from "./CardGroupNode";

import { IoAddCircle } from "react-icons/io5";
import { addNode } from "../service/nodeFunction";
import { generateEdgeId, generateGroupId, generateNodeId } from "../service/idGenerateFunctions";
import TwoWayButton from "./TwoWayButton";
import CardStyleOne from "./CardStyleOne";
import EndCircleNode from "./EndCircleNode";


const nodeTypes = {
  textinput: TextInputNode,
  tools: ToolBarNode,
  start: CircleNode,
  annotation: AnotationNode,
  button: TwoWayButton,
  cardHeader: TextImageNode,
  cardStyleOne: CardStyleOne,
  textOnly: CardGroupNode,
  end: EndCircleNode
};


const edgeTypes = {
  button: ButtonEdge,
};

const processNode = {
  color: '#fff',
  borderColor: '#872341',
};

const nodeClassName = (node: { type: any; }) => node.type;






const FlowPanel = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState(null);
  const [buttonGroupId, setButtonGroupId] = useState(null);

  useEffect(() => {
    console.log("node list : ", nodes)
  }, [])


  // add start circle node
  const addCircleNode = () => {
    addNode('start', setNodes);
  };

  // add text imput node
  const addTextNode = () => {
    addNode('textinput', setNodes);
  };

  // add tool node
  const addToolNode = () => {
    addNode('tools', setNodes);
  };

  // test group - change this ----------------------
  const addCardViewNode = () => {
    addNode('cardView', setNodes);
  };

  // add button node
  const addButtonNode = () => {
    addNode('button', setNodes);
  };

  // add card header node - need to change this also ----------
  const addCardHeaderNode = () => {
    addNode('cardStyleOne', setNodes);
  };

  // text only node
  const addTextOnlyNode = () => {
    addNode('textOnly', setNodes);
  };

  // add start circle node
  const addEndNode = () => {
    addNode('end', setNodes);
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
    (event: any, node: { position: { x: any; y: any; }; id: string; }) => {
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








  // card style 2 group
  const addGroup = () => {
    const groupId = generateGroupId();
    setGroupId(groupId);

    const group = {
      id: groupId,
      type: 'group',
      data: { label: 'Group' },
      position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
      style: {
        width: '300px',
        minHeight: '400px',
        height: 'auto !important',
        backgroundColor: 'rgba(208, 192, 247, 0.2)',
        zIndex: '999',
        position: 'relative !important'
      },
    };

    setGroups([...groups, group]);

    // Add group card header node
    addGroupCardHeaderNode(groupId);

    // Add group button node
    addGroupButtonNode(groupId);

    console.log("group : ", group);

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, group];
      console.log("Updated Node List with group:", updatedNodes);
      return updatedNodes;
    });
  };

  const addGroupCardHeaderNode = (groupId) => {
    const newNodeId = generateNodeId();

    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: 0,
        y: 0,
      },
      type: 'cardHeader',
      style: {
        position: 'absolute !important'
      },
      parentId: groupId,
      extent: 'parent',
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });
  };

  const addGroupButtonNode = (groupId) => {

    const buttonsCount = nodes.filter(node => node.type === 'button' && node.parentId === groupId).length;

    if (buttonsCount >= 3) {
      console.log('Maximum button limit reached for this group');
      return;
    }

    const newNodeId = generateNodeId();

    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: 10 + (buttonsCount * 95),
        y: 325,
      },
      type: 'button',
      style: {
        position: 'absolute !important'
      },
      parentId: groupId,
      extent: 'parent',
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });
  };


  const addFloatingButton = () => {
    if (!groupId) {
      console.error("Group ID is not defined");
      return;
    }

    addGroupButtonNode(groupId);
  };










  // button group 
  const addButtonGroup = () => {
    const buttonGroupId = generateGroupId();
    setButtonGroupId(buttonGroupId);

    const group = {
      id: buttonGroupId,
      type: 'group',
      data: { label: 'Group' },
      position: { x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight },
      style: {
        width: '300px',
        minHeight: '100px',
        height: 'auto !important',
        backgroundColor: 'rgba(208, 192, 247, 0.2)',
        zIndex: '999'
      },
    };

    setGroups([...groups, group]);

    // Add group button node
    addGroupButtonsNodes(buttonGroupId);

    console.log("group : ", group);

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, group];
      console.log("Updated Node List with group:", updatedNodes);
      return updatedNodes;
    });
  };

  const addGroupButtonsNodes = (buttonGroupId: string | undefined) => {

    const buttonsCount = nodes.filter(node => node.type === 'button' && node.parentId === buttonGroupId).length;

    if (buttonsCount >= 3) {
      console.log('Maximum button limit reached for this group');
      return;
    }

    const newNodeId = generateNodeId();

    const newNode = {
      id: newNodeId,
      data: { label: `Node ${newNodeId}` },
      position: {
        x: 10 + (buttonsCount * 95),
        y: 10,
      },
      type: 'button',
      style: {
        position: 'relative !important'
      },
      parentId: buttonGroupId,
      extent: 'parent',
    };

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });
  };

  const addFloatingButtonForButtonGroup = () => {
    if (!buttonGroupId) {
      console.error("Group ID is not defined");
      return;
    }
    addGroupButtonsNodes(buttonGroupId);
  };





  return (
    <>
      <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 999, display: 'flex', flexDirection: 'column' }}>
        <button onClick={addCircleNode} >start</button>
        <button onClick={addEndNode} style={{ marginTop: '10px' }}>End</button>
        <button onClick={addTextNode} style={{ marginTop: '10px' }}>text card</button>
        {/* <button onClick={addToolNode} style={{ marginTop: '10px' }}>tool</button> */}
        <button onClick={addButtonGroup} style={{ marginTop: '10px' }}>
          Buttons
        </button>
        <button onClick={addTextOnlyNode} style={{ marginTop: '10px' }}>Text</button>
        <button onClick={addCardHeaderNode} style={{ marginTop: '10px' }}>
          Card style 1
        </button>
        <button onClick={addGroup} style={{ marginTop: '10px' }}>Card style 2</button>




        {groupId && (
          <button
            style={{
              position: "relative",
              bottom: "0px",
              right: "0px",
              zIndex: "1000",
              marginTop: '50px'
            }}
            onClick={addFloatingButton}
          >
            <IoAddCircle /> Card Buttons

          </button>
        )}
        {buttonGroupId && (
          <button
            style={{
              position: "relative",
              bottom: "0px",
              right: "0px",
              zIndex: "1000",
              marginTop: '10px'
            }}
            onClick={addFloatingButtonForButtonGroup}
          >
            <IoAddCircle /> Buttons Group

          </button>
        )}
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
          {/* <Controls>
            <ControlButton onClick={() => alert('Something magical just happened. ✨')}>
              <IoAddCircle style={{ color: '#000' }} />
            </ControlButton>
          </Controls> */}
          <MiniMap />
          <Background variant="dots" gap={12} size={1} />
          <NodeToolbar />
          <NodeResizeControl />
        </ReactFlow>
      </div>
    </>
  );
};

export default FlowPanel;
