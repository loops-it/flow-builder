import { generateNodeId } from "./idGenerateFunctions";

const processNode = {
    color: '#fff',
    borderColor: '#872341',
  };

  
export const addNode = async (type, setNodes) => {

  const apiUrl = 'https://dfcc-chat-bot.vercel.app';
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

  // setNodes((prevNodes) => {
  //   const updatedNodes = [...prevNodes, newNode];
  //   console.log('Updated Node List:', updatedNodes);
  //   return updatedNodes;
  // });

  try {
    // Make API call to post the new node data

    console.log("new node data : ", newNode)
    const response = await fetch(`${apiUrl}/data-flow-insert-node`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNode), 
    });

    if (!response.ok) {
      throw new Error('Failed to add node');
    }

    console.log('response : ',response )

    setNodes((prevNodes) => {
      const updatedNodes = [...prevNodes, newNode];
      console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });
  } catch (error) {
    console.error('Error adding node:', error);
  }
};


