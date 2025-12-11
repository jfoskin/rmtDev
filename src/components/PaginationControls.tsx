import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

type PaginationControlProps = {
	onClick: (direction: "next" | "previous") => void;
	currentPage: number;
};

export default function PaginationControls({
	onClick,
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

			<PageButton
				direction="next"
				currentPage={currentPage}
				onClick={() => onClick("next")}
			/>
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
	direction: "next" | "previous";
	currentPage: number;
	onClick: () => void;
};

function PageButton({
	direction,
	currentPage,
	onClick,
}: PaginationButtonProps) {
	return (
		<button onClick={onClick} className="pagination__button">
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
