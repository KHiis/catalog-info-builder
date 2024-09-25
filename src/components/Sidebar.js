import React from 'react';
import { useDrag } from 'react-dnd';

const BlockItem = ({ name }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'BLOCK',
    item: { name },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className="block-item" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {name}
    </div>
  );
};

const Sidebar = () => {
  const blockTypes = ['Metadata', 'Spec', 'Relationships'];

  return (
    <div className="sidebar">
      <h2>Building Blocks</h2>
      {blockTypes.map((type) => (
        <BlockItem key={type} name={type} />
      ))}
    </div>
  );
};

export default Sidebar;
