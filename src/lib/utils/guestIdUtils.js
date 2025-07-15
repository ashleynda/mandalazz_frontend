// guestIdUtils.js

// Generate UUID v4
const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// ✅ Always return a consistent guestId
export const getOrCreateGuestId = () => {
    let guestId = localStorage.getItem('guestId') || sessionStorage.getItem('guestId');

    if (!guestId) {
        guestId = generateUUID();
        console.log('🆕 Created new guest ID:', guestId);
    } else {
        console.log('🆔 Found existing guest ID:', guestId);
    }

    // Persist across storage layers
    localStorage.setItem('guestId', guestId);
    sessionStorage.setItem('guestId', guestId);

    return guestId;
};

export const getCurrentGuestId = () => {
    return localStorage.getItem('guestId') || sessionStorage.getItem('guestId');
};

export const setGuestId = (id) => {
    localStorage.setItem('guestId', id);
    sessionStorage.setItem('guestId', id);
    console.log('🆔 Guest ID set to:', id);
};

export const clearGuestId = () => {
    localStorage.removeItem('guestId');
    sessionStorage.removeItem('guestId');
    console.log('🗑️ Guest ID cleared');
};

export const initializeGuestId = () => {
    const guestId = getOrCreateGuestId();
    console.log('🚀 Guest ID initialized:', guestId);
    return guestId;
};
