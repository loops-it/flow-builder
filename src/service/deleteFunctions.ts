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