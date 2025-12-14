import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useContext } from "react";
import { BookmarksContext } from "../contexts/BookmarksContextProvider";

type BookmarkIconProps = {
	id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
	const { bookmarkedIds, handleToogleBookmarks } = useContext(BookmarksContext);
	return (
		<button
			onClick={(event) => {
				handleToogleBookmarks(id);
				event.stopPropagation();
				event.preventDefault();
			}}
			className="bookmark-btn"
		>
			<BookmarkFilledIcon
				className={`${bookmarkedIds.includes(id) ? "filled" : ""}`}
			/>
		</button>
	);
}
