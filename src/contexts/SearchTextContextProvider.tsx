import { createContext, useState } from "react";
import { useDebounce } from "../lib/hooks";

type SearchTextContext = {
	searchText: string;
	debouncedSearchText: string;
	handleChangeSearchText: (newSearchText: string) => void;
};

export const SearchTextContext = createContext<SearchTextContext | null>(null);

function SearchTextContextProvider({
	children,
}: {
	children: React.ReactNode;
}) {
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
		<SearchTextContext.Provider
			value={{
				searchText,
				debouncedSearchText,
				handleChangeSearchText,
			}}
		>
			{children}
		</SearchTextContext.Provider>
	);
}

export default SearchTextContextProvider;
