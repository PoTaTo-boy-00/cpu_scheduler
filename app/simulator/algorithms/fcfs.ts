
import { ComputedProcess, GanttChartEntry, process } from "../utils/type";



export const fcfs=({processes}:{processes:process[]})=>{
    var gnattChart_FCFS:GanttChartEntry[]=[];
    var computedProcess_FCFS:ComputedProcess[]=[];
    for (let i = 0; i < processes.length; i++) {
        gnattChart_FCFS.push({
            pid: `P${processes[i].id.toString()}`,
            start:(i===0)?0:gnattChart_FCFS[i-1].end,
            end:((i==0)?0:gnattChart_FCFS[i-1].end)+processes[i].burstTime
        })
        computedProcess_FCFS.push({
            ...processes[i],
            completionTime:gnattChart_FCFS[i].end,
            waitingTime:(i==0)?0:gnattChart_FCFS[i-1].end,
            turnaroundTime: gnattChart_FCFS[i].end-0
        });
    }




    return {gnattChart_FCFS,computedProcess_FCFS};



}