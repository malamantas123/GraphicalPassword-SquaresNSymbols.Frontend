export const getUser = () => {
    const userStr = sessionStorage.getItem('name');
    console.log(userStr);
    if (userStr) return userStr;
    else return null;
}

// remove the user from the session storage
export const removeUserSession = () => {
    sessionStorage.removeItem('name');
}

// set the user from the session storage
export const setUserSession = (name: string) => {
    sessionStorage.setItem('name', name);
}