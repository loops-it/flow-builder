import React, { useCallback } from 'react';
import {
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  useReactFlow,
} from 'reactflow';
import { IoIosCloseCircle } from "react-icons/io";


export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const { setEdges, getEdgeById } = useReactFlow();
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  const onEdgeClick = () => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  };

  const apiUrl = 'https://dfcc-chat-bot.vercel.app';


  const deleteEdge = useCallback(async (id: string) => {
    console.log("edge id : ", id)
    try {
      // Make API call to delete the edge
      const response = await fetch(`${apiUrl}/data-flow-delete-edge`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(id), 
      });
  
      if (!response.ok) {
        throw new Error('Failed to delete edge');
      }
  
      setEdges(edges => {
        const updatedEdges = edges.filter(edge => edge.id !== id);
        console.log('Updated Edge List (delete):', updatedEdges);
        return updatedEdges;
      });

    } catch (error) {
      console.error('Error deleting edge:', error);
    }
  }, [ setEdges]);




  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          <button className="edgebutton" onClick={deleteEdge}>
            <IoIosCloseCircle style={{ color: '#000 !important' }} />
          </button>
        </div>
      </EdgeLabelRenderer>
    </>
  );
}
