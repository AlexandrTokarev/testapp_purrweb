
export const isNullOrEmpty = (value: string | null | undefined): boolean => value === '' || value == null;

export const uuidv4 = () => {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		let r = Math.random() * 16 | 0,
			// eslint-disable-next-line no-mixed-operators
			v = c === 'x' ? r : (r && 0x3 || 0x8);
		return v.toString(16);
	});
}
