"use client";
import { useProcess } from "@/context/processContext";
import React from "react";
import { algorithmType } from "../utils/type";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Cpu } from "lucide-react";

const AlgoSelector = () => {
  const { algorithm, setAlgorithm } = useProcess();

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">
        Scheduling Algorithm
      </label>
      <Select
        value={algorithm}
        onValueChange={(value: algorithmType) => setAlgorithm?.(value)}
      >
        <SelectTrigger className="w-60">
          <div className="flex items-center gap-2">
            <Cpu className="h-4 w-4 text-gray-500" />
            <SelectValue placeholder="Select an Algorithm" />
          </div>
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="fcfs">First Come First Serve (FCFS)</SelectItem>
          <SelectItem value="sjf">Shortest Job First (SJF)</SelectItem>
          <SelectItem value="sjtr">Shortest Remaining Time (SRT)</SelectItem>
          <SelectItem value="priority">Priority Scheduling</SelectItem>
          <SelectItem value="rr">Round Robin (RR)</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AlgoSelector;
