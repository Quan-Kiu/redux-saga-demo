import { Button, Form, Input, Typography } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { MyAction } from '../../../../constants';
import notifyAction from '../../../../redux/notify/notifyAction';
import userAction from '../../../../redux/user/usersAction';
import styles from './userform.module.css';
const { Title } = Typography;
const UserForm = ({ onClose, currentUser }) => {
    const dispatch = useDispatch();
    const onFinish = (values) => {
        if (Object.keys(currentUser).length <= 0) {
            dispatch(userAction(MyAction.ADD_USER, values));
        } else {
            dispatch(
                userAction(MyAction.EDIT_USER, {
                    ...currentUser,
                    name: values.name,
                })
            );
        }
        onClose();
    };

    const onFinishFailed = (errorInfo) => {
        dispatch(notifyAction(MyAction.NOTIFY_FAILED, errorInfo.errorFields[0].errors[0]));
    };

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
