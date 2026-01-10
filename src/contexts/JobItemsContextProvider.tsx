import { createContext, useState } from "react";
import { useDebounce, useSearchQuery } from "../lib/hooks";

type JobItemsContext = {
	searchText: string;
	debouncedSearchText: string;
	handleChangeSearchText: (newSearchText: string) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

function JobItemsContextProvider({ children }: { children: React.ReactNode }) {
	// the way this is written below is not performant because it runs and re renders
	//any time. this component is loaded. a better way to optimize is to possibly
	// use a useEffect and have an empty [] as the second option  instead of passing the variable to useState

	// const bookmarkedIdsFromLocalStorage = JSON.parse(
	// 	localStorage.getItem("bookmarkedIds") || ""
	// );

	//state

	const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState<SortBy>("relevant");

	//derived state

	const jobItemsSorted =
		// using the sort item here initially is mutating the array
		// which is typically a bad thing to do
		//jobItems?.sort((a, b) => {
		//instead  im going to spread and return the data in a new array.
		// this is not the most optimiized way to do this but we also don't want to change the original array
		[...(jobItems || [])]?.sort((a, b) => {
			if (sortBy === "relevant") {
				return b.relevanceScore - a.relevanceScore;
			} else {
				return a.daysAgo - b.daysAgo;
			}
		});

	const jobItemsSortedAndSliced = jobItemsSorted.slice(
		currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
		currentPage * RESULTS_PER_PAGE
	);

	//event handler //actions

	const handleChangePage = (direction: PageDirection) => {
		if (direction === "next") {
			setCurrentPage((prev) => prev + 1);
		} else if (direction === "previous") {
			setCurrentPage((prev) => prev - 1);
		}
	};

	const handleChangeSortBy = (newSortBy: SortBy) => {
		setCurrentPage(1);
		setSortBy(newSortBy);
	};

	//++++++++++++ State Management Structure Ends +++++++++++\\

	return (
		<JobItemsContext.Provider
			value={{
				jobItemsSortedAndSliced,
				handleChangePage,
				handleChangeSortBy,
			}}
		>
			{children}
		</JobItemsContext.Provider>
	);
}

export default JobItemsContextProvider;
