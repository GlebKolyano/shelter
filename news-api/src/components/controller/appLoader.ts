import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.herokuapp.com/', {
            apiKey: '04b52a49a5a94d0380df3ab8189a8bae',
        });
    }
}

export default AppLoader;