import { useState,useEffect, useContext } from "react";
import { JobItem, JobItemExpanded } from "./types";
import { BASE_API_URL } from "./constants";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { fetchJobItem, fetchJobItems, handleError } from "./utils";
import BookmarksContextProvider, { BookmarksContext } from "../contexts/BookmarksContextProvider";




// export function useJobItem(id:number | null){
//     const [jobItem, setJobItem] = useState<JobItemExpanded | null>(null);
//     const [isLoading, setIsLoading] = useState(false)

// 	useEffect(() => {
// 		if(!id) return;

// 		const jobItemDetails = async () => {
//             setIsLoading(true)
// 			const response = await fetch(`${BASE_API_URL}/${id}`);
// 			const data = await response.json();
//             setIsLoading(false)
// 			setJobItem(data.jobItem);
// 		};

// 		jobItemDetails();

// 	}, [id]);

//     return {jobItem, isLoading} as const;
// }

//Refactoring useJobItem function to include react query

// type JobItemApiResponse = {
//     public: boolean;
//     jobItem: JobItemExpanded;
// }

// type JobItemsApiResponse ={
//     public: boolean,
//     sorted: boolean,
//     jobItems: JobItem[]
// }

//utility function

// const fetchJobItem =  async (id: number) : Promise<JobItemApiResponse> =>{
//     const response = await fetch(`${BASE_API_URL}/${id}`)
// if(!response.ok){
//     const errorData = await response.json()
//     throw new Error(errorData.description)

    
// }

//     const data = await response.json()
//     return data
//     }

// const fetchJobItems = async (searchText: string) : Promise<JobItemsApiResponse> =>{
//     const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

//     //4XX or 5XX error
//     if(!response.ok) {
//         const errorData = await response.json()
//         throw new Error(errorData.description)}
//     const data = await response.json()
//     return data

// }


export function useJobItem(id:number | null){
 const{data, isInitialLoading} = useQuery(
    ['job-item', id], 
    () => id ? fetchJobItem(id) : null,
    {
    staleTime: 1000*60*60,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !id ? false: true, //Boolean(id) is an option || !!id
    onError: handleError,
    });

    const jobItem = data?.jobItem
    const isLoading = isInitialLoading
    return {jobItem, isLoading} as const
}


//--------------------------------------------------------------


// export function useJobItems(searchText: string){
//     const [jobItems, setJobItems] = useState<JobItem[]>([]);
//         const [isLoading, setIsLoading] = useState(false);


//         useEffect(() => {
//             if (!searchText) return;
    
//             const fetchData = async () => {
//                 setIsLoading(true);
//                 const response = await fetch(
//                     `${BASE_API_URL}?search=${searchText}`
//                 );
//                 const data = await response.json();
//                 setIsLoading(false);
//                 setJobItems(data.jobItems);
//             };
    
//             fetchData();
//         }, [searchText]);

//         return {jobItems, isLoading} as const;

//         //I can also return an array [jobItemsSliced, isLoading ] and use the array in the app component to destructure
// }

export function useJobItems(searchText: string){
    const {data, isInitialLoading} = useQuery(
        ['job-items', searchText],
        () => fetchJobItems(searchText),
        { 
          staleTime: 1000*60*60,
          refetchOnWindowFocus: false,
          retry: false,
          enabled: !searchText ? false: true, //Boolean(searchText) is an option || !!searchText
          onError: handleError
    }
    )
    
    const jobItems = data?.jobItems;
    const isLoading = isInitialLoading;

    return {jobItems, isLoading} as const
        //I can also return an array [jobItemsSliced, isLoading ] and use the array in the app component to destructure
        //I can also return object {jobItems: data?.jobItems; isLoading: isInitialLoading;} as const  
        
}

//----------------------------------------------------------------------------------

export function useDebounce<T> (value:T, delay = 500):T {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
		const timerId = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);

		return () => clearTimeout(timerId);
	}, [value,delay]);

    return debouncedValue
}

// arrow function example of how to return a generic type 
// const useDebounce = <T>(value:T, delay=500): T =>{ const [debouncedValue, setDebouncedValue] = useState(value);

    // useEffect(() => {
	// 	const timerId = setTimeout(() => {
	// 		setDebouncedValue(value);
	// 	}, delay);

	// 	return () => clearTimeout(timerId);
	// }, [value,delay]);

    // return debouncedValue 
    // }


export function useActiveId (){
        const [activeId, setActiveId] = useState<number | null>(null);

        useEffect(() => {
            const handleHashChange = () => {
                const id = +window.location.hash.slice(1);
                setActiveId(id);
            };
            handleHashChange();
            window.addEventListener("hashchange", handleHashChange);
    
            return () => {
                window.removeEventListener("hashchange", handleHashChange);
            };
        }, []);

        return activeId
}


export function useLocalStorage<T> (key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {

    const [value, setValue] = useState(() =>
		// you can give useState a function that will run once when the
		// componenet first renders so that
		JSON.parse(localStorage.getItem(key) || JSON.stringify(initialValue ))
	);

        useEffect(() => {
            localStorage.setItem(key, JSON.stringify(value));
        }, [value, key]);

        return [value, setValue] as const

}



export function useBookmarkContext() {
	const context = useContext(BookmarksContext);

	if (!context) {
		throw new Error(
			"useBookmarkContext ust be used within BookmarksContextProvider"
		);
	}

	return context;
}

