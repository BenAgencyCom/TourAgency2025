// Tools
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import { useState, useEffect, useMemo } from "react";
import useBulkReviewsContext from "@/components/_utils/BulkReviews/hooks/useBulkReviewsContext";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Other components
import PinnedReview from "./PinnedReview";
import CreateReview from "@/components/_utils/BulkReviews/SelectableContent/CreateReview";
import SingleReview from "@/components/_utils/SingleReview";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";

const NavigationWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    marginBottom: "40px",
    button: {
        marginRight: "10px",
        height: "40px",
        fontSize: "1rem",
    },
    ["@media (max-width:900px)"]: {
        flexDirection: "column",
        button: {
            width: "100%",
            marginTop: "10px",
            "&:nth-of-type(1)": {
                marginTop: "0px",
            },
        },
    },
}));

type Section = "pinnedReview" | "createReview" | "authenticatedUserReview";

const SelectableContent: FunctionComponent = (props) => {
    const router = useRouter();
    const context = useBulkReviewsContext();

    const pinnedReview = context.fetchingResult.pinnedReview.value;
    const authenticatedUserReview = context.fetchingResult.authenticatedUserReview.value;

    const pinnedReviewAndAuthenticatedUserReviewAreNotTheSame = useMemo<boolean>(() => {
        if (!pinnedReview || !authenticatedUserReview) return true;
        else return pinnedReview.id !== authenticatedUserReview.id;
    }, [authenticatedUserReview, pinnedReview]);

    const [currentSection, setCurrentSection] = useState<Section>(
        ((): Section => {
            if (pinnedReview && pinnedReviewAndAuthenticatedUserReviewAreNotTheSame) return "pinnedReview";
            else if (authenticatedUserReview) return "authenticatedUserReview";
            return "createReview";
        })()
    );

    // Check whether the pinned review can be loaded
    useEffect(() => {
        if (!authenticatedUserReview && !pinnedReview) {
            setCurrentSection("createReview");
            return;
        }
        if (router.query.pinnedReviewId) {
            if (pinnedReview && pinnedReviewAndAuthenticatedUserReviewAreNotTheSame) setCurrentSection("pinnedReview");
            else if (authenticatedUserReview) {
                setCurrentSection("authenticatedUserReview");
            }
        } else if (authenticatedUserReview) {
            setCurrentSection("authenticatedUserReview");
        }
    }, [router.query, pinnedReviewAndAuthenticatedUserReviewAreNotTheSame, authenticatedUserReview, pinnedReview]);

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
                            {pinnedReview && pinnedReviewAndAuthenticatedUserReviewAreNotTheSame && <StyledButton {...addPropsToButton("pinnedReview")}>Pinned review</StyledButton>}
                            {authenticatedUserReview && <StyledButton {...addPropsToButton("authenticatedUserReview")}>Your review</StyledButton>}
                            <StyledButton {...addPropsToButton("createReview")}>{authenticatedUserReview ? "Modify your review" : "Create review"}</StyledButton>
                        </NavigationWrapper>
                    );
                }
            })()}

            {(() => {
                if (currentSection === "createReview") {
                    return <CreateReview showAuthenticatedUserReview={() => setCurrentSection("authenticatedUserReview")} />;
                } else if (currentSection === "pinnedReview") {
                    return (
                        <PinnedReview
                            review={pinnedReview} //
                            record={{
                                id: context.idOfReviewingItem,
                                type: context.reviewsType,
                            }}
                        />
                    );
                } else if (currentSection === "authenticatedUserReview" && authenticatedUserReview) {
                    return (
                        <SingleReview
                            review={authenticatedUserReview as Review} //
                            sx={{ mb: "100px" }}
                            authenticatedUserReview
                            record={{
                                id: context.idOfReviewingItem,
                                type: context.reviewsType,
                            }}
                        />
                    );
                }
            })()}
        </>
    );
};

export default SelectableContent;
