export class User {
    userId?: number;
    username?: string;
    password?: string;
    email?: string;

    constructor(userId?: number, username?: string, password?: string, email?: string) {
        this.userId = userId;
        this.username = username;
        this.password = password;
        this.email = email;
    }
}
