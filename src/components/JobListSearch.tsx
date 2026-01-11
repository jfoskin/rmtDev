import React from "react";
import JobList from "./JobList";
import { useJobItemsContext } from "../lib/hooks";

export default function JobListSearch() {
	const { jobItemsSortedAndSliced, isLoading } = useJobItemsContext();
	return <JobList jobItems={jobItemsSortedAndSliced} isLoadind={isLoading} />;
}
