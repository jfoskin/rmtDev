import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type JobItemContext = {
	searchText: string;
	debouncedSearchText: string;
	handleChangeSearchText: (newSearchText: string) => void;
};

export const JobItemContext = createContext<JobItemContext | null>(null);

function JobItemContextProvider({ children }: { children: React.ReactNode }) {
	// the way this is written below is not performant because it runs and re renders
	//any time. this component is loaded. a better way to optimize is to possibly
	// use a useEffect and have an empty [] as the second option  instead of passing the variable to useState

	// const bookmarkedIdsFromLocalStorage = JSON.parse(
	// 	localStorage.getItem("bookmarkedIds") || ""
	// );

	const [searchText, setSearchText] = useState("");
	const debouncedSearchText = useDebounce(searchText, 500);

	const handleChangeSearchText = (newSearchText: string) => {
		setSearchText(newSearchText);
	};

	return (
		<JobItemContext.Provider
			value={{
				searchText,
				debouncedSearchText,
				handleChangeSearchText,
			}}
		>
			{children}
		</JobItemContext.Provider>
	);
}

export default JobItemContextProvider;
