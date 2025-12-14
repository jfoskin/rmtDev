import { useContext, useState, createContext, useEffect } from "react";

export const BookmarksContext = createContext(null);

function BookmarksContextProvider({ children }: { children: React.ReactNode }) {
	const [bookmarkedIds, setBookmarkedIds] = useState<number[]>([]);

	const handleToogleBookmarks = (id: number) => {
		if (bookmarkedIds.includes(id)) {
			setBookmarkedIds((prev) => prev.filter((item) => item !== id));
		} else {
			setBookmarkedIds((prev) => [...prev, id]);
		}
	};

	useEffect(() => {
		localStorage.setItem("bookmarkedIds", JSON.stringify(bookmarkedIds));
	}, [bookmarkedIds]);

	return (
		<BookmarksContext.Provider value={{ bookmarkedIds, handleToogleBookmarks }}>
			{children}
		</BookmarksContext.Provider>
	);
}

export default BookmarksContextProvider;
