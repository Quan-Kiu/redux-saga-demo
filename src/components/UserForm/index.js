import { Input, Typography, Form, Button } from 'antd';
import React from 'react';
import { MyAction } from '../../constants';
import userAction from '../../features/users/usersAction';
import store from '../../redux/store';
import styles from './form.module.css';
const { Title } = Typography;
const UserForm = ({ onClose, currentUser }) => {
    const onFinish = (values) => {
        if (Object.keys(currentUser).length <= 0) {
            store.dispatch(userAction(MyAction.ADD_USER, values));
        } else {
            store.dispatch(
                userAction(MyAction.EDIT_USER, {
                    ...currentUser,
                    name: values.name,
                })
            );
        }
        onClose();
    };

    const onFinishFailed = (errorInfo) => {};
    return (
        <div className={styles.form} onClick={onClose}>
            <div onClick={(e) => e.stopPropagation()} className={styles.content}>
                <Typography>
                    <Title className={styles.title} level={2}>
                        User Form
                    </Title>
                </Typography>
                <Form name="basic" autoComplete="off" onFinish={onFinish} onFinishFailed={onFinishFailed}>
                    <Form.Item
                        label="Name"
                        name="name"
                        initialValue={currentUser?.name}
                        rules={[{ required: true, message: 'Please input your Name!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item>
                        <Button block type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};

export default UserForm;
