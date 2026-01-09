import { createContext } from "react";
import { useActiveId } from "../lib/hooks";

type ActiveIdContext = {
	activeId: number | null;
};

export const ActiveIdContext = createContext<ActiveIdContext | null>(null);

function ActiveIdContextProvider({ children }: { children: React.ReactNode }) {
	// the way this is written below is not performant because it runs and re renders
	//any time. this component is loaded. a better way to optimize is to possibly
	// use a useEffect and have an empty [] as the second option  instead of passing the variable to useState

	// const bookmarkedIdsFromLocalStorage = JSON.parse(
	// 	localStorage.getItem("bookmarkedIds") || ""
	// );

	const activeId = useActiveId();

	return (
		<ActiveIdContext.Provider
			value={{
				activeId,
			}}
		>
			{children}
		</ActiveIdContext.Provider>
	);
}

export default ActiveIdContextProvider;
