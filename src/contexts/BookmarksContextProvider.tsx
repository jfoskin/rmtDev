import { createContext } from "react";
import { useLocalStorage } from "../lib/hooks";

export const BookmarksContext = createContext(null);

function BookmarksContextProvider({ children }: { children: React.ReactNode }) {
	// the way this is written below is not performant because it runs and re renders
	//any time. this component is loaded. a better way to optimize is to possibly
	// use a useEffect and have an empty [] as the second option  instead of passing the variable to useState

	// const bookmarkedIdsFromLocalStorage = JSON.parse(
	// 	localStorage.getItem("bookmarkedIds") || ""
	// );

	const [bookmarkedIds, setBookmarkedIds] = useLocalStorage();

	const handleToogleBookmarks = (id: number) => {
		if (bookmarkedIds.includes(id)) {
			setBookmarkedIds((prev) => prev.filter((item) => item !== id));
		} else {
			setBookmarkedIds((prev) => [...prev, id]);
		}
	};

	return (
		<BookmarksContext.Provider value={{ bookmarkedIds, handleToogleBookmarks }}>
			{children}
		</BookmarksContext.Provider>
	);
}

export default BookmarksContextProvider;
