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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { editGoal } from "@/lib/actions";
import { useData } from "@/app/(root)/context/Context";

function AppSettings() {
  const { user } = useUser();
  const { dispatch } = useData();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    data["user"] = user.id;
    const res = await editGoal(data);
    if (res.Success) {
      dispatch({
        type: "editGoal",
        payload: { target: +data.target },
      });
    }
  }
  return (
    <Dialog>
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
                defaultValue="3660"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="currency" className="text-right">
                currency
              </Label>
              <Input
                id="currency"
                name="currency"
                defaultValue="$"
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="submit" className="hover:bg-indigo-600">
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AppSettings;
