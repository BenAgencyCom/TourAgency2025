// Tools
import { styled } from "@mui/system";
import stated from "@/utils/client/stated";
import { useState, useEffect } from "react";
import { validateDescriptionPrecisely } from "@/validators/helpers/create_destination/descriptionValidators";
// Types
import type { FunctionComponent } from "react";
import { StatedDataField } from "@/@types/StatedDataField";
// Other Components
import Header from "./Header";
import SingleContentField from "./SingleContentField";
import ContentFieldsWrapper from "./ContentFieldsWrapper";
import Button from "@/components/create/_utils/forms/Button";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
// Redux
import { useAppSelector } from "@/hooks/useRedux";
// Styled components
const DescriptionWrapper = styled("section")(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
}));
interface DescriptionProps {
    previewMode: StatedDataField<boolean>;
    disableContinueButton: StatedDataField<boolean>;
}

const Description: FunctionComponent<DescriptionProps> = (props) => {
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

        setPreciseValidationResult(validationResult);
        props.disableContinueButton.setValue(atLeastOneFieldIsInvalid);
    }, [description, props.disableContinueButton]);

    return (
        <DescriptionWrapper>
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
