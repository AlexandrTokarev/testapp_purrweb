
const USER_PROPERTY = 'user';

export const userService = {
	isAuth(): boolean {
		return !!localStorage.getItem(USER_PROPERTY);
	},
	login(user: Types.User): void {
		localStorage.setItem(USER_PROPERTY, JSON.stringify(user));
	},
	logout(): void {
		localStorage.removeItem(USER_PROPERTY);
	},
	getCurrentUser(): Types.User | null {
		return JSON.parse(localStorage.getItem(USER_PROPERTY) ?? 'null');
	}
}