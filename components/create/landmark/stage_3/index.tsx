// Tools
import joi from "joi";
import RWD from "./RWD";
import { styled } from "@mui/system";
import { useEffect, useCallback } from "react";
import restrictions from "@/utils/restrictions/createLandmark";
import useCreateLandmarkContext from "@/components/create/landmark/hooks/useCreateLandmarkContext";
// Types
import type { FunctionComponent } from "react";
// Other components
import StageHeader from "@/components/create/_utils/StageHeader";
import Thumbnail from "./right_side/Thumbnail";
import Map from "./right_side/Map";
import Title from "./left_side/Title";
import ShortDescription from "./left_side/ShortDescription";
import SelectLandmarkType from "./left_side/SelectLandmarkType";
// Redux
import { useAppDispatch } from "@/hooks/useRedux";
import { actions as createContentActions } from "@/redux/slices/createContent";
// Styled components
const StageContentWrapper = styled("div")(({ theme }) => ({
    flexGrow: "1",
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    ...(RWD as any),
}));
const ContentColumn = styled("div")(({ theme }) => ({
    width: "calc(50% - 25px)",
    display: "flex",
    flexDirection: "column",
    "&#right-side": {
        justifyContent: "space-between",
    },
}));

const StageThree: FunctionComponent = () => {
    const dispatch = useAppDispatch();
    const context = useCreateLandmarkContext();
    /** Returns **true** if any error occured */
    const validate = useCallback<() => boolean>(() => {
        const { title, shortDescription, landmarkType } = context;

        const scheme = joi.object({
            title: joi.string().min(restrictions.title.min).max(restrictions.title.max).required(),
            shortDescription: joi.string().min(restrictions.shortDescription.min).max(restrictions.shortDescription.max).required(),
            type: joi.valid("ANTIQUE", "ART", "BUILDING", "MONUMENT", "MUSEUM", "NATURE", "RESTAURANT").required(),
        });
        const { error } = scheme.validate({
            title: title.value,
            shortDescription: shortDescription.value,
            type: landmarkType.value,
        });

        return Boolean(error);
    }, [context]);

    useEffect(() => {
        dispatch(
            createContentActions.handleValidationResult({
                disableNavigation: Boolean(validate()),
                reason: "each field has to match certain restrictions",
            })
        );
    }, [dispatch, validate]);

    return (
        <>
            <StageHeader title="General information" stageNumber={3}></StageHeader>
            <StageContentWrapper>
                <ContentColumn id="left-side">
                    <Title></Title>
                    <ShortDescription sx={{ mt: "20px" }}></ShortDescription>
                    <SelectLandmarkType sx={{ mt: "20px" }}></SelectLandmarkType>
                </ContentColumn>
                <ContentColumn id="right-side">
                    <Thumbnail></Thumbnail>
                    <Map />
                </ContentColumn>
            </StageContentWrapper>
        </>
    );
};

export default StageThree;
