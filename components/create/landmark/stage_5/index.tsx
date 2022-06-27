// Types
import type { FunctionComponent } from "react";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import Confirmation from "./Confirmation";
import ProcessRequest from "./ProcessRequest";
import StageHeader from "@/components/create/_utils/StageHeader";

interface StageFiveProps {
    isAuthenticated: boolean | null;
    fireUploading: boolean;
    goBack: () => void;
}

const StageFive: FunctionComponent<StageFiveProps> = (props) => {
    return (
        <Fade in={true}>
            <div>
                {(() => {
                    if (props.isAuthenticated && !props.fireUploading) {
                        return (
                            <Confirmation>
                                <StageHeader title="Confirmation" stageNumber={5}></StageHeader>
                            </Confirmation>
                        );
                    } else if (props.isAuthenticated && props.fireUploading) {
                        return <ProcessRequest goBack={props.goBack} />;
                    }
                })()}
            </div>
        </Fade>
    );
};

export default StageFive;
