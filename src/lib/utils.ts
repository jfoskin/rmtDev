import toast from "react-hot-toast";
import { BASE_API_URL } from "./constants";
import { JobItem, JobItemExpanded } from "./types";

type JobItemApiResponse = {
    public: boolean;
    jobItem: JobItemExpanded;
}

type JobItemsApiResponse ={
    public: boolean,
    sorted: boolean,
    jobItems: JobItem[]
}




export const fetchJobItem =  async (id: number) : Promise<JobItemApiResponse> =>{
    const response = await fetch(`${BASE_API_URL}/${id}`)
if(!response.ok){
    const errorData = await response.json()
    throw new Error(errorData.description)

    
}

    const data = await response.json()
    return data
    }

export const fetchJobItems = async (searchText: string) : Promise<JobItemsApiResponse> =>{
    const response = await fetch(`${BASE_API_URL}?search=${searchText}`);

    //4XX or 5XX error
    if(!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.description)}
    const data = await response.json()
    return data

}

export const handleError = (error: unknown) => {
    let message;

    if(typeof error === 'string'){
        message = error
    }else if(error instanceof Error){
        message = error.message
    }else{
            message = 'An unknown error has occured'
    }
    
    toast.error(message)

}