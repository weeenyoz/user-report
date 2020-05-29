export interface AuthResponse {
    token: string;
    expiresIn: number;
}

export interface LoginResponse {
    isLoggedIn: boolean;
    message?: string;
}

export interface SignUpResponse {
    isSignedUp: boolean;
    isSignUpFailed: boolean;
    message: string;
}
