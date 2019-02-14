const URL = 'https://jsonplaceholder.typicode.com';

export class Rest {
    constructor(){}

    getUsers() {
        return fetch(`${URL}/users`)
        .then(result =>result.json());
    }

    getPostById(id) {
        return fetch(`${URL}/posts?userId=${id}`)
        .then(result =>result.json());
    }
}

const rest = new Rest();
export default rest;