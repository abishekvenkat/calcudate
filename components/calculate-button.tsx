"use client";

import { Button } from "@/components/ui/button";
import { SquareSigma } from "lucide-react";

interface CalculateButtonProps {
  onClick: () => void;
}

export function CalculateButton({ onClick }: CalculateButtonProps) {
  return (
    <div className="flex justify-center md:justify-start">
      <Button onClick={onClick} className="w-[200px]">
        <SquareSigma className="mr-2 h-6 w-6" />
        Calculate
      </Button>
    </div>
  );
}