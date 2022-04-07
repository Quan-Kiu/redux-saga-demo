import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectUsers } from '../redux/user/usersReducer';

const useQuery = (props) => {
    const source = useSelector(selectUsers);
    const [data, setData] = useState([]);
    const location = useLocation();

    const search = new URLSearchParams(location.search).get('search') || '';

    useEffect(() => {
        setData(source.filter((current) => current.name.includes(search) || +current.id === search));
    }, [search]);

    return { data };
};

useQuery.propTypes = {};

export default useQuery;
