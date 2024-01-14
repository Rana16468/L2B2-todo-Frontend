import { createSlice, PayloadAction } from '@reduxjs/toolkit';


 export type TTodo={
    id:string;
    title:string;
    discription:string;
    priority:string;
    isCompleted:boolean;

 }
 type TInitialState={
    todos:TTodo[]
    
 }
 const  initialState :TInitialState={
    todos:[],
  

}
const TodoSlice = createSlice({
    name:"Todo",
    initialState,
    reducers:{

        AddTodo:(state,action:PayloadAction<TTodo>)=>{
            state.todos.push({...action.payload,isCompleted:false});
        },
        removeTodos:(state,action:PayloadAction<string>)=>{
           

           state.todos= state.todos.filter((v)=>v.id!==action.payload);
        },
        isCompletedToggle:(state,action:PayloadAction<string>)=>{

            const task=state.todos.find((v)=>v.id===action.payload);
            task!.isCompleted=!task?.isCompleted;
            state.todos=state?.todos?.sort((a, b) => (a.isCompleted === b.isCompleted ? 0 : a.isCompleted ? 1 : -1));
          
        },
        updateFieldById:(state,action)=>{
        
            state.todos=state.todos.map((item)=>{
                if(item.id===action.payload.id)
                {
                    return { ...item,...action.payload}
                }
                return item
            });
            console.log(  state.todos)

            
           


        }
        

    }

});
export const { AddTodo, removeTodos,isCompletedToggle,  updateFieldById} = TodoSlice.actions
export default TodoSlice.reducer

