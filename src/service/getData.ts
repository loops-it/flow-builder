import { SetStateAction } from "react";
import { Node, Edge } from "reactflow";
import { apiUrl } from "./idGenerateFunctions";


const english = "english";
const sinhala = "sinhala";
const tamil = "tamil";

const fetchDataFlowData = async () => {

    try {
      // const response = await fetch(`${apiUrl}/data-flow-retrieve-data`);
      // if (!response.ok) {
      //   throw new Error('Failed to retrieve data');
      // }
      // const data = await response.json();

    const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({language: "english"}), 
    });

    if (!response.ok) {
      throw new Error('Failed to add node');
    }

    console.log('response : ',response )
    const data = await response.json();
          console.log('response ---> :', data); 

      // const filteredNodes = data.nodes.filter(node => node.language === "sinhala");

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

  const fetchDataFlowDataSinhala = async () => {

    try {
    const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({language: "sinhala"}), 
    });

    if (!response.ok) {
      throw new Error('Failed to add node');
    }

    console.log('response : ',response )
    const data = await response.json();
          console.log('response ---> :', data); 

      // const filteredNodes = data.nodes.filter(node => node.language === "sinhala");

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  const fetchDataFlowDataTamil = async () => {

    try {
    const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({language: "tamil"}), 
    });

    if (!response.ok) {
      throw new Error('Failed to add node');
    }

    console.log('response : ',response )
    const data = await response.json();
          console.log('response ---> :', data); 

      // const filteredNodes = data.nodes.filter(node => node.language === "sinhala");

      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };

export const loadDataOnMount = async (setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; }, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; }) => {
    try {
      const data = await fetchDataFlowData();
  
      const filteredNodes = data.nodes.map((node: { [x: string]: any; }) => {
        const filteredNode = {};
        for (const key in node) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'node_id') {
            filteredNode['id'] = node[key]; // Rename node_id to id
          } else if (key === 'position' && node[key] !== null) {
            // Parse the position string into an object
            const positionObj = JSON.parse(node[key]);
            // Assign x and y to the filteredNode under position
            filteredNode.position = { x: positionObj.x, y: positionObj.y };
          } else if (key !== 'style' && node[key] !== null) {
            // For other attributes, copy non-null values directly
            filteredNode[key] = node[key];
          }
        }

        // Add style for group nodes
        if (filteredNode.type === 'group') {
          filteredNode.style = {
            width: '300px',
            minHeight: '400px',
            height: 'auto !important',
            backgroundColor: 'rgba(208, 192, 247, 0.2)',
            zIndex: '999',
            position: 'relative !important'
          };
        }
        else if (filteredNode.type === 'buttonGroup') {
          filteredNode.style = {
            position: 'relative !important',
            width: '300px',
            minHeight: '150px',
            height: 'auto !important',
            backgroundColor: 'rgba(208, 192, 247, 0.2)',
            zIndex: '999'
          };
        }
        else {
          filteredNode.style = {
            position: 'absolute !important'
          };
        }

        return filteredNode;
      });
  
      const filteredEdges = data.edges.map((edge: { [x: string]: any; }) => {
        const filteredEdge = {};
        for (const key in edge) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'edge_id') {
            filteredEdge['id'] = edge[key]; // Rename edge_id to id
          } else if (edge[key] !== null) {
            filteredEdge[key] = edge[key];
          }
        }
        return filteredEdge;
      });
  
      // Update state with filtered nodes and edges
      setNodes(filteredNodes);
      setEdges(filteredEdges);
    } catch (error) {
      console.error('Failed to fetch data on mount:', error);
      // Handle error as needed
    }
  };

  export const loadDataOnMountSinhala = async (setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; }, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; }) => {
    try {
      const data = await fetchDataFlowDataSinhala();
  
      const filteredNodes = data.nodes.map((node: { [x: string]: any; }) => {
        const filteredNode = {};
        for (const key in node) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'node_id') {
            filteredNode['id'] = node[key]; // Rename node_id to id
          } else if (key === 'position' && node[key] !== null) {
            // Parse the position string into an object
            const positionObj = JSON.parse(node[key]);
            // Assign x and y to the filteredNode under position
            filteredNode.position = { x: positionObj.x, y: positionObj.y };
          } else if (key !== 'style' && node[key] !== null) {
            // For other attributes, copy non-null values directly
            filteredNode[key] = node[key];
          }
        }

        // Add style for group nodes
        if (filteredNode.type === 'group') {
          filteredNode.style = {
            width: '300px',
            minHeight: '400px',
            height: 'auto !important',
            backgroundColor: 'rgba(208, 192, 247, 0.2)',
            zIndex: '999',
            position: 'relative !important'
          };
        }
        else if (filteredNode.type === 'buttonGroup') {
          filteredNode.style = {
            position: 'relative !important',
            width: '300px',
            minHeight: '150px',
            height: 'auto !important',
            backgroundColor: 'rgba(208, 192, 247, 0.2)',
            zIndex: '999'
          };
        }
        else {
          filteredNode.style = {
            position: 'absolute !important'
          };
        }

        return filteredNode;
      });
  
      const filteredEdges = data.edges.map((edge: { [x: string]: any; }) => {
        const filteredEdge = {};
        for (const key in edge) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'edge_id') {
            filteredEdge['id'] = edge[key]; // Rename edge_id to id
          } else if (edge[key] !== null) {
            filteredEdge[key] = edge[key];
          }
        }
        return filteredEdge;
      });
  
      // Update state with filtered nodes and edges
      setNodes(filteredNodes);
      setEdges(filteredEdges);
    } catch (error) {
      console.error('Failed to fetch data on mount:', error);
      // Handle error as needed
    }
  };


  export const loadDataOnMountTamil = async (setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; }, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; }) => {
    try {
      const data = await fetchDataFlowDataTamil();
  
      const filteredNodes = data.nodes.map((node: { [x: string]: any; }) => {
        const filteredNode = {};
        for (const key in node) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'node_id') {
            filteredNode['id'] = node[key]; // Rename node_id to id
          } else if (key === 'position' && node[key] !== null) {
            // Parse the position string into an object
            const positionObj = JSON.parse(node[key]);
            // Assign x and y to the filteredNode under position
            filteredNode.position = { x: positionObj.x, y: positionObj.y };
          } else if (key !== 'style' && node[key] !== null) {
            // For other attributes, copy non-null values directly
            filteredNode[key] = node[key];
          }
        }

        // Add style for group nodes
        if (filteredNode.type === 'group') {
          filteredNode.style = {
            width: '300px',
            minHeight: '400px',
            height: 'auto !important',
            backgroundColor: 'rgba(208, 192, 247, 0.2)',
            zIndex: '999',
            position: 'relative !important'
          };
        }
        else if (filteredNode.type === 'buttonGroup') {
          filteredNode.style = {
            position: 'relative !important',
            width: '300px',
            minHeight: '150px',
            height: 'auto !important',
            backgroundColor: 'rgba(208, 192, 247, 0.2)',
            zIndex: '999'
          };
        }
        else {
          filteredNode.style = {
            position: 'absolute !important'
          };
        }

        return filteredNode;
      });
  
      const filteredEdges = data.edges.map((edge: { [x: string]: any; }) => {
        const filteredEdge = {};
        for (const key in edge) {
          if (key === 'id') {
            continue; // Skip the id attribute
          } else if (key === 'edge_id') {
            filteredEdge['id'] = edge[key]; // Rename edge_id to id
          } else if (edge[key] !== null) {
            filteredEdge[key] = edge[key];
          }
        }
        return filteredEdge;
      });
  
      // Update state with filtered nodes and edges
      setNodes(filteredNodes);
      setEdges(filteredEdges);
    } catch (error) {
      console.error('Failed to fetch data on mount:', error);
      // Handle error as needed
    }
  };
  


  export const getNodeData = async () => {
    try {
        // const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
        //     method: 'GET',
        //     headers: {
        //       'Content-Type': 'application/json',
        //     }
        //   });
        const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({language: english}), 
        });

          const data = await response.json();
          console.log('response buttonData ---> :', data); 


        if (!response.ok) {
          throw new Error('Failed to get node data');
        }
        return data;
      } catch (error) {
        console.error('Error deleting node:', error);
        // Handle error as needed
      }
};


export const getTamilNodeData = async () => {
  try {
      const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({language: tamil}), 
      });

        const data = await response.json();
        console.log('response buttonData ---> :', data); 


      if (!response.ok) {
        throw new Error('Failed to get node data');
      }
      return data;
    } catch (error) {
      console.error('Error deleting node:', error);
      // Handle error as needed
    }
};


export const getSinhalaNodeData = async () => {
  try {
      const response = await fetch(`${apiUrl}/data-flow-retrieve-data`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({language: sinhala}), 
      });

        const data = await response.json();
        console.log('response buttonData ---> :', data); 


      if (!response.ok) {
        throw new Error('Failed to get node data');
      }
      return data;
    } catch (error) {
      console.error('Error deleting node:', error);
      // Handle error as needed
    }
};