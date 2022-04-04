import { Button, Space, Table } from 'antd';
import React, { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import UserForm from '../../components/UserForm';
import { MyAction } from '../../constants';
import store from '../../redux/store';
import userAction from '../../redux/user/usersAction';

const Users = (props) => {
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
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
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
        <>
            <Button onClick={() => setIsOpenForm(!isOpenForm)}>Add User</Button>
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
        </>
    );
};

export default Users;
