
import { ComputedProcess, GanttChartEntry, process } from "../utils/type";



export const priority=({processes}:{processes:process[]})=>{
    const sortedProcesses=[...processes].sort((a,b)=>(a.priority!-b.priority!))
    const gnattChart_PRIORITY:GanttChartEntry[]=[];
    const computedProcess_PRIORITY:ComputedProcess[]=[];
    for (let i = 0; i < sortedProcesses.length; i++) {
        gnattChart_PRIORITY.push({
            pid: `P${sortedProcesses[i].id.toString()}`,
            start:(i===0)?0:gnattChart_PRIORITY[i-1].end,
            end:((i==0)?0:gnattChart_PRIORITY[i-1].end)+sortedProcesses[i].burstTime
        })
        computedProcess_PRIORITY.push({
            ...sortedProcesses[i],
            completionTime:gnattChart_PRIORITY[i].end,
            waitingTime:(i==0)?0:gnattChart_PRIORITY[i-1].end,
            turnaroundTime: gnattChart_PRIORITY[i].end-0
        });
    }
    return {gnattChart_PRIORITY,computedProcess_PRIORITY};
}