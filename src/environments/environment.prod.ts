export const environment = {
    production: true,
    endPoint: "http://45.77.243.115:8080/api/",
    domain: "http://45.77.243.115:8080",
    imageUrl: "http://45.77.243.115:8080/upload/",
    apiUrls: {
        'loginUrl': "login",

        'getProduct': 'get-game',

        'catalog': 'catalog',

        'getConfig': 'config',

        'check-email': 'check-email',

        'register': 'register',

        'getProfileUrl': 'me',

        'checkToken': 'check-token',

        'update-bio': 'me/update-bio',

        'search': 'search',

        'cart': 'cart'

    },

    getUrl: function (apiName: string) {

        return this.endPoint + this.apiUrls[apiName];
    },

    localStorageVariablesName: {

    }
}