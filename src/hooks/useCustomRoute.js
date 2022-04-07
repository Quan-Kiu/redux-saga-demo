import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

const useCustomRoute = (props) => {
    const { pathname, search } = useLocation();
    const navigate = useNavigate();
    const pushQuery = (query) => {
        const queryObject = queryString.parse(search);
        const newQuery = new URLSearchParams({ ...queryObject, ...query }).toString();
        navigate(`${pathname}?${newQuery}`);
    };
    return { pushQuery };
};

export default useCustomRoute;
