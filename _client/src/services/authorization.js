import baseUrl from '../config.json';
import { handleResponse } from '../helper/handleResponse';
import { authHeader } from '../helper/authheader';


const Url = baseUrl.compilerOptions.baseUrl;

export const AuthenticationService = {
    login,
    Profile
};
function login(data) {
    return fetch(Url + 'users/authenticate', {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(handleResponse)
        .then((result) => {
            if (result.code === 200 && result.data !== null) {
                localStorage.setItem('currentUser', JSON.stringify(result.data));
            }
            return result
        })
}
function Profile() {
    return fetch(Url + 'users', {
        method: 'Get',
        headers: authHeader(),

    }).then(handleResponse)
        .then((result) => {
            return result;
        })
}
