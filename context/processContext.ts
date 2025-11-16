import { Process } from "@/app/simulator/utils/type";
import { create } from "zustand";
export const useProcess=create<Process>((set)=>({
    processes:[],
    algorithm:"",
    timeQuantum:0,
    addProcess:(process)=>{
        set((state=>({
            processes:[...state.processes,process]
        })))
    },
    deleteProcess:(id)=>{
        set((state)=>({
            processes:state.processes.filter((p)=>p.id!==id)
        }))
    },
    setAlgorithm:(algo)=>{
        set(()=>(
            {algorithm:algo}
        ))
    },
    setTimeQuantum:(tq)=>{
       set(()=>(
        {timeQuantum:tq}
       ))
    }
}))