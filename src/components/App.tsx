import Background from "./Background";
import BookmarksButton from "./BookmarksButton";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";

import { useState } from "react";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useSearchQuery } from "../lib/hooks";
import JobItemContent from "./JobItemContent";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";
import { PageDirection, SortBy } from "../lib/types";

function App() {
	//++++++++++++ State Management Structure +++++++++++\\

	//state

	const { jobItems, isLoading } = useSearchQuery(debouncedSearchText);
	const [currentPage, setCurrentPage] = useState(1);
	const [sortBy, setSortBy] = useState<SortBy>("relevant");

	//I could return an array here and rename the item in line [jobItems,IsLoading] = useJobItems(searchText)
	// even though in my useJobItems custom hook, I returned  jobItemsSliced also,
	// returning an array you have to be mindful of how you arrange items in the array so they align with the index

	//derived state

	const totalNumberOfResults = jobItems?.length || 0;
	const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;

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
		<>
			<Background />
			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
				</HeaderTop>

				<SearchForm />
			</Header>
			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount totalNumberOfResults={totalNumberOfResults} />
						<SortingControls onClick={handleChangeSortBy} sortBy={sortBy} />
					</SidebarTop>

					<JobList jobItems={jobItemsSortedAndSliced} isLoading={isLoading} />

					<PaginationControls
						onClick={handleChangePage}
						currentPage={currentPage}
						totalNumberOfPages={totalNumberOfPages}
					/>
				</Sidebar>
				<JobItemContent />
			</Container>
			<Footer />

			<Toaster position="top-right" />
		</>
	);
}

export default App;
