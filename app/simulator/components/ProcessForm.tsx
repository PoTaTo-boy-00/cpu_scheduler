"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProcess } from "@/context/processContext";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Cpu } from "lucide-react";

const ProcessForm = () => {
  const [processObject, setProcessObject] = useState({
    processId: "",
    burstTime: "",
  });
  const [error, setError] = useState<string>("");
  const { processes, addProcess } = useProcess();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!processObject.processId || !processObject.burstTime) {
      setError("Please fill in all fields");
      return;
    }

    const processId = parseInt(processObject.processId);
    const burstTime = parseInt(processObject.burstTime);

    if (isNaN(processId) || processId <= 0) {
      setError("Process ID must be a positive number");
      return;
    }

    if (isNaN(burstTime) || burstTime <= 0) {
      setError("Burst Time must be a positive number");
      return;
    }

    if (processes.find((p) => p.id === processId)) {
      setError("Process ID already exists");
      return;
    }

    addProcess?.({
      id: processId,
      burstTime: burstTime,
    });

    setProcessObject({ processId: "", burstTime: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    if (value === "" || /^\d+$/.test(value)) {
      setProcessObject((prev) => ({ ...prev, [field]: value }));
      setError("");
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div>
            <CardTitle className="text-xl">Add Process</CardTitle>
            <p className="text-sm text-gray-600">Enter process details</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="processId">Process ID</Label>
            <Input
              type="text"
              id="processId"
              value={processObject.processId}
              onChange={(e) => handleInputChange("processId", e.target.value)}
              placeholder="Enter process ID"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="burstTime">Burst Time</Label>
            <Input
              type="text"
              id="burstTime"
              value={processObject.burstTime}
              onChange={(e) => handleInputChange("burstTime", e.target.value)}
              placeholder="Enter burst time"
            />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={!processObject.processId || !processObject.burstTime}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Process
          </Button>
        </form>

        {processes.length > 0 && (
          <div className="mt-4 pt-4 border-t text-sm text-gray-600 text-center">
            {processes.length} processes added
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProcessForm;
