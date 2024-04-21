"use client";
import { useUser } from "@clerk/clerk-react";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { editGoal } from "@/lib/actions";
import { useData } from "@/app/(root)/context/Context";
import { useState } from "react";

function AppSettings() {
  const { user } = useUser();
  const { dispatch, goal } = useData();
  const [open, setOpen] = useState(false);
  const [targetError, setTargetError] = useState(null);
  const [dailyAmountError, setDailyAmountError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    setTargetError(null);
    setDailyAmountError(null);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    // Validation
    const isNumber = new RegExp("^[0-9]+$");
    if (data.target === "") {
      setTargetError("Target is required");
      return;
    }
    if (data.dailyAmount === "") {
      setDailyAmountError("Daily amount is required");
      return;
    }
    if (!isNumber.test(data.target)) {
      setTargetError("Target must be number");
      return;
    }
    if (!isNumber.test(data.dailyAmount)) {
      setDailyAmountError("Daily amount must be number");
      return;
    }
    data["user"] = user.id;
    data["userName"] = `${user.firstName} ${user.lastName}`;
    dispatch({ type: "loading" });
    const res = await editGoal(data);
    if (res.Success) {
      setOpen(false);
      setTargetError(null);
      setDailyAmountError(null);
      dispatch({
        type: "editGoal",
        payload: {
          target: +data.target,
          currency: data.currency,
          dailyAmount: +data.dailyAmount,
        },
      });
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Settings className="text-gray-500 hover:text-primary cursor-pointer" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Goal</DialogTitle>
          <DialogDescription>
            Make changes to your goal here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="target" className="text-right">
                Target
              </Label>
              <Input
                id="target"
                name="target"
                defaultValue={goal.target || 18300}
                className="col-span-3"
              />
              {targetError && (
                <span className="text-xs text-red-500 text-nowrap col-start-2 col-span-3 -mt-2">
                  {targetError}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="dailyAmount" className="text-right text-nowrap">
                Daily Amount
              </Label>
              <Input
                id="dailyAmount"
                name="dailyAmount"
                defaultValue={goal.dailyAmount || 100}
                className="col-span-3"
              />
              {dailyAmountError && (
                <span className="text-xs text-red-500 text-nowrap col-start-2 col-span-3 -mt-2">
                  {dailyAmountError}
                </span>
              )}
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currency" className="text-right">
                currency
              </Label>
              <Select name="currency" defaultValue="SR">
                <SelectTrigger className="col-span-3" id="currency">
                  <SelectValue placeholder="SR" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SR">SR</SelectItem>
                  <SelectItem value="$">$</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" className="hover:bg-indigo-600">
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AppSettings;
