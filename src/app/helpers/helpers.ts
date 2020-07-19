

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

    static saveChosenLanguage(language: string): void {
      localStorage.setItem('chosenLanguage', JSON.stringify(language));
    }

    static getChosenLanguage(): string {
      const data = localStorage.getItem('chosenLanguage');
      return JSON.parse(data);
    }
}
