import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const usePagination = (dataSource, limit = 5) => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const page = new URLSearchParams(location.search).get('page') || 1;
    const totalPage = Math.ceil(dataSource.length / limit);
    const total = dataSource.length;
    useEffect(() => {
        const firstIndex = limit * (page - 1);
        const lastIndex = firstIndex + limit;
        setData(dataSource.slice(firstIndex, lastIndex));
    }, [page, dataSource]);
    return { data, page, limit, total, totalPage };
};

export default usePagination;
