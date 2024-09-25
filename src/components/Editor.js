import React from 'react';
import { useDrop } from 'react-dnd';
import BlockForm from './BlockForm';
import { Typography } from 'antd';

const { Title } = Typography;

const Editor = ({ blocks, setBlocks }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'BLOCK',
    drop: (item) => addBlock(item.name),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addBlock = (name) => {
    setBlocks((prevBlocks) => [
      ...prevBlocks,
      { id: Date.now(), name, data: {} },
    ]);
  };

  const updateBlockData = (id, data) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, data } : block
      )
    );
  };

  return (
    <div
      className="editor"
      ref={drop}
      style={{ background: isOver ? '#e6f7ff' : '#fff', minHeight: '100vh' }}
    >
      <Title level={2}>Editor</Title>
      {blocks.map((block) => (
        <BlockForm key={block.id} block={block} updateBlockData={updateBlockData} />
      ))}
    </div>
  );
};

export default Editor;
