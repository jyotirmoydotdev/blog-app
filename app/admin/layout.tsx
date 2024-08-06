import SidebarDemo from "@/components/AdminComponents/Sidebar";
import React from "react";

export default function layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            <div className="flex">
                <SidebarDemo>
                    {children}
                </SidebarDemo>
            </div>
        </>
    )
}