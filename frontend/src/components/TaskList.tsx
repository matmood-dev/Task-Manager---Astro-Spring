import { List, Tag, Button, Space, message } from 'antd';

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const handleDelete = async (id: number) => {
    try {
      await fetch(`http://localhost:8080/api/tasks/${id}`, {
        method: 'DELETE',
      });
      message.success('Task deleted');
      window.location.reload();
    } catch (err) {
      message.error('Delete failed');
    }
  };

  const handleToggleCompleted = async (task: Task) => {
    try {
      await fetch(`http://localhost:8080/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });
      message.success('Task updated');
      window.location.reload();
    } catch (err) {
      message.error('Update failed');
    }
  };

  return (
    <List
      header={<h3>Task List</h3>}
      bordered
      dataSource={tasks}
      renderItem={(task) => (
        <List.Item
          actions={[
            <Button
              type="link"
              onClick={() => handleToggleCompleted(task)}
            >
              {task.completed ? 'Mark Pending' : 'Mark Done'}
            </Button>,
            <Button
              type="link"
              danger
              onClick={() => handleDelete(task.id)}
            >
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={<strong>{task.title}</strong>}
            description={task.description}
          />
          {task.completed ? <Tag color="green">Done</Tag> : <Tag color="red">Pending</Tag>}
        </List.Item>
      )}
    />
  );
}
