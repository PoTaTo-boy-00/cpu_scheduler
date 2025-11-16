"use client";
import React, { useState } from "react";
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
import { sjtr } from "./algorithms/sjtr";
import { priority } from "./algorithms/priority";
import { rr } from "./algorithms/rr";
import TimeQuantumInput from "./components/TimeQuantumInput";
import GanttChart from "./components/GnattChart";
import { ComputedProcess, GanttChartEntry } from "./utils/type";
import GnattChart from "./components/GnattChart";
import MetricsTable from "./components/MetricsTable";

const Simulator = () => {
  const { processes, algorithm } = useProcess();
  // const gnatt: GanttChartEntry[] = [
  //   { pid: "P1", start: 0, end: 3 },
  //   { pid: "P2", start: 3, end: 7 },
  //   { pid: "P3", start: 7, end: 10 },
  // ];
  const [gnatt, setGnatt] = useState<GanttChartEntry[]>([]);
  const [computedProcess, setComputedProcess] = useState<ComputedProcess[]>([]);

  const handleClick = () => {
    switch (algorithm) {
      case "fcfs":
        const { gnattChart, computedProcess } = fcfs({ processes: processes });
        setGnatt(gnattChart);
        setComputedProcess(computedProcess);
        break;
      case "sjf":
        sjf({ processes: processes });
        break;
      case "sjtr":
        sjtr({ processes: processes });
        break;
      case "priority":
        priority({ processes: processes });
        break;
      case "rr":
        rr({ processes: processes });
        break;
      default:
        break;
    }
  };
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

      <ProcessTable />

      <span>
        <Button onClick={handleClick}>Simulate</Button>
      </span>
      <MetricsTable computedProcess={computedProcess} />
      <GanttChart gnatt={gnatt} />
    </div>
  );
};

export default Simulator;
