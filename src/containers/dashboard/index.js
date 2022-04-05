import { Button, Layout, Menu, Space, Table } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { MyAction } from '../../constants';
import authAction from '../../redux/auth/authAction';
import store from '../../redux/store';
import userAction from '../../redux/user/usersAction';
import UserForm from '../dashboard/components/UserForm';
import styles from './dashboard.module.css';

const Dashboard = (props) => {
    const [isOpenForm, setIsOpenForm] = useState(false);
    const [currentUser, setCurrentUser] = useState([]);
    const users = useSelector((state) => state.users);

    const handleEditUser = (currentUser) => {
        setCurrentUser(currentUser);
        setIsOpenForm(true);
    };

    const columns = useMemo(
        () => [
            {
                title: 'Id',
                dataIndex: 'id',
                key: 'id',
                width: '20%',
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                width: '100%',
            },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <Button onClick={() => handleEditUser(record)} type="primary">
                            Edit
                        </Button>
                        <Button onClick={() => store.dispatch(userAction(MyAction.REMOVE_USER, record))} danger>
                            Delete
                        </Button>
                    </Space>
                ),
            },
        ],
        [users]
    );

    return (
        <Layout className="layout">
            <Header>
                <div className={styles.logo}>QK</div>
                <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item onClick={() => store.dispatch(authAction(MyAction.LOGOUT))} key={1}>
                        Logout
                    </Menu.Item>
                </Menu>
            </Header>
            <Content style={{ padding: '50px' }}>
                <Button style={{ marginBottom: '40px' }} type="primary" onClick={() => setIsOpenForm(!isOpenForm)}>
                    Add User
                </Button>
                {isOpenForm && (
                    <UserForm
                        currentUser={currentUser}
                        onClose={() => {
                            setCurrentUser([]);
                            setIsOpenForm(false);
                        }}
                    />
                )}
                <Table columns={columns} dataSource={users.data} />;
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
    );
};

export default Dashboard;
