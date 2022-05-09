// Tools
import { styled } from "@mui/system";
import { destinationPictureURL, landmarkPictureURL } from "@/utils/client/imageURLs";
// Types
import type { FunctionComponent } from "react";
import type { MUIStyledCommonProps } from "@mui/system";
// Other Components
import SkeletonImage from "@/components/_utils/styled/SkeletonImage";
// Styled Components
interface Props {
    inactive?: boolean;
}
const Wrapper = styled("div", {
    shouldForwardProp: (propname: string) => !["inactive"].includes(propname),
})<Props>(({ theme, ...props }) => ({
    position: "relative",
    height: "150px",
    overflow: "hidden",
    borderRadius: "5px",
    opacity: "0.95",
    transition: "opacity .3s",
    ...(props.inactive
        ? {
              img: {
                  opacity: 0.8,
                  filter: "blur(5px)",
              },
          }
        : {
              cursor: "pointer",
              img: {
                  opacity: 0.9,
                  transition: "transform .3s ease-in-out, opacity .3s ease-in-out",
              },
              "&:hover": {
                  img: {
                      opacity: 1,
                      transform: "scale(1.1)",
                  },
                  opacity: "1",
              },
          }),
}));
interface SingleLandmarkProps extends MUIStyledCommonProps {
    inactive?: boolean;
    url: string;
}

const SingleLandmark: FunctionComponent<SingleLandmarkProps> = (props) => {
    const { url, ...propsToForward } = props;
    const src = props.inactive ? destinationPictureURL(url, "360p", "thumbnail") : landmarkPictureURL(url, "360p");
    return (
        <Wrapper {...propsToForward} className="single-landmark">
            <SkeletonImage
                layout="fill" //
                alt="bg"
                objectFit="cover"
                objectPosition="center"
                src={src}
            ></SkeletonImage>
        </Wrapper>
    );
};

export default SingleLandmark;
