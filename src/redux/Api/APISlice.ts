
import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const baseApi= createApi({
    reducerPath:"bestApi",
    
    baseQuery:fetchBaseQuery({baseUrl:"http://localhost:3012"}),
    tagTypes:["todo"],
    endpoints:(builder)=>({
        getTodos:builder.query({
           query:(priority)=>{

             return {
                url:"/tasks",
                method:"GET",
                params:{priority}
               }
           },
           providesTags:['todo']
            
        }),
        AddTodo:builder.mutation({
            query:(data)=>{

                return {
                    url:"/task",
                    method:"POST",
                    body:data
                }
            },
            invalidatesTags:["todo"]
            
        }),
        RemoveTodo:builder.mutation({
            query:(id)=>{
                return {
                    url:`/task/${id}`,
                    method:"DELETE"
                }
            },
          invalidatesTags:["todo"]
        }),
        // fined specified data 
        getSingleTodo:builder.query({
            query:(id)=>{
                return{
                    url:`/task/${id}`,
                    method:"GET"
                }
            },
            providesTags:['todo']
        }),
        updateTodo:builder.mutation({
            query:(data)=>{
                return{
                    url:`/task/${data.id}`,
                    method:"PUT",
                    body:data.payload
                }
            },
            invalidatesTags:["todo"]
        }),
        isCompleted:builder.mutation({
            query:(data)=>{
                return{
                    url:`/isCompleted/${data.id}`,
                    method:"PUT",
                    body:data.payload
                }
            },
            invalidatesTags:["todo"]

        })
        //...post 
        //https://github.com/Apollo-Level2-Web-Dev/L2B2-todo-server/blob/main/index.js
    })
});

export const {useGetTodosQuery,useAddTodoMutation,
    useRemoveTodoMutation,useGetSingleTodoQuery,
    useUpdateTodoMutation,useIsCompletedMutation}=baseApi;
