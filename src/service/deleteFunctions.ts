import { Edge, Node, useEdgesState, useNodesState } from "reactflow";
import { loadDataOnMount, loadDataOnMountSinhala, loadDataOnMountTamil } from "./getData";
import { apiUrl } from "./idGenerateFunctions";
import { SetStateAction } from "react";


export const edgeDelete = async (edge_id: any) => {
    
    try {
        // console.log("edge_id ", edge_id)
        const response = await fetch(`${apiUrl}/data-flow-delete-edge`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: edge_id}),
        });

        if (!response.ok) {
            throw new Error('Failed to delete edge');
        }
        console.log("edge response : ",response)
    } catch (error) {

    }
}


export const deleteNodeCall = async (id: any , type: string, setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; } | undefined, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; } | undefined) => {
    try {
      console.log("-------------- delete id api ------- : ", id)
        const response = await fetch(`${apiUrl}/data-flow-delete-node`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({id, type}), 
          });
    
        if (!response.ok) {
          throw new Error('Failed to delete node');
        }
        loadDataOnMount(setNodes, setEdges);
        // console.log('Node deleted:', id);
      } catch (error) {
        console.error('Error deleting node:', error);
        // Handle error as needed
      }
      
};

export const deleteNodeCallSinhala = async (id: any , type: string, setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; } | undefined, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; } | undefined) => {
  try {
    console.log("-------------- delete id api ------- : ", id)
      const response = await fetch(`${apiUrl}/data-flow-delete-node`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, type}), 
        });
  
      if (!response.ok) {
        throw new Error('Failed to delete node');
      }
      loadDataOnMountSinhala(setNodes, setEdges);
      // console.log('Node deleted:', id);
    } catch (error) {
      console.error('Error deleting node:', error);
      // Handle error as needed
    }
    
};

export const deleteNodeCallTamil = async (id: any , type: string, setNodes: { (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (value: SetStateAction<Node<any, string | undefined>[]>): void; (arg0: any): void; } | undefined, setEdges: { (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (value: SetStateAction<Edge<any>[]>): void; (arg0: any): void; } | undefined) => {
  try {
    console.log("-------------- delete id api ------- : ", id)
      const response = await fetch(`${apiUrl}/data-flow-delete-node`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({id, type}), 
        });
  
      if (!response.ok) {
        throw new Error('Failed to delete node');
      }
      loadDataOnMountTamil(setNodes, setEdges);
      // console.log('Node deleted:', id);
    } catch (error) {
      console.error('Error deleting node:', error);
      // Handle error as needed
    }
    
};