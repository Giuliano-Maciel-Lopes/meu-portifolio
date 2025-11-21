import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { BiMenu } from "react-icons/bi";
import { NavHeader } from "../nav/navheader";

type Props = {
  open: boolean;
  openchange: (open: boolean) => void;
};

export function MenuHeader({ open, openchange }: Props) {
  return (
    <Sheet open={open} onOpenChange={openchange}>
      <SheetTrigger asChild>
        <Button>
          {" "}
          <BiMenu />{" "}
        </Button>
      </SheetTrigger>

      <SheetContent side="left" className="max-w-md p-4">

        <SheetHeader className="flex items-center justify-between mb-6">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-20">
           <NavHeader className="flex flex-col gap-4"/>
        </div>
       

      </SheetContent>
    </Sheet>
  );
}
