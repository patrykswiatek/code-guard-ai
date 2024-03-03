import type { FC } from 'react';

import type { InitialFormProps } from '@/types/props/initial-form.props';
import { Button, Form, Input, Select } from 'antd';
import styles from './InitialForm.module.css';
import { mergeClasses } from '@/utils/merge-classes';

const { Option } = Select;

const InitialForm: FC<InitialFormProps> = ({ className }) => {
  const [form] = Form.useForm();


  const onSubmitFrom = (values: any) => {};

  const onModelChange = (values: any) => {};

  return (
    <Form
      className={mergeClasses('InitialForm', className)}
      layout={'vertical'}
      form={form}
      initialValues={{ layout: 'vertical' }}
      onFinish={onSubmitFrom}
    >
      <Form.Item className={styles.label} label="Open AI Key">
        <Input placeholder="Enter your Open AI Key" required />
      </Form.Item>
      <Form.Item name="gender" label="Gender" rules={[{ required: true }]}>
        <Select
          placeholder="Choose Open AI model"
          onChange={onModelChange}
          allowClear
        >
          <Option value="male">male</Option>
          <Option value="female">female</Option>
          <Option value="other">other</Option>
        </Select>
      </Form.Item>
      <Form.Item>
        <Button type="primary">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default InitialForm;
