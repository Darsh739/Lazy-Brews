import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost" | "link" | "secondary"
  size?: "default" | "sm" | "lg" | "icon"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const variants = {
      default: "bg-primary text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm",
      outline: "border-2 border-primary text-primary hover:bg-primary/10",
      ghost: "hover:bg-secondary/50 text-foreground",
      link: "text-primary underline-offset-4 hover:underline",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    }

    const sizes = {
      default: "h-12 px-6 py-2",
      sm: "h-9 rounded-full px-4",
      lg: "h-14 rounded-full px-8 text-lg",
      icon: "h-12 w-12",
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-base font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
