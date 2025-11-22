
import { ComputedProcess, GanttChartEntry, process } from "../utils/type";



export const sjf=({processes}:{processes:process[]})=>{
     const sortedProcesses=[...processes].sort((a,b)=>a.burstTime-b.burstTime)
    var gnattChart_SJF:GanttChartEntry[]=[];
        var computedProcess_SJF:ComputedProcess[]=[];
        for (let i = 0; i < sortedProcesses.length; i++) {
            gnattChart_SJF.push({
                pid: `P${sortedProcesses[i].id.toString()}`,
                start:(i===0)?0:gnattChart_SJF[i-1].end,
                end:((i==0)?0:gnattChart_SJF[i-1].end)+sortedProcesses[i].burstTime
            })
            computedProcess_SJF.push({
            ...sortedProcesses[i],
            completionTime:gnattChart_SJF[i].end,
            waitingTime:(i==0)?0:gnattChart_SJF[i-1].end,
            turnaroundTime: gnattChart_SJF[i].end-0
        });
}
return {    gnattChart_SJF, computedProcess_SJF};
}