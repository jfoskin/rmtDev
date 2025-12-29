import { createContext } from "react";
import { useLocalStorage, useSearchQuery } from "../lib/hooks";

type BookmarksContext = {
	bookmarkedIds: number[];
	handleToogleBookmarks: (id: number) => void;
	bookmarkedJobItems: [];
	isLoading: boolean;
};

export const BookmarksContext = createContext<BookmarksContext | null>(null);

function BookmarksContextProvider({ children }: { children: React.ReactNode }) {
	// the way this is written below is not performant because it runs and re renders
	//any time. this component is loaded. a better way to optimize is to possibly
	// use a useEffect and have an empty [] as the second option  instead of passing the variable to useState

	// const bookmarkedIdsFromLocalStorage = JSON.parse(
	// 	localStorage.getItem("bookmarkedIds") || ""
	// );

	const [bookmarkedIds, setBookmarkedIds] = useLocalStorage<number[]>(
		"bookmarkIds",
		[]
	);

	const { jobItems: bookmarkedJobItems, isLoading } =
		useSearchQuery(bookmarkedIds);

	const handleToogleBookmarks = (id: number) => {
		if (bookmarkedIds.includes(id)) {
			setBookmarkedIds((prev) => prev.filter((item) => item !== id));
		} else {
			setBookmarkedIds((prev) => [...prev, id]);
		}
	};

	return (
		<BookmarksContext.Provider
			value={{
				bookmarkedIds,
				handleToogleBookmarks,
				bookmarkedJobItems,
				isLoading,
			}}
		>
			{children}
		</BookmarksContext.Provider>
	);
}

export default BookmarksContextProvider;
