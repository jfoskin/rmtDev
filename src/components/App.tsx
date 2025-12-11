import Background from "./Background";
import BookmarksButton from "./BookmarksButton";
import Container from "./Container";
import Footer from "./Footer";
import Header, { HeaderTop } from "./Header";

import { useEffect, useState } from "react";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import Sidebar, { SidebarTop } from "./Sidebar";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import JobList from "./JobList";
import PaginationControls from "./PaginationControls";
import { useDebounce, useJobItems } from "../lib/hooks";
import JobItemContent from "./JobItemContent";
import { Toaster } from "react-hot-toast";
import { RESULTS_PER_PAGE } from "../lib/constants";

function App() {
	//state
	const [searchText, setSearchText] = useState("");
	const debouncedSearchText = useDebounce(searchText, 500);
	const { jobItems, isLoading } = useJobItems(debouncedSearchText);
	const [currentPage, setCurrentPage] = useState(1);

	//I could return an array here and rename the item in line [jobItems,IsLoading] = useJobItems(searchText)
	// even though in my useJobItems custom hook, I returned  jobItemsSliced also,
	// returning an array you have to be mindful of how you arrange items in the array so they align with the index

	//derived state

	const totalNumberOfResults = jobItems?.length || 0;
	const totalNumberOfPages = totalNumberOfResults / RESULTS_PER_PAGE;
	const jobItemsSliced =
		jobItems?.slice(
			currentPage * RESULTS_PER_PAGE - RESULTS_PER_PAGE,
			currentPage * RESULTS_PER_PAGE
		) || [];

	//event handler //actions
	const handleChangePage = (direction: "next" | "previous") => {
		if (direction === "next") {
			setCurrentPage((prev) => prev + 1);
		} else if (direction === "previous") {
			setCurrentPage((prev) => prev - 1);
		}
	};

	return (
		<>
			<Background />
			<Header>
				<HeaderTop>
					<Logo />
					<BookmarksButton />
				</HeaderTop>

				<SearchForm searchText={searchText} setSearchText={setSearchText} />
			</Header>
			<Container>
				<Sidebar>
					<SidebarTop>
						<ResultsCount totalNumberOfResults={totalNumberOfResults} />
						<SortingControls />
					</SidebarTop>

					<JobList jobItems={jobItemsSliced} isLoading={isLoading} />

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
