
import { useAppSelector } from "@/redux/hook";
import AddTodoModal from "./AddTodoModal";
import TodoCard from "./TodoCard";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/Api/APISlice";




const TodoContainer = () => {

 
    const state=useAppSelector((state)=>state.todos.todos);
    const {data}=useGetTodosQuery(undefined);
    console.log(data);
    return (
        <div>

            <div className=" flex justify-between mb-2">
            <AddTodoModal/>
               <TodoFilter/>
            </div>
          
               
                
                <div className="bg-primary-gradint  w-full h-full  rounded-xl p-[5px] space-y-3">
                   {/* <div className="bg-white text-2xl font-serif p-3 flex justify-center rounded-sm items-center">There is no task Panding</div> */}
                  

                  {
                    state?.length===0 && <div className="bg-white text-2xl font-serif p-3 flex justify-center rounded-sm items-center">There is no task Panding</div>
                  }
                  <div className="bg-white w-full h-full rounded-lg border p-5">
                    {
                        state?.map((v,index)=> <TodoCard key={index} {...v}></TodoCard>)
                    }
                  
                  
                  </div>
                    
                </div>
            </div>
       
    );
};

export default TodoContainer;