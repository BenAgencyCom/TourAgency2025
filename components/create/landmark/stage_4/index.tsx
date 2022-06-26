// Tools
import { useEffect } from "react";
// Types
import type { FunctionComponent } from "react";
// Other components
import Preview from "./Preview";
import StageHeader from "@/components/create/_utils/StageHeader";
import Description from "@/components/create/_utils/description";
// Redux
import { actions } from "@/redux/slices/createContent";
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";

const StageFour: FunctionComponent = () => {
    const { previewMode } = useAppSelector((state) => state.createContent);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(actions.setPreviewMode(false));
    }, [dispatch]);

    return (
        <>
            <StageHeader title={previewMode ? "Description- Preview" : "Description"} stageNumber={4}></StageHeader>
            {(() => {
                if (previewMode) return <Preview />;
                else return <Description />;
            })()}
        </>
    );
};

export default StageFour;
