import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  " inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none rou [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-amber text-white shadow hover:bg-amber/80",
        destructive: "bg-red-600 text-white shadow hover:bg-red-500",
        outline: "border border-white bg-transparent text-white hover:bg-white/10",
        secondary: "bg-goldDark text-white shadow hover:bg-gold",
        ghost: "hover:bg-white/10 hover:text-amber",
        link: "text-amber underline-offset-4 hover:underline",
        icon: "text-amber text-white shadow hover:bg-gold",
      },
      size: {
        default: "h-9 px-4 py-2 rounded-md",
        sm: "h-8 px-3 text-xs rounded-sm",
        lg: "h-10 px-8 rounded-lg",
        icon: "h-9 w-9 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
