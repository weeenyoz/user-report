export interface LoginResponse {
    token: string;
    expiresIn: number;
}

export interface SignUpResponse {
    isSignedUp: boolean;
    message: string;
}
