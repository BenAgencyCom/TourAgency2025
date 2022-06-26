// Tools
import { useState, useEffect } from "react";
// Types
import type { FunctionComponent } from "react";
import type { LandmarkType } from "@prisma/client";
import type { DescriptionContentField } from "@/@types/Description";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import UploadingResult from "@/components/_utils/UploadingResult";

interface ProcessRequestProps {
    destinationId: string;
    type: LandmarkType;
    title: string;
    shortDescription: string;
    description: DescriptionContentField[];
    thumbnail: File;
}

const ProcessRequest: FunctionComponent<ProcessRequestProps> = (props) => {
    return (
        <Fade in={true}>
            <UploadingResult
                actionsAfterError={[]} //
                errorMsg={"Something went wrong while creating a landmark"}
                redirectURLAfterSuccess={"/"}
                status={"pending"}
                successMsg="A landmark has been created successfully"
                errorHTTPStatusCode={409}
            />
        </Fade>
    );
};

export default ProcessRequest;
