import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "  inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none rou [&_svg]:shrink-0  rounded-2xl ",
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
        fancy: `
  relative overflow-hidden 
  text-[14px] font-semibold
  text-[#FFCCA4]
  px-4 py-2 h-[40px]
  rounded-[10px]
  flex items-center justify-center
  transition-all duration-300
  shadow-[0_2px_6px_rgba(0,0,0,0.25),_0_1px_1px_rgba(255,255,255,0.15)_inset]
  bg-[linear-gradient(135deg,#4E2F22,#6F4E37,#926F4B,#E7A97A,#E7A97A)]
  bg-[length:250%_250%]
  hover:bg-[position:100%_0]
  backdrop-blur-[7px]
`,
        gold: `
  group/btn relative overflow-hidden isolate
  h-12 px-7 rounded-full
  font-display text-base font-semibold tracking-tight text-black
  bg-[linear-gradient(120deg,#A67C52,#FFC857_45%,#D4A373)]
  bg-[length:200%_100%] bg-[position:0%_0]
  shadow-[0_0_0_1px_rgba(255,200,87,0.35),0_10px_30px_-10px_rgba(255,200,87,0.6)]
  transition-all duration-500
  hover:bg-[position:100%_0] hover:-translate-y-0.5
  hover:shadow-[0_0_0_1px_rgba(255,200,87,0.6),0_18px_40px_-12px_rgba(255,200,87,0.85)]
  before:absolute before:inset-y-0 before:-left-1/2 before:w-1/3 before:-skew-x-12
  before:bg-white/40 before:blur-md before:content-[''] before:animate-shine
`,
        goldOutline: `
  h-12 px-7 rounded-full
  font-display text-base font-semibold tracking-tight text-amber
  border border-amber/40 bg-black/30 backdrop-blur-md
  transition-all duration-300
  hover:border-amber hover:bg-amber/10 hover:-translate-y-0.5
  hover:shadow-[0_0_24px_rgba(255,200,87,0.25)]
`,
      },
      size: {
        default: "h-9 px-4 py-2 rounded-2xl",
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
