// Next.js compatible version of built-in react hook
import { useLayoutEffect, useEffect } from "react";
const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;
export default useIsomorphicLayoutEffect;
