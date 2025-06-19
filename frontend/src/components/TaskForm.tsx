import { Form, Input, Button, Checkbox, message } from 'antd';

export default function TaskForm() {
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
  console.log('Submitting:', values); // DEBUG LOG

  try {
    const response = await fetch('http://localhost:8080/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });

    console.log('Response:', response.status); // DEBUG LOG

    if (!response.ok) {
      throw new Error('Failed to add task');
    }

    message.success('Task added');
    form.resetFields();
    window.location.reload();
  } catch (error) {
    console.error('Error:', error); // DEBUG LOG
    message.error('Error adding task');
  }
};


  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="title" label="Title" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="description" label="Description" rules={[{ required: true }]}>
        <Input />
      </Form.Item>

      <Form.Item name="completed" valuePropName="checked">
        <Checkbox>Completed</Checkbox>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Task
        </Button>
      </Form.Item>
    </Form>
  );
}
