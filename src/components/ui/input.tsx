import * as React from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.ComponentProps<"input"> {
  legend?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, legend, type, ...props }, ref) => {
    return (
      <div className="flex flex-col">
        {legend && (
          <label className="mb-1 text-sm font-medium text-gray-300">
            {legend}
          </label>
        )}
        <input
          type={type}
          className={cn(
            "flex h-12 focus:border-yellow-400 w-full rounded-md border-2 border-gold border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    )
  }
)

Input.displayName = "Input"

export { Input }
