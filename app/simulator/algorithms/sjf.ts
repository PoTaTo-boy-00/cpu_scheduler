
import { ComputedProcess, GanttChartEntry, process } from "../utils/type";



export const sjf=({processes}:{processes:process[]})=>{
     processes.sort((a,b)=>a.burstTime-b.burstTime)
    var gnattChart_SJF:GanttChartEntry[]=[];
        var computedProcess_SJF:ComputedProcess[]=[];
        for (let i = 0; i < processes.length; i++) {
            gnattChart_SJF.push({
                pid: `P${processes[i].id.toString()}`,
                start:(i===0)?0:gnattChart_SJF[i-1].end,
                end:((i==0)?0:gnattChart_SJF[i-1].end)+processes[i].burstTime
            })
            computedProcess_SJF.push({
            ...processes[i],
            completionTime:gnattChart_SJF[i].end,
            waitingTime:(i==0)?0:gnattChart_SJF[i-1].end,
            turnaroundTime: gnattChart_SJF[i].end-0
        });
}
return {    gnattChart_SJF, computedProcess_SJF};
}