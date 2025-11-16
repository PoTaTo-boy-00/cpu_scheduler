import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProcess } from "@/context/processContext";
import { Clock } from "lucide-react";

const TimeQuantumInput = () => {
  const { timeQuantum, setTimeQuantum } = useProcess();

  return (
    <div className="flex flex-col gap-2 max-w-[200px]">
      <Label className="text-sm font-medium flex items-center gap-2">
        <Clock className="h-4 w-4 text-gray-500" />
        Time Quantum
      </Label>
      <Input
        value={timeQuantum}
        onChange={(e) => setTimeQuantum?.(Number(e.target.value))}
        placeholder="Enter time quantum"
        type="number"
        min="1"
        className="transition-colors focus:ring-2 focus:ring-blue-500"
      />
      <p className="text-xs text-gray-500">For Round Robin scheduling</p>
    </div>
  );
};

export default TimeQuantumInput;
