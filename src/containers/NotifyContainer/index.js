import { message } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectNotify } from '../../redux/notify/notifyReducer';

const NotifyContainer = () => {
    const notify = useSelector(selectNotify);

    useEffect(() => {
        if (notify.success) {
            return message.success(notify.success);
        }
        if (notify.failed) {
            return message.error(notify.failed);
        }
    }, [notify]);
    return;
};

export default NotifyContainer;
