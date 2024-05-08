import { generateNodeId } from "./idGenerateFunctions";

const processNode = {
    color: '#fff',
    borderColor: '#872341',
  };

  
export const addNode = (type, setNodes) => {
  const newNodeId = generateNodeId();
  const newNode = {
    id: newNodeId,
    data: { label: `Node ${newNodeId}` },
    position: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
    },
    type,
    style: processNode,
  };

  setNodes((prevNodes) => {
    const updatedNodes = [...prevNodes, newNode];
    console.log('Updated Node List:', updatedNodes);
    return updatedNodes;
  });
};


