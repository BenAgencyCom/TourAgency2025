// Tools
import dynamic from "next/dynamic";
// Other components
const ScrollStepper = dynamic(() => import("./_ScrollStepper"));
// Redux
import { useAppSelector } from "@/hooks/useRedux";

import type { FunctionComponent } from "react";

interface ScrollStepperWrapperProps {
    steps: {
        title: string;
        elementID: string;
    }[];
}

const ScrollStepperWrapper: FunctionComponent<ScrollStepperWrapperProps> = (props) => {
    const width = useAppSelector((state) => state.windowSizes.width);
    if (width > 1000) return <ScrollStepper steps={props.steps} />;
    return <></>;
};

export default ScrollStepperWrapper;
