
namespace Types {
	export interface User {
		name: string;
	}

	export interface Board {
		columns: Column[];
	}

	export interface Column {
		id: string;
		title: string;
		created: string;
		updated: string;
		cards: Card[]
	}

	export interface Card {
		id: string;
		title: string;
		description: string;
		author: User | null;
	}
}
