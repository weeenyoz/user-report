export interface AuthResponse {
    token: string;
    expiresIn: number;
    isAdmin: boolean;
}

export interface LoginResponse {
    isLoggedIn: boolean;
    message?: string;
    isAdmin: boolean;
}

export interface SignUpResponse {
    isSignedUp: boolean;
    message: string;
}
