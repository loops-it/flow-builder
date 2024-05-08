// edgeFunctions.ts

import { addEdge, updateEdge } from 'reactflow';
import { generateEdgeId } from './idGenerateFunctions';
import { SetStateAction } from 'react';

export const addOrUpdateEdge = (
  params: any,
  edges: any[], 
  setEdges: (value: SetStateAction<any[]>) => void 
) => {
  if (!('id' in params)) {
    params.id = generateEdgeId();
  }
  params.type = 'button';
  setEdges((prevEdges) => {
    const newEdges = addEdge(params, prevEdges);
    console.log('Updated Edges List:', newEdges);
    return newEdges;
  });
};

export const updateExistingEdge = (
  oldEdge: any, 
  newConnection: any, 
  edges: any[], 
  setEdges: (value: SetStateAction<any[]>) => void 
) => {
  const updatedEdge = updateEdge(oldEdge, newConnection, edges);
  updatedEdge.type = 'button';
  setEdges((prevEdges) => {
    const updatedEdges = prevEdges.map((edge) =>
      edge.id === updatedEdge.id ? updatedEdge : edge
    );
    console.log('Updated Edges List:', updatedEdges);
    return updatedEdges;
  });
};

// export const onConnect = (
// params: any, setEdges: (value: SetStateAction<any[]>) => void, ) => {
//   if (!('id' in params)) {
//     params.id = generateEdgeId();
//   }
//   params.type = 'button';
//   setEdges((prevEdges) => {
//     const newEdges = addEdge(params, prevEdges);
//     console.log('Updated Edges List:', newEdges);
//     return newEdges;
//   });
// };
