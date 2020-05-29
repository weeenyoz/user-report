export interface LoginResponse {
    token: string;
    expiresIn: number;
}

export interface SignUpResponse {
    isSignedUp: boolean;
    isSignUpFailed: boolean;
    message: string;
}
