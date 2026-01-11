import JobListItem from "./JobListItem";
import Spinner from "./Spinner";

import { useActiveIdContext, useJobItemsContext } from "../lib/hooks";

export function JobList() {
	const { jobItems, isLoading } = useJobItemsContext();
	const { activeId } = useActiveIdContext();
	return (
		<ul className="job-list">
			{isLoading && <Spinner />}
			{!isLoading &&
				jobItems?.map((jobItem) => (
					<JobListItem
						key={jobItem.id}
						jobItem={jobItem}
						isActive={jobItem.id === activeId}
					/>
				))}
		</ul>
	);
}

export default JobList;
