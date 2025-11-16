
import { ComputedProcess, GanttChartEntry, process } from "../utils/type";



export const fcfs=({processes}:{processes:process[]})=>{
    var gnattChart:GanttChartEntry[]=[];
    var computedProcess:ComputedProcess[]=[];
    for (let i = 0; i < processes.length; i++) {
        gnattChart.push({
            pid: `P${processes[i].id.toString()}`,
            start:(i===0)?0:gnattChart[i-1].end,
            end:((i==0)?0:gnattChart[i-1].end)+processes[i].burstTime
        })
        computedProcess.push({
            ...processes[i],
            completionTime:gnattChart[i].end,
            waitingTime:(i==0)?0:gnattChart[i-1].end,
            turnaroundTime: gnattChart[i].end-0
        });
    }




    return {    gnattChart,computedProcess};



}