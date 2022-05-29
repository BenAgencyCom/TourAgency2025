// Tools
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Other components
import PinnedReview from "./PinnedReview";
import CreateReview from "@/components/_utils/CreateReview";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import StyledButton from "@/components/create/_utils/forms/Button";

const NavigationWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    marginBottom: "40px",
    button: {
        marginRight: "10px",
    },
}));

type Section = "pinnedReview" | "createReview" | "authenticatedUserReview";

interface SelectableContentProps {
    pinnedReview: null | Review;
    authenticatedUserReview: null | Review;
}

const SelectableContent: FunctionComponent<SelectableContentProps> = (props) => {
    const router = useRouter();
    const { authenticatedUserReview, pinnedReview } = props;
    const [pinnedReviewCanBeLoaded, setPinnedReviewCanBeLoaded] = useState<boolean>(false);
    const [currentSection, setCurrentSection] = useState<Section>(
        ((): Section => {
            if (pinnedReview) return "pinnedReview";
            else if (authenticatedUserReview) return "authenticatedUserReview";
            return "createReview";
        })()
    );
    // Check whether the pinned review can be loaded
    useEffect(() => {
        if (router.query.pinnedReviewId) {
            setPinnedReviewCanBeLoaded(true);
            setCurrentSection("pinnedReview");
        }
    }, [router.query]);

    const addPropsToButton = (type: Section) => {
        return {
            primary: currentSection === type,
            onClick: () => setCurrentSection(type),
        };
    };

    return (
        <>
            {(() => {
                if (authenticatedUserReview || pinnedReview) {
                    return (
                        <NavigationWrapper>
                            {pinnedReview && <StyledButton {...addPropsToButton("pinnedReview")}>Pinned review</StyledButton>}
                            {authenticatedUserReview && <StyledButton {...addPropsToButton("authenticatedUserReview")}>Your review</StyledButton>}
                            <StyledButton {...addPropsToButton("createReview")}>Create review</StyledButton>
                        </NavigationWrapper>
                    );
                }
            })()}

            {(() => {
                if (currentSection === "createReview") {
                    return <CreateReview></CreateReview>;
                } else if (currentSection === "pinnedReview") {
                    return <PinnedReview review={pinnedReview}></PinnedReview>;
                }
            })()}
        </>
    );
};

export default SelectableContent;
