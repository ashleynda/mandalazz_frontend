export const isAuthenticated = () => {
    const token = sessionStorage.getItem('authToken');
    return !!token;
};

export const getAuthToken = () => {
    return sessionStorage.getItem('authToken');
};