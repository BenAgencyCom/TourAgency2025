// Tools
import RWD from "./RWD";
import { styled } from "@mui/system";
import stated from "@/utils/client/stated";
import { useState, useEffect } from "react";
import { validateDescriptionPrecisely } from "@/validators/helpers/create_destination/descriptionValidators";
// Types
import type { SxProps } from "@mui/system";
import type { FunctionComponent } from "react";
// Other Components
import Header from "./Header";
import SingleContentField from "./SingleContentField";
import ContentFieldsWrapper from "./ContentFieldsWrapper";
import Button from "@/components/create/_utils/forms/Button";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
// Redux
import { useAppSelector, useAppDispatch } from "@/hooks/useRedux";
import { actions as createContentActions } from "@/redux/slices/createContent";
// Styled components
const DescriptionWrapper = styled("section")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    ...(RWD as any),
}));
interface DescriptionProps {
    sx?: SxProps;
}

const Description: FunctionComponent<DescriptionProps> = (props) => {
    const dispatch = useAppDispatch();

    const description = useAppSelector((state) => state.createContent.list);
    const [_scrollableKey, _setScrollableKey] = useState<number>(0); // For computing `useLayoutEffect` in `ContentFieldsWrapper` component
    //
    const blockDeleting = description.length < 3;
    const [preciseValidationResult, setPreciseValidationResult] = useState<boolean[]>([]);
    const [addNewContentFieldDialog, setAddNewContentFieldDialog] = useState<boolean>(false);
    //
    // Validation
    //
    useEffect(() => {
        const validationResult: boolean[] = validateDescriptionPrecisely(description.map((target) => target.data));
        const atLeastOneFieldIsInvalid: boolean = validationResult.findIndex((target) => target === false) !== -1;
        const contentIsTooSmall: boolean = description.length < 2;

        const getReason = (): string => {
            if (contentIsTooSmall) return "at least 2 correctly filled fields are required";
            else if (atLeastOneFieldIsInvalid) return "every field has to be filled correctly";
            return "";
        };

        setPreciseValidationResult(validationResult);

        dispatch(
            createContentActions.handleValidationResult({
                disableNavigation: contentIsTooSmall || atLeastOneFieldIsInvalid,
                reason: getReason(),
            })
        );
    }, [description, props, dispatch]);

    return (
        <DescriptionWrapper sx={props.sx}>
            <Header addNewContentFieldDialog={stated(addNewContentFieldDialog, setAddNewContentFieldDialog)}></Header>

            <ContentFieldsWrapper
                description={description} //
                _scrollableKey={_scrollableKey}
            >
                {(() => {
                    if (description.length) {
                        return description.map((field, index: number) => {
                            return (
                                <SingleContentField
                                    key={`${field.id}-${field.data.type}`} //
                                    index={index}
                                    blockDeleting={blockDeleting}
                                    field={field}
                                    _setScrollableKey={_setScrollableKey}
                                    isValid={preciseValidationResult[index] ?? false}
                                ></SingleContentField>
                            );
                        });
                    } else {
                        return (
                            <ThereAreNoResults>
                                <Button primary sx={{ width: "200px" }} onClick={() => setAddNewContentFieldDialog(true)}>
                                    Start
                                </Button>
                            </ThereAreNoResults>
                        );
                    }
                })()}
            </ContentFieldsWrapper>
        </DescriptionWrapper>
    );
};

export default Description;
