
import { useGetSingleTodoQuery, useIsCompletedMutation, useRemoveTodoMutation, useUpdateTodoMutation } from "@/redux/Api/APISlice";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import Swal from "sweetalert2";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

type TTodoProps={
    _id:string;
    title:string;
    discription:string;
    priority:string;
    isCompleted:boolean
    
}
const TodoCard = ({ ...list}:TTodoProps) => {

    // update modal infromation
    const [task,setTask]=useState("");
    const [discription,setDiscription]=useState("");
    const [priority,setPriority]=useState("");
    const [selectedId,setSelectedId]=useState("");
    const {data}=useGetSingleTodoQuery(selectedId,{refetchOnMountOrArgChange:true});
    const [updateTodo,{data:updateData,isSuccess}]=useUpdateTodoMutation();
    const [taskCompleted,{data:completed}]=useIsCompletedMutation();


    
    useEffect(()=>{
        if(updateData?.status && isSuccess && updateData?.data?.acknowledged)
        {
           
            toast.success(updateData?.data?.message)
        }
    },[isSuccess,updateData]);

    useEffect(()=>{

        if(completed?.status && completed?.data?.acknowledged)
        {
            Swal.fire(completed?.message);
        }


    },[completed]);




    const onSubmit=(e:FormEvent)=>{
        e.preventDefault();
       updateTodo({id:list?._id,payload:{title:task,discription,priority,isCompleted:list?.isCompleted}})


    }
 const [deleteId]=useRemoveTodoMutation()
 const handelDelete=(id:string)=>{
  
   Swal.fire({
  title: "Are you sure?",
  text: "You won't be able to revert this!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Yes, delete it!"
}).then((result) => {
  if (result.isConfirmed) {
    deleteId(id);
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
    });
  }
});
        
    }



    const handelToggle=(status:boolean,id:string)=>{

       
        taskCompleted({id,payload:{status}})

    }

   

    //const dispatch=useAppDispatch();

    
   
   


   
    return (
        <>
          
          <div className="bg-white rounded flex justify-between items-center p-3">
    <input className="mr-3" onChange={()=>handelToggle(list?.isCompleted,list._id)} disabled={list?.isCompleted}    type="checkbox" name="completed" id="completed" />
    <p className="font-semibold flex-1">{list.title}</p>
    {list?.isCompleted? <p className="text-green-500 text-xl font-serif flex-1">Done</p>:<p className="text-red-500 text-xl font-serif flex-1">Pending</p>}
   <div className="font-semibold flex-1 flex items-center gap-2">
   <div className={` size-3 rounded-full ${list?.priority==="High"?"bg-red-500":null} ${list?.priority==="Medium"?"bg-yellow-500":null} ${list?.priority==="Low"?"bg-green-500":null}`}></div>
   <p>{list?.priority}</p>
   </div>
    
    <p  className="flex-[2]">{list.discription}</p>
    <div className="space-x-5">
    <Button onClick={()=> handelDelete(list?._id)}  className="bg-primary-gradint  text-sm font-serif"> 
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
</Button>



<Dialog>
        <DialogTrigger asChild>
        <Button onClick={()=>setSelectedId(list?._id)}  className="bg-primary-gradint  hover:border-x-green-500 text-sm font-serif"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round"  strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
       </svg>
        </Button>
        </DialogTrigger>
        
        <DialogContent  className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription>
            Update Your Task That you want to finish
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={onSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
               Task
              </Label>
              <Input onBlur={(e)=>setTask(e.target.value)} defaultValue={data?.title}   id="task"  className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discription" className="text-right">
                Descriptions
              </Label>
              <Input onBlur={(e)=>setDiscription(e.target.value)} defaultValue={data?.discription}    id="discription" className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="discription" className="text-right">
             Priority
            </Label>
            <Select onValueChange={(value)=>setPriority(value)}>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Seleted Priority :{data?.priority
}</SelectLabel>
          <SelectItem value="High">High</SelectItem>
          <SelectItem value="Medium">Medium</SelectItem>
          <SelectItem value="Low">Low</SelectItem>
          
        </SelectGroup>
      </SelectContent>
    </Select>
           
          </div>
          </div>
          <DialogFooter>
              <DialogClose asChild>
              <Button  type="submit">Update</Button>
              </DialogClose>
           
          </DialogFooter>
  
          </form>
        </DialogContent>
      </Dialog>

  
    </div>
</div>
        </>
    );
};

export default TodoCard;