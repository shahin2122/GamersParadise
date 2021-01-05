export interface User {
    id: number;
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    token: string;
    pictureUrl?: any;
    roles: string[];
}