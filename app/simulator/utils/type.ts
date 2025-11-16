export interface process{
    id: number;
    burstTime: number;
}

export type algorithmType=""|"fcfs"|"sjf"|"rr"|"priority"|"sjtr";

export interface Process{
    processes:process[];
    timeQuantum?:number;
    algorithm?:algorithmType;
    setTimeQuantum?:(timeQuantum:number)=>void;
    addProcess:(process:process)=>void;
    deleteProcess:(id:number)=>void;
    setAlgorithm?:(algo:algorithmType)=>void
}

export interface ComputedProcess extends process{
    waitingTime:number;
    turnaroundTime:number;
    completionTime:number;
}

export interface GanttChartEntry{
    pid:string;
    start:number;
    end:number;
}

export interface GnattChartProps{
    gnatt:GanttChartEntry[];
    scale?:number;
}