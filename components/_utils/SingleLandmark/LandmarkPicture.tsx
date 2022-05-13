// Tools
import { landmarkPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
// Styled Components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";

interface BackgroundPictureProps {
    folder: string;
    title: string;
    city: string;
    resolution: "360p" | "480p" | "720p" | "1080p";
}

const BackgroundPicture: FunctionComponent<BackgroundPictureProps> = (props) => {
    return (
        <div className="single-landmark-picture" style={{ borderRadius: "3px 20px 3px 20px" }}>
            {props.children}
            <SkeletonImage
                layout="fill" //
                alt="bg"
                src={landmarkPictureURL(props.folder, props.resolution, "thumbnail")}
                modalMaxResolution="1080p"
                advanceModalProperties={{
                    title: props.title,
                    sectionName: props.city,
                }}
            ></SkeletonImage>
        </div>
    );
};

export default BackgroundPicture;
