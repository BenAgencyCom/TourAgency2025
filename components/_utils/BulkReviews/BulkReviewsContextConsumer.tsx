// Tools
import { useRouter } from "next/router";
import useDataQueryHandler from "./hooks/useDataQueryHandler";
import useBulkReviewsContext from "./hooks/useBulkReviewsContext";
// Types
import type { FunctionComponent } from "react";
import type { PaginationProperties } from "@/@types/pages/api/Pagination";
// Other components
import Landing from "./Landing";
import Reviews from "./Reviews";
import SelectableContent from "./SelectableContent";
import URLQueriesManager from "@/components/_utils/URLQueriesManager";
import ThereAreNoResults from "@/components/_utils/ThereAreNoResults";
// Material UI Icons
import Star from "@mui/icons-material/Star";
// Styled components
import LoadingSkeletons from "./LoadingSkeletons";
import ContentContainter from "@/components/_utils/styled/ContentContainter";

const BulkReviewsContextConsumer: FunctionComponent = () => {
    const router = useRouter();
    const context = useBulkReviewsContext();
    const { isLoading, queryForData } = useDataQueryHandler();

    const paginationPropertiesForURLQueriesManager: PaginationProperties | undefined = (() => {
        const { value } = context.fetchingResult.paginationProperties;
        return value && !isLoading ? value : undefined;
    })();

    const thereAreNoReviews: boolean = (() => {
        return context.fetchingResult.reviews.value.length === 0;
    })();

    return (
        <ContentContainter id={`single-${context.reviewsType}-reviews`} backgroundMap>
            <Landing />
            <SelectableContent />

            <URLQueriesManager
                queryForData={queryForData}
                disableResultsInTotal
                lineAnimationColor="paperDefault"
                extraOrderOptions={[
                    {
                        label: "Best score",
                        value: "best",
                        "data-compounded-value": "orderBy=points&sort=desc",
                    },
                    {
                        label: "Worst score",
                        value: "worst",
                        "data-compounded-value": "orderBy=points&sort=asc",
                    },
                ]}
                extraSelects={[
                    {
                        key: "certianReviewType",
                        icon: <Star />,
                        options: [
                            { label: "All types", value: "all" },
                            { label: "Positive", value: "POSITIVE" },
                            { label: "Negative", value: "NEGATIVE" },
                            { label: "Mixed", value: "MIXED" },
                        ],
                        defaultValue: "all",
                        omitIfDeafult: true,
                    },
                ]}
                paginationProperties={paginationPropertiesForURLQueriesManager}
                otherURLQueries={["pinnedReviewId"]}
                disableEverything={thereAreNoReviews}
            >
                {(() => {
                    // Display reviews skeletons while a query had been sent but the response has not been received yet
                    if (isLoading) {
                        return <LoadingSkeletons />;
                    }
                    // Inform the user about the fact that there is no reviews matching given parameters
                    else if (thereAreNoReviews) {
                        return (
                            <ThereAreNoResults
                                router={router} //
                                header="There are no reviews yet"
                            ></ThereAreNoResults>
                        );
                    }
                    // Render all the reviews
                    else {
                        return <Reviews />;
                    }
                })()}
            </URLQueriesManager>
        </ContentContainter>
    );
};

export default BulkReviewsContextConsumer;
