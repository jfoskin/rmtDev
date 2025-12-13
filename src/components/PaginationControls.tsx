import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { PageDirection } from "../lib/types";

type PaginationControlProps = {
	onClick: (direction: PageDirection) => void;
	currentPage: number;
	totalNumberOfPages: number;
};

export default function PaginationControls({
	onClick,
	totalNumberOfPages,
	currentPage,
}: PaginationControlProps) {
	return (
		<section className="pagination">
			{currentPage >= 1 && (
				<PageButton
					direction="previous"
					currentPage={currentPage}
					onClick={() => onClick("previous")}
				/>
			)}
			{currentPage < totalNumberOfPages && (
				<PageButton
					direction="next"
					currentPage={currentPage}
					onClick={() => onClick("next")}
				/>
			)}
			{/* <button
				onClick={() => onClick("previous")}
				className="pagination__button"
			>
				<ArrowLeftIcon />
				Page {}
			</button>
			<button onClick={() => onClick("next")} className="pagination__button">
				Page {currentPage + 1}
				<ArrowRightIcon />
			</button> */}
		</section>
	);
}

type PaginationButtonProps = {
	direction: PageDirection;
	currentPage: number;
	onClick: () => void;
};

function PageButton({
	direction,
	currentPage,
	onClick,
}: PaginationButtonProps) {
	return (
		<button
			onClick={(e) => {
				onClick();
				e.currentTarget.blur();
			}}
			className="pagination__button"
		>
			{direction === "previous" && (
				<>
					<ArrowLeftIcon />
					Page {currentPage}
				</>
			)}

			{direction === "next" && (
				<>
					Page {currentPage + 1}
					<ArrowRightIcon />
				</>
			)}
		</button>
	);
}
