"use client";

import Link from "next/link";
import { APP_NAME } from "@/constants/application";
import { ProtectedView } from "./protected-view";

type Props = {
  children: React.ReactNode;
};

export const AuthLayout = ({ children }: Props) => {
  return (
    <ProtectedView>
      <div className="flex h-screen flex-col items-center gap-[52px] bg-muted text-base leading-[19px] font-medium font-normal md:flex-row md:items-center md:justify-evenly md:gap-0">
        <Link
          href={"/"}
          className="mt-[50px] font-[Montserrat] text-[2rem] leading-[2.5rem] font-extrabold tracking-[0.5px] md:mx-[100px] md:mt-0"
        >
          {APP_NAME}
        </Link>
        <main className="w-full md:mr-[100px] md:w-auto">{children}</main>
      </div>
    </ProtectedView>
  );
};
