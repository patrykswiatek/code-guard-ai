import type { FC } from 'react';

import { Button, Form, Input, Select } from 'antd';
import styles from './InitialForm.module.css';
import { mergeClasses } from '@/utils/merge-classes';
import { OPEN_AI_MODELS } from '@/constants/open-ai-models';
import { AIConfigFormProps, AIConfigFormValues } from '@/types/props/ai-config-form';

const { Option } = Select;

const AIConfigForm: FC<AIConfigFormProps> = ({ className }) => {
  const [form] = Form.useForm<AIConfigFormValues>();

  const onSubmitFrom = (values: AIConfigFormValues) => {
    form.resetFields();
  };

  const onModelChange = (value: AIConfigFormValues['model']) => {};

  return (
    <Form
      className={mergeClasses('InitialForm', className)}
      layout={'vertical'}
      form={form}
      initialValues={{ layout: 'vertical' }}
      autoComplete="off"
      onFinish={onSubmitFrom}
    >
      <Form.Item<AIConfigFormValues>
        className={styles.label}
        name="apiKey"
        label="Open AI Key"
        rules={[{ required: true, message: 'Please provide Open AI Api Key' }]}
      >
        <Input placeholder="Enter your Open AI Key" />
      </Form.Item>
      <Form.Item<AIConfigFormValues>
        name="model"
        label="Open AI Model"
        rules={[{ required: true, message: 'Please provide Open AI model' }]}>
        <Select
          placeholder="Choose Open AI model"
          onChange={onModelChange}
          allowClear
        >
          {OPEN_AI_MODELS.map((model) => (
            <Option key={model} value={model}>
              {model}
            </Option>
          ))}
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default AIConfigForm;
