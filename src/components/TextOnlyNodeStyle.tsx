import React, { memo, useEffect, useState } from "react";
import { Handle, useStore, Position, useReactFlow } from "reactflow";
import { RiCloseCircleFill } from "react-icons/ri";
import { deleteNodeCall } from "../service/deleteFunctions";
import { apiUrl } from "../service/idGenerateFunctions";
import { getNodeData } from "../service/getData";

// const dimensionAttrs = ['width', 'height'];

export default memo(({ id, data }) => {
  const { setNodes } = useReactFlow();
  const [text, setText] = useState("");
  const [nodeId, setNodeId] = useState('');
  console.log("text only data: ", data);

  // Update title state when props change
  // useEffect(() => {

  //     getNodeData(id);

  //     console.log(text)
  //     setText('')
  // }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log("node id here : ", id);
            const nodeData = await getNodeData();

            console.log("Text Only Data:", nodeData.textOnly);

            const desiredNodeId = id; 
            const node = nodeData.textOnly.find((node: { node_id: any; }) => node.node_id === desiredNodeId);

            if (node) {
                console.log("Text:", node.text);
                setText(node.text);
            } else {
                console.log("Node not found");
            }

      } catch (error) {
        console.error("Error fetching node data:", error);
      }
    };

    fetchData();
  }, []);

  // node text area input
  const handleDescriptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setText(event.target.value);
  };

  // add data from node to node list
  const saveNode = async () => {
    try {
      console.log(" text id : ", id);
      console.log(" text text : ", text);
      const response = await fetch(`${apiUrl}/data-flow-text`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, text: text }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete node");
      }
      console.log("text : ", response);
    } catch (error) {}
  };

  useEffect(() => {
    // console.log("node id : ", nodeId)
    setNodeId(id)
}, [nodeId])
  // delete node from list
  const deleteNode = async () => {
    deleteNodeCall(nodeId, "textOnly");
    console.log("node id : ", nodeId)
    setNodes((prevNodes) => {
      const updatedNodes = prevNodes.filter((node) => node.id !== id);
      //   console.log('Updated Node List:', updatedNodes);
      return updatedNodes;
    });
    console.log("Node deleted:", id);
  };

  return (
    <>
      <div className="elementWrap" style={{ zIndex: "99998 !important" }}>
        {/* gradient */}
        <div
          className="wrapper plainColor  elementWrap"
          style={{ borderRadius: "10px", margin: "10px" }}
        >
          <div
            className="inner"
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            <div style={{ display: "flex", justifyContent: "end" }}>
              <button className="nodeCloseButton" onClick={deleteNode}>
                <RiCloseCircleFill
                  style={{
                    color: "#000 !important",
                    fontSize: "20px !important",
                  }}
                />
              </button>
            </div>
            <label style={{ marginBottom: "10px" }}>Add your text here</label>
            <textarea
              value={text}
              onChange={handleDescriptionChange}
              className="nodrag"
              style={{ marginBottom: "10px" }}
            ></textarea>
            <button onClick={saveNode} className="saveButton">
              Save
            </button>
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </>
  );
});
