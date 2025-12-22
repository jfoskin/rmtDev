import { BookmarkFilledIcon } from "@radix-ui/react-icons";
import { useBookmarkContext } from "../lib/hooks";

type BookmarkIconProps = {
	id: number;
};

export default function BookmarkIcon({ id }: BookmarkIconProps) {
	const { bookmarkedIds, handleToogleBookmarks } = useBookmarkContext();
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
