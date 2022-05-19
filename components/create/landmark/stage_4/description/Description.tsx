import { useState, useEffect } from "react";
import { validateDescription } from "@/validators/helpers/create_destination/descriptionValidators";
// Types
import type { FunctionComponent } from "react";
import { helpers } from "@/redux/slices/createContent";
// Material UI Components
import Box from "@mui/material/Box";
// Other Components
import Header from "./Header";
import ContentFieldsWrapper from "./ContentFieldsWrapper";
import SingleContentField from "./SingleContentField";
// Material UI Icons
import Newspaper from "@mui/icons-material/Newspaper";
// Redux
import { useAppSelector } from "@/hooks/useRedux";

const Description: FunctionComponent = (props) => {
    const description = useAppSelector((state) => state.createContent.list);
    const [_scrollableKey, _setScrollableKey] = useState<number>(0); // For computing `useLayoutEffect` in `ContentFieldsWrapper` component
    //
    const [blockContinue, setBlockContinue] = useState<boolean>(true);
    const blockDeleting = description.length < 3;
    //
    // Validation
    //
    useEffect(() => {
        setBlockContinue(!validateDescription(description.map((target) => target.data)));
    }, [description]);

    return (
        <Box
            component="section"
            sx={{
                color: "text.primary", //
                display: "flex",
                flexDirection: "column",
            }}
        >
            <Header></Header>

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
                                ></SingleContentField>
                            );
                        });
                    } else {
                        return <span>empty</span>;
                    }
                })()}
            </ContentFieldsWrapper>
        </Box>
    );
};

export default Description;
