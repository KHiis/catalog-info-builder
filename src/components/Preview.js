import React from 'react';
import yaml from 'js-yaml';
import { Button, Typography } from 'antd';

const { Title } = Typography;

const Preview = ({ blocks }) => {
  const generateYAML = () => {
    const yamlContent = {
      apiVersion: 'backstage.io/v1alpha1',
      kind: 'Component', // This can be dynamic if 'kind' is specified in metadata
      metadata: {},
      spec: {},
    };

    blocks.forEach((block) => {
      if (block.name === 'Metadata') {
        yamlContent.metadata = { ...yamlContent.metadata, ...block.data };
        // If 'kind' is specified in metadata, update yamlContent.kind
        if (block.data.kind) {
          yamlContent.kind = block.data.kind;
        }
      } else if (block.name === 'Spec') {
        const data = { ...block.data };

        // Convert fields that should be arrays into arrays
        const arrayFields = [
          'providesApis',
          'consumesApis',
          'tags',
          'dependsOn',
          'dependsOnComponents',
          'dependsOnResources',
          'subcomponentOf',
        ];

        arrayFields.forEach((key) => {
          if (data[key]) {
            data[key] = Array.isArray(data[key]) ? data[key] : [data[key]];
          }
        });

        yamlContent.spec = { ...yamlContent.spec, ...data };
      } else if (block.name === 'Relationships') {
        const data = { ...block.data };

        // Relationships are specified in 'spec' in the Backstage descriptor format
        const relationshipFields = ['dependsOn', 'dependencyOf'];

        relationshipFields.forEach((key) => {
          if (data[key]) {
            data[key] = Array.isArray(data[key]) ? data[key] : [data[key]];
            // Add to 'spec' under the appropriate key
            yamlContent.spec[key] = data[key];
          }
        });
      }
    });

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
    <div className="preview" style={{ padding: 20 }}>
      <Title level={2}>YAML Preview</Title>
      <pre
        style={{
          backgroundColor: '#f6f8fa',
          padding: 20,
          borderRadius: 4,
          overflowX: 'auto',
        }}
      >
        {generateYAML()}
      </pre>
      <Button type="primary" onClick={downloadYAML} style={{ marginTop: 10 }}>
        Download YAML
      </Button>
    </div>
  );
};

export default Preview;
