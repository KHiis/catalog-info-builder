import React from 'react';
import { useDrop } from 'react-dnd';
import BlockForm from './BlockForm';

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
    <div className="editor" ref={drop} style={{ background: isOver ? '#f0f0f0' : '#fff' }}>
      <h2>Editor</h2>
      {blocks.map((block) => (
        <BlockForm key={block.id} block={block} updateBlockData={updateBlockData} />
      ))}
    </div>
  );
};

export default Editor;
