
export function authHeader() {
    let user = JSON.parse(localStorage.getItem('currentUser'));
    if (user?.token) {
        return {
            "Authorization": `Bearer ${user?.token}`,
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        };
    } else {
        return {};
    }
}