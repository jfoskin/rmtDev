export type JobItem = {
	id: number;
	badgeLetters: string;
	title: string;
	company: string;
	date: string;
	relevanceScore: number;
	daysAgo: number;
};

export type SearchFormProps ={
	searchText: string;
	setSearchText: (searchText:string) => void;
}