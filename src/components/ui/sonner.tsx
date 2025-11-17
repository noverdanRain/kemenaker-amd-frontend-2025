"use client";

import { cn } from "@/lib/utils";
import * as React from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

const Toaster = ({ ...props }: ToasterProps) => {
    return (
        <Sonner
            theme={"light"}
            position="bottom-right"
            className={cn(
                "group toaster !font-sans",
                "[&_[data-type=error]>[data-icon]]:text-destructive [&_[data-type=error]_[data-title]]:!text-destructive",
                "[&_[data-type=info]_[data-title]]:!text-blue-700 [&_[data-type=info]>[data-icon]]:text-blue-600",
                "[&_[data-type=success]_[data-title]]:!text-green-700 [&_[data-type=success]>[data-icon]]:text-green-600",
                "[&_[data-type=warning]_[data-title]]:!text-amber-600 [&_[data-type=warning]>[data-icon]]:text-amber-500"
            )}
            toastOptions={{
                classNames: {
                    toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground! group-[.toaster]:border-border group-[.toaster]:shadow-lg has-[[role=alert]]:border-0! has-[[role=alert]]:shadow-none! has-[[role=alert]]:bg-transparent! !shadow-none !rounded-2xl",
                    description:
                        "group-[.toast]:text-muted-foreground !text-gray-600 !text-xs",
                    actionButton:
                        "group-[.toast]:rounded-md! group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
                    cancelButton:
                        "group-[.toast]:rounded-md! group-[.toast]:bg-secondary group-[.toast]:text-secondary-foreground!",
                    title: "!font-medium",
                },
            }}
            {...props}
        />
    );
};

export { Toaster };
