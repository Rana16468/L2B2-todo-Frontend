import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";



const UpdateTodoModal = ({id}:{id:string}) => {

  console.log(id);

 // rtk Query Handeling 
 //const {data}=useGetSingleTodoQuery(id,{refetchOnMountOrArgChange:true});

 //console.log(data);
 
    
    const [task,setTask]=useState("");
    const [discription,setDiscription]=useState("");
    const [priority,setPriority]=useState("");
    console.log(id);

    

    //const state=useAppSelector((state)=>state.todos.todos);
  // const specifiedTask=state.find((v)=>v._id===updateId);

   //specifiedTask?.isCompleted
   //const dispatch=useAppDispatch();
   
    

    const onSubmit=(e:FormEvent)=>{
        e.preventDefault();
       // dispatch(updateFieldById({id,...{title:task,discription:discription,isCompleted:specifiedTask?.isCompleted}}))
       console.log({_id:id,task,discription,priority});


    }

   
    return (
        <Dialog>
        <DialogTrigger asChild>
        <Button  className="bg-primary-gradint  hover:border-x-green-500 text-sm font-serif"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
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
              <Input onBlur={(e)=>setTask(e.target.value)}   id="task"  className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="discription" className="text-right">
                Descriptions
              </Label>
              <Input onBlur={(e)=>setDiscription(e.target.value)}    id="discription" className="col-span-3" />
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
          <SelectLabel>Priority</SelectLabel>
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
              <Button type="submit">Update</Button>
              </DialogClose>
           
          </DialogFooter>
  
          </form>
        </DialogContent>
      </Dialog>
    );
};

export default UpdateTodoModal;