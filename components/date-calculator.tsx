"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { format, differenceInDays, differenceInBusinessDays, add, sub } from "date-fns";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { DateInput } from "./date-input";
import { CalculateButton } from "./calculate-button";

export function DateCalculator() {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [includeEndDay, setIncludeEndDay] = useState(false);
  const [singleDate, setSingleDate] = useState<Date>();
  const [years, setYears] = useState("0");
  const [months, setMonths] = useState("0");
  const [weeks, setWeeks] = useState("0");
  const [days, setDays] = useState("0");
  const [operation, setOperation] = useState("add");
  const [useBusinessDays, setUseBusinessDays] = useState(false);
  const [result, setResult] = useState<string>("");
  const [addSubResult, setAddSubResult] = useState<string>("");

  const calculateDifference = () => {
    if (startDate && endDate) {
      const diff = differenceInDays(endDate, startDate);
      setResult(`${diff + (includeEndDay ? 1 : 0)} days`);
    }
  };

  const calculateAddSubtract = () => {
    if (singleDate) {
      const duration = {
        years: parseInt(years) || 0,
        months: parseInt(months) || 0,
        weeks: parseInt(weeks) || 0,
        days: parseInt(days) || 0,
      };

      let resultDate = operation === "add"
        ? add(singleDate, duration)
        : sub(singleDate, duration);

      if (useBusinessDays && duration.days > 0) {
        const totalDays = duration.days + (duration.weeks * 7);
        const direction = operation === "add" ? 1 : -1;
        let businessDays = 0;
        let currentDate = singleDate;

        while (businessDays < totalDays) {
          currentDate = add(currentDate, { days: direction });
          const dayOfWeek = currentDate.getDay();
          if (dayOfWeek !== 0 && dayOfWeek !== 6) {
            businessDays++;
          }
        }
        resultDate = currentDate;
      }

      setAddSubResult(format(resultDate, 'PPP'));
    }
  };

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Calculate Days Between Dates</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <DateInput
              label="Start Date"
              date={startDate}
              onSelect={setStartDate}
            />
            <DateInput
              label="End Date"
              date={endDate}
              onSelect={setEndDate}
            />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="includeEndDay"
                checked={includeEndDay}
                onCheckedChange={(checked) => setIncludeEndDay(checked as boolean)}
              />
              <label
                htmlFor="includeEndDay"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Include end day (adds 1 day)
              </label>
            </div>

            <CalculateButton onClick={calculateDifference} />

            {result && (
              <p className="text-lg font-medium text-center md:text-left">
                Result: {result}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Add to or Subtract from a Date</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <DateInput
              label="Date"
              date={singleDate}
              onSelect={setSingleDate}
              className="w-full md:w-1/2"
            />

            <div className="flex flex-col items-center justify-end gap-2">
              <Label className="self-start md:self-center">Operation</Label>
              <ToggleGroup
                type="single"
                value={operation}
                onValueChange={(value) => value && setOperation(value)}
                className="justify-center"
              >
                <ToggleGroupItem value="add" aria-label="Add">
                  Add
                </ToggleGroupItem>
                <ToggleGroupItem value="subtract" aria-label="Subtract">
                  Subtract
                </ToggleGroupItem>
              </ToggleGroup>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Years</Label>
              <Input
                type="number"
                value={years}
                onChange={(e) => setYears(e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Months</Label>
              <Input
                type="number"
                value={months}
                onChange={(e) => setMonths(e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Weeks</Label>
              <Input
                type="number"
                value={weeks}
                onChange={(e) => setWeeks(e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Days</Label>
              <Input
                type="number"
                value={days}
                onChange={(e) => setDays(e.target.value)}
                min="0"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="businessDays"
              checked={useBusinessDays}
              onCheckedChange={(checked) => setUseBusinessDays(checked as boolean)}
            />
            <label
              htmlFor="businessDays"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Calculate in business days
            </label>
          </div>

          <CalculateButton onClick={calculateAddSubtract} />

          {addSubResult && (
            <p className="text-lg font-medium text-center md:text-left">
              Result: {addSubResult}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}