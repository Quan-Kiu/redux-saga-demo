const userAction = (type, data = {}) => {
    return {
        type,
        payload: data,
    };
};

export default userAction;
