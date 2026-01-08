import { TriangleDownIcon } from "@radix-ui/react-icons";
import BookmarksPopover from "./BookmarksPopover";
import { useEffect, useRef, useState } from "react";

export default function BookmarksButton() {
	const [isOpen, setIsOpen] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	useEffect(() => {
		const handleClick = (e: MouseEvent) => {
			if (
				e.target instanceof HTMLElement &&
				!buttonRef.current?.contains(e.target) &&
				!e.target.closest(".bookmarks-popover")
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener("click", handleClick);

		return () => {
			document.removeEventListener("click", handleClick);
		};
	}, []);

	const handleToggleBookmarksButton = () => {
		setIsOpen((prev) => !prev);
	};

	return (
		<section>
			<button
				ref={buttonRef}
				onClick={() => handleToggleBookmarksButton()}
				className="bookmarks-btn"
			>
				Bookmarks <TriangleDownIcon />
			</button>
			{isOpen && <BookmarksPopover />}
		</section>
	);
}
