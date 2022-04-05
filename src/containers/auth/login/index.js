import { Layout } from 'antd';
import { Content } from 'antd/lib/layout/layout';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MyAction } from '../../../constants';
import authAction from '../../../redux/auth/authAction';
import { selectAuth } from '../../../redux/auth/authReducer';
import notifyAction from '../../../redux/notify/notifyAction';
import LoginForm from './components/LoginForm';
import styles from './login.module.css';

const Login = () => {
    const dispatch = useDispatch();
    const { isLoggedIn } = useSelector(selectAuth);
    const navigate = useNavigate();
    const handleOnFormFinish = (values) => {
        dispatch(authAction(MyAction.LOGIN, values));
    };

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        } else {
            navigate('/admin');
        }
    }, [isLoggedIn]);

    const handleOnFormFinishFailed = (errorInfo) => {
        dispatch(notifyAction(MyAction.NOTIFY_FAILED, errorInfo.errorFields[0].errors[0]));
    };
    return (
        <Layout>
            <Content className={styles.content}>
                <LoginForm onFinish={handleOnFormFinish} onFinishFailed={handleOnFormFinishFailed} />
            </Content>
        </Layout>
    );
};

export default Login;
