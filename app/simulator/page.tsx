"use client";
import React, { useEffect, useState } from "react";
import ProcessForm from "./components/ProcessForm";
import ProcessTable from "./components/ProcessTable";
import AlgoSelector from "./components/AlgoSelector";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { fcfs } from "./algorithms/fcfs";
import { useProcess } from "@/context/processContext";
import { sjf } from "./algorithms/sjf";
import { srtf } from "./algorithms/sjtr";
import { priority } from "./algorithms/priority";
import { rr } from "./algorithms/rr";
import TimeQuantumInput from "./components/TimeQuantumInput";
import GanttChart from "./components/GnattChart";
import { ComputedProcess, GanttChartEntry } from "./utils/type";
import GnattChart from "./components/GnattChart";
import MetricsTable from "./components/MetricsTable";

const Simulator = () => {
  const { processes, algorithm, timeQuantum } = useProcess();
  // const gnatt: GanttChartEntry[] = [
  //   { pid: "P1", start: 0, end: 3 },
  //   { pid: "P2", start: 3, end: 7 },
  //   { pid: "P3", start: 7, end: 10 },
  // ];
  const [gnatt, setGnatt] = useState<GanttChartEntry[]>([]);
  const [computedProcess, setComputedProcess] = useState<ComputedProcess[]>([]);
  const [isPriority, setPriority] = useState<boolean>(false);

  const handleClick = () => {
    switch (algorithm) {
      case "fcfs":
        const { gnattChart_FCFS, computedProcess_FCFS } = fcfs({
          processes: processes,
        });
        setGnatt(gnattChart_FCFS);
        setComputedProcess(computedProcess_FCFS);
        break;
      case "sjf":
        const { gnattChart_SJF, computedProcess_SJF } = sjf({
          processes: processes,
        });
        // console.log(gnattChart_SJF, computedProcess_SJF);
        setGnatt(gnattChart_SJF);
        setComputedProcess(computedProcess_SJF);
        break;
      case "sjtr":
        const { gnattChart_SRTF, computedProcess_SRTF } = srtf({
          processes: processes,
        });
        setGnatt(gnattChart_SRTF);
        setComputedProcess(computedProcess_SRTF);
        break;
      case "priority":
        const { gnattChart_PRIORITY, computedProcess_PRIORITY } = priority({
          processes: processes,
        });
        setGnatt(gnattChart_PRIORITY);
        setComputedProcess(computedProcess_PRIORITY);
        break;
      case "rr":
        const { gnattChart_RR, computedProcess_RR } = rr({
          processes: processes,
          tq: timeQuantum || 1,
        });
        setGnatt(gnattChart_RR);
        setComputedProcess(computedProcess_RR);
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    if (algorithm === "priority") {
      setPriority(true);
    } else {
      setPriority(false);
    }
  }, [algorithm]);
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900">
          CPU Scheduler Simulator
        </h1>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <Popover>
          <PopoverTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Process
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <ProcessForm />
          </PopoverContent>
        </Popover>

        <AlgoSelector />
      </div>
      {algorithm === "rr" && <TimeQuantumInput />}

      <ProcessTable priority={isPriority} />

      <span>
        <Button onClick={handleClick}>Simulate</Button>
      </span>
      <MetricsTable computedProcess={computedProcess} prority={isPriority} />
      <GanttChart gnatt={gnatt} />
    </div>
  );
};

export default Simulator;
