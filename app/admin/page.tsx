'use client'

import { Button } from "@/components/ui/button";
import { Blog } from "@/lib/helper/types";
import BlogModel from "@/lib/models/BlogModel";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import React from "react";

const page = () => {
  return <Dashboard></Dashboard>;
};

const Dashboard = () => {
  const { data: session } = useSession();
  return (
    <>
      <div className="flex items-center justify-between gap-2 ">
        <div className="w-full justify-between items-center flex font-medium h-10 rounded-md">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <Button className="text-sm" variant={'destructive'} onClick={()=>signOut()}>Logout</Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2 ">
        <div className="rounded-xl border bg-card text-card-foreground shadow ">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Blogs</h3>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="h-4 w-4 text-muted-foreground"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> */}
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">+6 from last month</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow ">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Total Subscriber
            </h3>
            {/* <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="h-4 w-4 text-muted-foreground"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg> */}
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
