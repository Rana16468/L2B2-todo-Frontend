
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseApi= createApi({
    reducerPath:"bestApi",
    baseQuery:fetchBaseQuery({baseUrl:"https://jsonplaceholder.typicode.com"}),
    endpoints:(builder)=>({
        getTodos:builder.query({
           query:()=>({
           url:"/comments",
           method:"GET",

           })
            
        })
    })
});

export const {useGetTodosQuery}=baseApi;
