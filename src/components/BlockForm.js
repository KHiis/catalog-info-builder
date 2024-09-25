import React from 'react';

const BlockForm = ({ block, updateBlockData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    updateBlockData(block.id, { ...block.data, [name]: value });
  };

  const renderFields = () => {
    switch (block.name) {
      case 'Metadata':
        return (
          <>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={block.data.name || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                name="description"
                value={block.data.description || ''}
                onChange={handleChange}
              />
            </label>
            {/* Add more metadata fields as needed */}
          </>
        );
      case 'Spec':
        return (
          <>
            <label>
              Type:
              <input
                type="text"
                name="type"
                value={block.data.type || ''}
                onChange={handleChange}
              />
            </label>
            <label>
              Lifecycle:
              <input
                type="text"
                name="lifecycle"
                value={block.data.lifecycle || ''}
                onChange={handleChange}
              />
            </label>
            {/* Add more spec fields as needed */}
          </>
        );
      case 'Relationships':
        return (
          <>
            <label>
              Depends On:
              <input
                type="text"
                name="dependsOn"
                value={block.data.dependsOn || ''}
                onChange={handleChange}
              />
            </label>
            {/* Add more relationship fields as needed */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div className="block-form">
      <h3>{block.name}</h3>
      {renderFields()}
    </div>
  );
};

export default BlockForm;
