// Tools
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import formatDescription from "../../_utils/helpers/formatDescription";
import useCreateLandmarkContext from "@/components/create/landmark/hooks/useCreateLandmarkContext";
// Types
import type { FunctionComponent } from "react";
import type { CreateLandmarkBody } from "./@types";
import type { UploadingResultStatus } from "@/components/_utils/UploadingResult";
// Material UI Components
import Fade from "@mui/material/Fade";
// Other components
import UploadingResult from "@/components/_utils/UploadingResult";
// Redux
import { useAppSelector } from "@/hooks/useRedux";

interface ProcessRequestProps {
    goBack: () => void;
}

const ProcessRequest: FunctionComponent<ProcessRequestProps> = (props) => {
    const context = useCreateLandmarkContext();
    const { list } = useAppSelector((state) => state.createContent);
    const requestHasBeenAlreadySent = useRef<boolean>(false);

    const [errorHTTTPCode, setErrorHTTTPCode] = useState<number>(201);
    const [status, setStatus] = useState<UploadingResultStatus>("pending");

    useEffect(() => {
        const body = new FormData();
        if (requestHasBeenAlreadySent.current) return;

        requestHasBeenAlreadySent.current = true;
        const dataToSend: Omit<CreateLandmarkBody, "description"> = {
            destinationId: (context.selectedDestination.value as any).id as string,
            // destinationId: "HAMBURG",
            shortDescription: context.shortDescription.value,
            title: context.title.value,
            type: context.landmarkType.value,
        };

        for (const key in dataToSend) {
            body.append(key, dataToSend[key as keyof Omit<CreateLandmarkBody, "description">]);
        }

        body.append("description", formatDescription({ body, description: list }));
        body.append("thumbnail", context.thumbnail.value as File);

        axios
            .post("/api/landmark/create", body, {
                headers: {
                    "content-type": "multipart/form-data",
                },
            })
            .then((r) => {
                setStatus("success");
            })
            .catch((e) => {
                setStatus("error");
                setErrorHTTTPCode(e.response.status);
            });
    }, [context, list]);

    return (
        <Fade in={true}>
            <div>
                <UploadingResult
                    actionsAfterError={[
                        {
                            name: "Return",
                            onClick: props.goBack,
                        },
                    ]} //
                    errorMsg={"Something went wrong while creating a landmark"}
                    redirectURLAfterSuccess={`/landmarks}`}
                    status={status}
                    successMsg="A landmark has been created successfully, now you have to wait until it gets verified"
                    errorHTTPStatusCode={errorHTTTPCode}
                />
            </div>
        </Fade>
    );
};

export default ProcessRequest;
