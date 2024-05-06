const startNode = {
  color: '#22092C',
  borderColor: '#22092C',
};

const processNode = {
  color: '#872341',
  borderColor: '#872341',
};

const endNode = {
  color: '#BE3144',
  borderColor: '#BE3144',
};

export default [
    {
      id: '1',
      type: 'input',
      data: { label: 'Input Node' },
      position: { x: 300, y: 25 },
      style: startNode,
    },
    {
      id: '2',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 200, y: 150 },
      style: endNode,
    },
    {
      id: '3',
      type: 'output',
      data: { label: 'Output Node' },
      position: { x: 400, y: 150 },
      style: endNode,
    },
    {
      id: '4',
      data: { label: 'A' },
      position: { x: 300, y: 250 },
      style: processNode,
    },
    {
      id: '5',
      data: { label: 'B' },
      position: { x: 400, y: 400 },
      style: processNode,
    },
  ];
  