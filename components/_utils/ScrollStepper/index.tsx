// Tools
import dynamic from "next/dynamic";
import useWindowSizes from "@/hooks/useWindowSizes";
// Other components
const ScrollStepper = dynamic(() => import("./_ScrollStepper"));

import type { FunctionComponent } from "react";

interface ScrollStepperWrapperProps {
    steps: {
        title: string;
        elementID: string;
    }[];
}

const ScrollStepperWrapper: FunctionComponent<ScrollStepperWrapperProps> = (props) => {
    const { width } = useWindowSizes();
    if (width > 1000) return <ScrollStepper steps={props.steps} />;
    return <></>;
};

export default ScrollStepperWrapper;
