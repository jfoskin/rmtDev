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
import JobItemContent from "./JobItemContent";
import { Toaster } from "react-hot-toast";

function App() {
	//++++++++++++ State Management Structure +++++++++++\\

	//I could return an array here and rename the item in line [jobItems,IsLoading] = useJobItems(searchText)
	// even though in my useJobItems custom hook, I returned  jobItemsSliced also,
	// returning an array you have to be mindful of how you arrange items in the array so they align with the index

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
