import { Button, Layout } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './notfound.module.css';
const { Content } = Layout;

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <Layout className={styles.layout}>
            <Content className={styles.content}>Not Found</Content>
            <Button onClick={() => navigate('/')} type="link">
                Về trang chủ
            </Button>
        </Layout>
    );
};

export default NotFound;
