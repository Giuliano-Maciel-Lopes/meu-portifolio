import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";

type Props={
    open:boolean,
    openchange:(open:boolean)=>void

}

export function MenuHeader({open, openchange}:Props) {
 

  return (
    <Sheet open={open} onOpenChange={openchange}>
     
      <SheetTrigger asChild>
        <Button> <BiMenu /> </Button>
      </SheetTrigger>

      {/* Conteúdo do menu lateral */}
      <SheetContent side="left" className="w-64 p-4">
        <SheetHeader className="flex items-center justify-between mb-6">
          <SheetTitle>Menu</SheetTitle>
          
        </SheetHeader>

      
      </SheetContent>
    </Sheet>
  );
}
