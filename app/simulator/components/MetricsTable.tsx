import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ComputedProcess } from "../utils/type";

const MetricsTable = ({
  computedProcess,
}: {
  computedProcess: ComputedProcess[];
}) => {
  if (computedProcess.length === 0) {
    return null;
  }

  const avdTAT =
    computedProcess.reduce((sum, curr) => sum + curr.turnaroundTime, 0) /
    computedProcess.length;
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-gray-900">Process Metrics</h3>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="font-semibold">Process ID</TableHead>
              <TableHead className="font-semibold">Burst Time</TableHead>
              <TableHead className="font-semibold">Waiting Time</TableHead>
              <TableHead className="font-semibold">Turnaround Time</TableHead>
              <TableHead className="font-semibold">Completion Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {computedProcess.map((process) => (
              <TableRow key={process.id} className="hover:bg-gray-50">
                <TableCell className="font-medium">P{process.id}</TableCell>
                <TableCell>{process.burstTime}ms</TableCell>
                <TableCell>{process.waitingTime}ms</TableCell>
                <TableCell>{process.turnaroundTime}ms</TableCell>
                <TableCell>{process.completionTime}ms</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="p-4 bg-gray-50 text-right font-medium">
          Average Turnaround Time: {avdTAT.toFixed(2)}ms
        </div>
      </div>
    </div>
  );
};

export default MetricsTable;
