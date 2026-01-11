import { createContext, useMemo, useState } from "react";
import { useSearchQuery, useSearchTextContext } from "../lib/hooks";
import { JobItem, PageDirection, SortBy } from "../lib/types";
import { RESULTS_PER_PAGE } from "../lib/constants";

type JobItemsContext = {
	jobItems: JobItem[] | undefined;
	isLoading: boolean;
	jobItemsSortedAndSliced: JobItem[];
	totalNumberOfResults: number;
	totalNumberOfPages: number;
	currentPage: number;
	sortBy: SortBy;
	handleChangePage: (direction: PageDirection) => void;
	handleChangeSortBy: (newSortBy: SortBy) => void;
};

export const JobItemsContext = createContext<JobItemsContext | null>(null);

function JobItemsContextProvider({ children }: { children: React.ReactNode }) {
	// the way this is written below is not performant because it runs and re renders
	//any time. this component is loaded. a better way to optimize is to possibly
	// use a useEffect and have an empty [] as the second option  instead of passing the variable to useState

	// const bookmarkedIdsFromLocalStorage = JSON.parse(
	// 	localStorage.getItem("bookmarkedIds") || ""
	// );

	//dependency on other context

	const { debouncedSearchText } = useSearchTextContext();

	//state

	const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState<SortBy>("relevant");

	//derived state

	const totalNumberOfResults = jobItems?.length || 0;
	const totalNumberofPages = totalNumberOfResults / RESULTS_PER_PAGE;

	const jobItemsSorted = useMemo(
		() =>
			// using the sort item here initially is mutating the array
			// which is typically a bad thing to do
			//jobItems?.sort((a, b) => {
			//instead  im going to spread and return the data in a new array.
			// this is not the most optimiized way to do this but we also don't want to change the original array

			// also because use memo is being used we want to always remember to spread the data
			// so that the array changes this could cause a bug if not because the jobItemssortedandSLiced
			//dependency array is looking for a change in the array in order to run
			[...(jobItems || [])]?.sort((a, b) => {
				if (sortBy === "relevant") {
					return b.relevanceScore - a.relevanceScore;
				} else {
					return a.daysAgo - b.daysAgo;
				}
			}),
		[jobItems, sortBy]
	);

	const jobItemsSortedAndSliced = useMemo(
		() =>
			jobItemsSorted.slice(
				currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
				currentPage * RESULTS_PER_PAGE
			),
		[currentPage, jobItemsSorted]
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
				jobItems,
				isLoading,
				jobItemsSortedAndSliced,
				totalNumberOfResults,
				totalNumberofPages,
				currentPage,
				sortBy,
				handleChangePage,
				handleChangeSortBy,
			}}
		>
			{children}
		</JobItemsContext.Provider>
	);
}

export default JobItemsContextProvider;
