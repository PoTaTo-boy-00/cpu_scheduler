
import { ComputedProcess, GanttChartEntry, process } from "../utils/type";



export const srtf=({processes}:{processes:process[]})=>{
    processes.sort((a,b)=>a.burstTime-b.burstTime)
       var gnattChart_SRTF:GanttChartEntry[]=[];
           var computedProcess_SRTF:ComputedProcess[]=[];
           for (let i = 0; i < processes.length; i++) {
               gnattChart_SRTF.push({
                   pid: `P${processes[i].id.toString()}`,
                   start:(i===0)?0:gnattChart_SRTF[i-1].end,
                   end:((i==0)?0:gnattChart_SRTF[i-1].end)+processes[i].burstTime
               })
               computedProcess_SRTF.push({
               ...processes[i],
               completionTime:gnattChart_SRTF[i].end,
               waitingTime:(i==0)?0:gnattChart_SRTF[i-1].end,
               turnaroundTime: gnattChart_SRTF[i].end-0
           });
   }
   return {    gnattChart_SRTF, computedProcess_SRTF};
}