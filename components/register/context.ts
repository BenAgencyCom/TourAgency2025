// Tools
import { createContext } from "react";
// Types
import type { CheckWhetherAFieldIsInvalid, RegisterContextDataFields } from "@/components/register/@types";

export interface RegisterContextData extends RegisterContextDataFields {
    checkWhetherAFieldIsInvalid: CheckWhetherAFieldIsInvalid;
}

export const RegisterContext = createContext<RegisterContextData>({} as any);
