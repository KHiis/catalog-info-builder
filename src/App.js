import React, { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const [blocks, setBlocks] = useState([]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="app">
        <Sidebar />
        <Editor blocks={blocks} setBlocks={setBlocks} />
        <Preview blocks={blocks} />
      </div>
    </DndProvider>
  );
}

export default App;
