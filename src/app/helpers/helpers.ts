


export default class Helpers {
    static storeUserData(data): any {
        localStorage.setItem('userData', JSON.stringify(data));
    }

    static deleteUserData(): any {
        localStorage.removeItem('userData');
    }

    static getUserData(): any {
        const data = localStorage.getItem('userData');
        return JSON.parse(data);
    }
}