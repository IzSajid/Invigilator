export default function Logout() {
    // Remove the tokens and user ID from local storage
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');

}

