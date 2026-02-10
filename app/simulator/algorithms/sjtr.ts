
import { ComputedProcess, GanttChartEntry, process } from "../utils/type";



export const srtf=({processes}:{processes:process[]})=>{
    const sortedProcesses=[...processes].sort((a,b)=>a.burstTime-b.burstTime)
       const gnattChart_SRTF:GanttChartEntry[]=[];
           const computedProcess_SRTF:ComputedProcess[]=[];
           for (let i = 0; i < sortedProcesses.length; i++) {
               gnattChart_SRTF.push({
                   pid: `P${sortedProcesses[i].id.toString()}`,
                   start:(i===0)?0:gnattChart_SRTF[i-1].end,
                   end:((i==0)?0:gnattChart_SRTF[i-1].end)+sortedProcesses[i].burstTime
               })
               computedProcess_SRTF.push({
               ...sortedProcesses[i],
               completionTime:gnattChart_SRTF[i].end,
               waitingTime:(i==0)?0:gnattChart_SRTF[i-1].end,
               turnaroundTime: gnattChart_SRTF[i].end-0
           });
   }
   return {    gnattChart_SRTF, computedProcess_SRTF};
}