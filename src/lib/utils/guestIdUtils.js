export const generateGuestId = () => {
    return 'guest_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

export const getOrCreateGuestId = () => {
    if (typeof window === 'undefined') return null;

    let guestId = sessionStorage.getItem('guestId');
    if (!guestId) {
        guestId = generateGuestId();
        sessionStorage.setItem('guestId', guestId);
    }
    return guestId;
};

export const isUserLoggedIn = () => {
    if (typeof window === 'undefined') return false;
    return !!sessionStorage.getItem('authToken');
};