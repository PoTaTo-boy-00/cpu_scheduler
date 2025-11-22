
import { ComputedProcess, GanttChartEntry, process } from "../utils/type";



export const rr=({processes,tq}:{processes:process[],tq:number})=>{
  let gnattChart_RR:GanttChartEntry[]=[];
    let computedProcess_RR:ComputedProcess[]=[];
    // let mutatedProcess:process[]=processes.map(p=>({...p}));
    let queue=processes.map(p=>({
        ...p,
        remaningTime:p.burstTime
    }))
    let time =0;
    while(queue.length>0){
        let currentProcess=queue.shift()!;
       if(currentProcess.remaningTime>tq){
        gnattChart_RR.push({
            pid:`P${currentProcess.id.toString()}`,
            start:time,
            end:time+tq
        })
        time+=tq;
        currentProcess.remaningTime-=tq;
        queue.push(currentProcess);
       }else{
        gnattChart_RR.push({
            pid:`P${currentProcess.id.toString()}`,
            start:time,
            end:time+currentProcess.remaningTime
        })
        time+=currentProcess.remaningTime;
        computedProcess_RR.push({
            ...currentProcess,
            completionTime:time,
            waitingTime:time - currentProcess.burstTime,
            turnaroundTime: time - 0
        });
       }
    }
    return {gnattChart_RR,computedProcess_RR};
}