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
import { useActiveId, useJobItem, useJobItems } from "../lib/hooks";

function App() {
	const [searchText, setSearchText] = useState("");
	const { jobItemsSliced, isLoading } = useJobItems(searchText);
	const activeId = useActiveId();
	const jobItem = useJobItem(activeId);

	//I could return an array here and rename the item in line [jobItems,IsLoading] = useJobItems(searchText)
	// even though in my useJobItems custom hook, I returned  jobItemsSliced

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
						<ResultsCount />
						<SortingControls />
					</SidebarTop>

					<JobList jobItems={jobItemsSliced} isLoading={isLoading} />

					<PaginationControls />
				</Sidebar>
			</Container>
			<Footer />
		</>
	);
}

export default App;
