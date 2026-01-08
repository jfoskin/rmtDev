import { forwardRef } from "react";
import { useBookmarkContext } from "../lib/hooks";
import JobList from "./JobList";

// could have passed props as the second parameter in the FOrward ref type of the function but,
//  if you aren't going to use the props you can just input an _ and typescript won't complain

const BookmarksPopover = forwardRef<HTMLDivElement>(function (_, ref) {
	const { bookmarkedJobItems, isLoading } = useBookmarkContext();
	return (
		<div ref={ref} className="bookmarks-popover">
			<JobList jobItems={bookmarkedJobItems} isLoading={isLoading} />
		</div>
	);
});

export default BookmarksPopover;
