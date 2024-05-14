import { loadDataOnMount } from "./getData";

const apiUrl = 'https://dfcc-chat-bot.vercel.app';


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


export const deleteNodeCall = async (id: any , type: string) => {
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
        // console.log('Node deleted:', id);
      } catch (error) {
        console.error('Error deleting node:', error);
        // Handle error as needed
      }
};