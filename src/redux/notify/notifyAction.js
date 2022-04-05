const notifyAction = (type, data = {}) => {
    return {
        type,
        payload: data,
    };
};

export default notifyAction;
