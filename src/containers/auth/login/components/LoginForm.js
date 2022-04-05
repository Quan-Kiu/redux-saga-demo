import { Button, Form, Input, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import styles from '../login.module.css';

const LoginForm = ({ onFinish, onFinishFailed }) => {
    return (
        <Form className={styles.form} name="basic" onFinish={onFinish} onFinishFailed={onFinishFailed}>
            <Typography>
                <Title className={styles.title} level={2}>
                    Login Form
                </Title>
            </Typography>
            <Form.Item
                label="UserName"
                name="username"
                rules={[
                    { required: true, message: 'Please input your Username!' },
                    {
                        min: 5,
                        message: 'Username must be minium 5 characters.',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    { required: true, message: 'Please input your Password!' },
                    {
                        min: 6,
                        message: 'Password must be minium 6 characters.',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item>
                <Button block type="primary" htmlType="submit">
                    Login
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
