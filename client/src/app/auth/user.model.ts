export interface User {
    username: string;
    email: string;
    password: string;
}

export interface SignUpData extends User {}
export interface LoginData extends Omit<User, 'email'> {}
