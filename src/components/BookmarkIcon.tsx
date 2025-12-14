import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
	id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
	const { bookmarkedIds, handleToogleBookmarks } = useContext(BookmarksContext);
	return (
		<button onClick={() => handleToogleBookmarks(id)} className="bookmark-btn">
			<BookmarkFilledIcon className="" />
		</button>
	);
}
