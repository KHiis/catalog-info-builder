import React from 'react';
import { Form, Input, Select, Card } from 'antd';

const { Option } = Select;

const BlockForm = ({ block, updateBlockData }) => {
  const [form] = Form.useForm();

  const onValuesChange = (_, allValues) => {
    updateBlockData(block.id, allValues);
  };

  const renderFields = () => {
    switch (block.name) {
      case 'Metadata':
        return (
          <>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item label="Description" name="description">
              <Input.TextArea rows={3} />
            </Form.Item>
            {/* Additional metadata fields like 'annotations' and 'labels' can be added here */}
          </>
        );
      case 'Spec':
        return (
          <>
            <Form.Item label="Type" name="type" rules={[{ required: true }]}>
              <Select>
                <Option value="service">Service</Option>
                <Option value="website">Website</Option>
                {/* Add more options as per your needs */}
              </Select>
            </Form.Item>
            <Form.Item label="Lifecycle" name="lifecycle">
              <Select>
                <Option value="experimental">Experimental</Option>
                <Option value="production">Production</Option>
                {/* Add more options as per your needs */}
              </Select>
            </Form.Item>
            <Form.Item label="Owner" name="owner">
              <Input />
            </Form.Item>
            <Form.Item label="Provides APIs" name="providesApis">
              <Select mode="tags" placeholder="Enter API names">
                {/* Tags input for multiple APIs */}
              </Select>
            </Form.Item>
            <Form.Item label="Consumes APIs" name="consumesApis">
              <Select mode="tags" placeholder="Enter API names">
                {/* Tags input for multiple APIs */}
              </Select>
            </Form.Item>
            <Form.Item label="System" name="system">
              <Input />
            </Form.Item>
            <Form.Item label="Tags" name="tags">
              <Select mode="tags" placeholder="Enter tags">
                {/* Tags input for multiple tags */}
              </Select>
            </Form.Item>
            <Form.Item label="Subcomponent Of" name="subcomponentOf">
              <Select mode="tags" placeholder="Enter parent components">
                {/* Tags input for multiple components */}
              </Select>
            </Form.Item>
            <Form.Item label="Depends On Components" name="dependsOnComponents">
              <Select mode="tags" placeholder="Enter components">
                {/* Tags input for multiple components */}
              </Select>
            </Form.Item>
            <Form.Item label="Depends On Resources" name="dependsOnResources">
              <Select mode="tags" placeholder="Enter resources">
                {/* Tags input for multiple resources */}
              </Select>
              </Form.Item>
            {/* Include all other spec.* fields as per the Backstage descriptor format */}
          </>
        );
      case 'Relationships':
        return (
          <>
            <Form.Item label="Depends On" name="dependsOn">
              <Select mode="tags" placeholder="Enter dependencies">
                {/* Tags input for multiple dependencies */}
              </Select>
            </Form.Item>
            <Form.Item label="Dependency Of" name="dependencyOf">
              <Select mode="tags" placeholder="Enter dependents">
                {/* Tags input for multiple dependents */}
              </Select>
            </Form.Item>
            {/* Add more relationship fields as needed */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Card title={block.name} style={{ marginBottom: 20 }}>
      <Form
        form={form}
        layout="vertical"
        onValuesChange={onValuesChange}
        initialValues={block.data}
      >
        {renderFields()}
      </Form>
    </Card>
  );
};

export default BlockForm;
