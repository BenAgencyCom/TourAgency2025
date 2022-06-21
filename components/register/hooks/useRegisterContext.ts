// Tools
import { useContext } from "react";
import { RegisterContext } from "../context";
// Types
import type { RegisterContextData } from "../context";

// eslint-disable-next-line import/no-anonymous-default-export
export default (): RegisterContextData => useContext(RegisterContext);
