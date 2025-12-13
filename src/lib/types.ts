export type SortBy = "relevant" | "recent";
export type PageDirection = "next" | "previous"

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

export type JobItemExpanded = JobItem & {
	description: string;
	qualifications: string[];
	reviews: Array<string>;
	duration: string;
	salary: string;
	location: string;
	coverImgURL: string;
	companyURL: string;

}