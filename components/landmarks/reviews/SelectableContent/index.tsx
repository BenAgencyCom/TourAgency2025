// Tools
import { useMemo } from "react";
import { styled } from "@mui/system";
import { useRouter } from "next/router";
import stated from "@/utils/client/stated";
import { useState, useEffect } from "react";
// Types
import type { FunctionComponent } from "react";
import type { Review } from "@/@types/pages/api/ReviewsAPI";
// Other components
import PinnedReview from "./PinnedReview";
import CreateReview from "@/components/_utils/CreateReview";
import SingleReview from "@/components/_utils/SingleReview";
// Styled components
import StyledButton from "@/components/create/_utils/forms/Button";

const NavigationWrapper = styled("div")(({ theme }) => ({
    display: "flex",
    marginBottom: "40px",
    button: {
        marginRight: "10px",
        height: "46px",
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

interface SelectableContentProps {
    pinnedReview: null | Review;
    authenticatedUserReview: null | Review;
}

const SelectableContent: FunctionComponent<SelectableContentProps> = (props) => {
    const router = useRouter();
    const { pinnedReview, authenticatedUserReview } = props;

    const pinnedReviewAndAuthenticatedUserReviewAreNotTheSame = useMemo<boolean>(() => {
        if (!pinnedReview || !authenticatedUserReview) return false;
        else return pinnedReview.id !== authenticatedUserReview.id;
    }, [authenticatedUserReview, pinnedReview]);

    const [currentSection, setCurrentSection] = useState<Section>(
        ((): Section => {
            if (pinnedReview && pinnedReviewAndAuthenticatedUserReviewAreNotTheSame) return "pinnedReview";
            else if (authenticatedUserReview) return "authenticatedUserReview";
            return "createReview";
        })()
    );
    // In order not to lose the new review data each time the tab is changed,
    // the state handling this proces has to be stored in higher level component
    const [scoreInt, setScoreInt] = useState<number>(0);
    const [scoreFloat, setScoreFloat] = useState<number>(0);
    const [reviewContent, setReviewContent] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);
    // Update above create review properties when authenticated user review is loaded
    useEffect(() => {
        if (authenticatedUserReview) {
            const splitedScore = String(authenticatedUserReview.points).split(".");
            setScoreInt(Number(splitedScore[0]));
            setScoreFloat(Number(splitedScore[1]));
            setReviewContent(authenticatedUserReview.review);
            setTags(authenticatedUserReview.tags);
        }
    }, [authenticatedUserReview]);
    // Check whether the pinned review can be loaded
    useEffect(() => {
        if (router.query.pinnedReviewId) {
            if (pinnedReviewAndAuthenticatedUserReviewAreNotTheSame) setCurrentSection("pinnedReview");
            else if (authenticatedUserReview) {
                setCurrentSection("authenticatedUserReview");
            }
        } else if (authenticatedUserReview) {
            setCurrentSection("authenticatedUserReview");
        }
    }, [router.query, pinnedReviewAndAuthenticatedUserReviewAreNotTheSame, authenticatedUserReview]);

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
                    return (
                        <CreateReview
                            reviewToModify={authenticatedUserReview} //
                            scoreInt={stated(scoreInt, setScoreInt)}
                            scoreFloat={stated(scoreFloat, setScoreFloat)}
                            reviewContent={stated(reviewContent, setReviewContent)}
                            tags={stated(tags, setTags)}
                        />
                    );
                } else if (currentSection === "pinnedReview") {
                    return <PinnedReview review={pinnedReview} />;
                } else if (currentSection === "authenticatedUserReview") {
                    return (
                        <SingleReview
                            review={authenticatedUserReview as Review} //
                            sx={{ mb: "100px" }}
                            authenticatedUserReview
                        />
                    );
                }
            })()}
        </>
    );
};

export default SelectableContent;
