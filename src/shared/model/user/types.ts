export interface User {
    getUser:{
    id: string;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    role: 'admin' | 'user';
}

}
