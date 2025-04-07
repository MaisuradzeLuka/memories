import { ReactNode } from "react";

export type BtnType = {
  variant: "outline" | "filled";
  children: ReactNode;
  classname?: string;
  onClick?: (arg0: any) => any;
  type?: "button" | "submit" | "reset";
  dissabled?: boolean;
};
