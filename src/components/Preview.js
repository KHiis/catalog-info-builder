import React from 'react';
import yaml from 'js-yaml';

const Preview = ({ blocks }) => {
  const generateYAML = () => {
    const yamlContent = {};

    blocks.forEach((block) => {
      switch (block.name) {
        case 'Metadata':
          yamlContent.metadata = block.data;
          break;
        case 'Spec':
          yamlContent.spec = block.data;
          break;
        case 'Relationships':
          yamlContent.relationships = block.data;
          break;
        default:
          break;
      }
    });

    // Set default apiVersion and kind if not provided
    yamlContent.apiVersion = yamlContent.apiVersion || 'backstage.io/v1alpha1';
    yamlContent.kind = yamlContent.kind || 'Component';

    return yaml.dump(yamlContent);
  };

  const downloadYAML = () => {
    const element = document.createElement('a');
    const file = new Blob([generateYAML()], { type: 'text/yaml' });
    element.href = URL.createObjectURL(file);
    element.download = 'catalog-info.yaml';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="preview">
      <h2>YAML Preview</h2>
      <pre>{generateYAML()}</pre>
      <button onClick={downloadYAML}>Download YAML</button>
    </div>
  );
};

export default Preview;
