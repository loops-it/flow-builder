import React, { memo, useState } from 'react';
import { Handle, useStore, Position, useReactFlow } from 'reactflow';
import { RiCloseCircleFill } from 'react-icons/ri';

const GroupingNode = ({ id, type, data, position }) => {
  const { setElements } = useReactFlow();
  const [groupName, setGroupName] = useState('');
  const [grouping, setGrouping] = useState(false);

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const createGroup = () => {
    setGrouping(true);
  };

  const confirmGroup = () => {
    const group = {
      id: `group-${id}`,
      type: 'group',
      data: { label: groupName },
      position: { x: position.x - 50, y: position.y - 50 }, // Adjust position as needed
      style: {
        width: '200px', // Adjust dimensions as needed
        height: '200px',
      },
      isGroup: true,
      children: [id], // Add the current node as a child
    };

    setElements((prevElements) => [...prevElements, group]);
    setGrouping(false);
    setGroupName('');
  };

  const cancelGroup = () => {
    setGrouping(false);
    setGroupName('');
  };

  return (
    <>
      <div className="elementWrap">
        <div className="wrapper plainColor elementWrap">
          <div className="inner">
            <div style={{ display: 'flex', justifyContent: 'end' }}>
              <button className="nodeCloseButton" onClick={() => console.log('Node deleted:', id)}>
                <RiCloseCircleFill style={{ color: '#000 !important', fontSize: '20px !important' }} />
              </button>
            </div>
            <label>Name</label>
            <input type="text" value={groupName} onChange={handleGroupNameChange} className="nodrag" />
            {!grouping ? (
              <button onClick={createGroup} className="saveButton">
                Create Group
              </button>
            ) : (
              <>
                <button onClick={confirmGroup} className="saveButton">
                  Confirm
                </button>
                <button onClick={cancelGroup} className="saveButton">
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      <Handle type="target" position={Position.Top} />
    </>
  );
};

export default memo(GroupingNode);
