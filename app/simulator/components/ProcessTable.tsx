import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProcess } from "@/context/processContext";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const ProcessTable = () => {
  const { processes, deleteProcess } = useProcess();

  if (processes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 border rounded-lg">
        No processes added yet
      </div>
    );
  }

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Process ID</TableHead>
            <TableHead className="w-1/3">Burst Time</TableHead>
            <TableHead className="w-1/3 text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {processes
            .sort((a, b) => a.id - b.id)
            .map((proc) => (
              <TableRow key={proc.id}>
                <TableCell className="font-medium">P{proc.id}</TableCell>
                <TableCell>{proc.burstTime}ms</TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => deleteProcess?.(proc.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProcessTable;
