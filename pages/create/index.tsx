// Tools
import { styled } from "@mui/system";
// Types
import type { FunctionComponent } from "react";
// Other components
import Head from "next/head";
import Link from "next/link";
import LineIntroAnimation from "@/components/_utils/LineIntroAnimation";
import ContentContainter from "@/components/_utils/styled/ContentContainter";
import SingleLandmarkSkeletonLoading from "@/components/_utils/SingleLandmark/SkeletonLoading";
// Styled components
import FlexBox from "@/components/_utils/styled/FlexBox";
import StyledButton from "@/components/create/_utils/forms/Button";

const StyledContentContainter = styled(ContentContainter)(({ theme }) => ({
    ".single-landmark-skeleton-wrapper": {
        width: "350px !important",
        ["@media (max-height:800px)"]: {
            height: "400px",
        },
    },
    ".line-animation-wrapper": {
        "&:nth-of-type(2)": {
            marginLeft: "20px",
        },
    },
}));

const NavigationButton = styled(StyledButton)(({ theme }) => ({
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    height: "70px",
    width: "250px",
}));

const SelectWhatToCreate: FunctionComponent = () => {
    return (
        <>
            <Head>
                <title>MES | Create Content</title>
            </Head>
            <StyledContentContainter
                backgroundMap //
                header={{
                    main: "Select what to create",
                    background: "Create",
                }}
            >
                <FlexBox center>
                    <LineIntroAnimation
                        in={true} //
                        intro="right"
                        outro="top"
                    >
                        <SingleLandmarkSkeletonLoading>
                            <Link href="/create/destination" passHref>
                                <NavigationButton>Destination</NavigationButton>
                            </Link>
                        </SingleLandmarkSkeletonLoading>
                    </LineIntroAnimation>

                    <LineIntroAnimation
                        in={true} //
                        intro="left"
                        outro="bottom"
                    >
                        <SingleLandmarkSkeletonLoading>
                            <Link href="/create/landmark" passHref>
                                <NavigationButton>Landmark</NavigationButton>
                            </Link>
                        </SingleLandmarkSkeletonLoading>
                    </LineIntroAnimation>
                </FlexBox>
            </StyledContentContainter>
        </>
    );
};

export default SelectWhatToCreate;
