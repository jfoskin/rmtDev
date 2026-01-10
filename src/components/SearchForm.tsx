import { useSearchTextContext } from "../lib/hooks";

export default function SearchForm() {
	// const [searchText, setSearchText] = useState("");

	// useEffect(() => {
	// 	if (!searchText) return;

	// 	const fetchData = async () => {
	// 		const response = await fetch(
	// 			`https://bytegrad.com/course-assets/projects/rmtdev/api/data?search=${searchText}`
	// 		);
	// 		const data = response.json();
	// 		setJobItems(data.jobItems);
	// 	};

	// 	fetchData();
	// }, [searchText]);

	const { searchText, handleChangeSearchText } = useSearchTextContext();
	return (
		<form
			onSubmit={(event) => event.preventDefault()}
			action="#"
			className="search"
		>
			<button type="submit">
				<i className="fa-solid fa-magnifying-glass"></i>
			</button>

			<input
				value={searchText}
				onChange={(event) => {
					handleChangeSearchText(event.target.value);
				}}
				spellCheck="false"
				type="text"
				required
				placeholder="Find remote developer jobs..."
			/>
		</form>
	);
}
