

//import { useAppSelector } from "@/redux/hook";
import { TTodo } from "@/redux/features/TodoSlice";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/Api/APISlice";
import { useState } from "react";





const TodoContainer = () => {



 
   //const state=useAppSelector((state)=>state.todos.todos);
    
    const [priority,setPriority]=useState("")
    const {data}=useGetTodosQuery(priority,{refetchOnMountOrArgChange:true});
    


   
    return (
        <div>

            <div className=" flex justify-between mb-2">
            <AddTodoModal/>
            <TodoFilter priority={priority} setPriority={setPriority}/>
            </div>
          
               
                
                <div className="bg-primary-gradint  w-full h-full  rounded-xl p-[5px] space-y-3">
                   {/* <div className="bg-white text-2xl font-serif p-3 flex justify-center rounded-sm items-center">There is no task Panding</div> */}
                  

                  {
                   data?.status && data?.data?.length==0 && <div className="bg-white text-2xl font-serif p-3 flex justify-center rounded-sm items-center">There is no task Panding</div>
                  }
                  <div className="bg-white w-full h-full rounded-lg border p-5">
                    {
                        data?.data?.map((v:TTodo,index:string)=> <TodoCard key={index} {...v}></TodoCard>)
                    }
                  
                  
                  </div>
                    
                </div>
            </div>
       
    );
};

export default TodoContainer;