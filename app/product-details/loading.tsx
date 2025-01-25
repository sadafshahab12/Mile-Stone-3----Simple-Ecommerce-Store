import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 gap-10 items-center  max-w-5xl mx-auto p-10">
      <Skeleton className="w-full md:h-[20rem] h-[15rem]   p-4" />
      <div className="space-y-4 p-5">
        <Skeleton className="w-full h-8 rounded-md" />
        <Skeleton className="w-full h-5 rounded-md" />
        <Skeleton className="w-full h-4 rounded-md" />
        <div className="flex items-center gap-3">
          <Skeleton className="w-32 h-10 " />
          <Skeleton className="w-10 h-10 flex justify-center items-center rounded-md" />
          <Skeleton className="w-10 h-10 flex justify-center items-center rounded-md" />
          <Skeleton className="w-10 h-10 flex justify-center items-center rounded-md" />
          <Skeleton className="w-10 h-10 flex justify-center items-center rounded-md" />
          <Skeleton className="w-10 h-10 flex justify-center items-center rounded-md" />
        </div>
        <Skeleton className="w-32 h-10 " />
        <Skeleton className="w-full h-10 " />
      </div>
    </div>
  );
};

export default Loading;
