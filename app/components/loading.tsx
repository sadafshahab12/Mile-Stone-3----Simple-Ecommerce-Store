import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  const cardArray = Array.from({ length: 10 });
  return (
    <>
      <div className=" max-w-7xl mx-auto p-5">
        <div className="relative my-5">
          <Skeleton className=" h-12 w-full rounded-md " />
        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-8 md:px-10 px-5">
          {cardArray.map((_, index) => (
            <div key={index}>
              <div className="border shadow-md p-5 space-y-4 rounded-md">
                <Skeleton className="w-full h-[12rem] " />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
                <Skeleton className="w-full h-10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Loading;
