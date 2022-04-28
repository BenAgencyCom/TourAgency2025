// Types
import type { FunctionComponent, ChangeEvent } from "react";
import type { Landmark } from "@/@types/pages/admin/create_destination/Landmark";
import type { Theme } from "@mui/material/styles";
// Material UI Components
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Fade from "@mui/material/Fade";
// Material UI Icons
import Done from "@mui/icons-material/Done";
import Close from "@mui/icons-material/Close";
// Redux
import { useAppSelector } from "@/hooks/useRedux";

interface LandmarksNavigationProps {
    currentSlideIndex: number;
    hideNavigation: boolean;
    validationResults: boolean[];
    selectSlide: (index: number) => void;
    openCreateLandmarkDialog: () => void;
}

const LandmarksNavigation: FunctionComponent<LandmarksNavigationProps> = (props) => {
    const landmarks = useAppSelector((state) => state.landmarks.list);

    const selectSlide = (e: ChangeEvent<HTMLSelectElement>) => props.selectSlide(Number(e.target.value));

    const landmarkIsValid = (index: number): boolean => {
        return props.validationResults[index];
    };

    const backgroundColor = (index: number, theme: Theme) => {
        if (landmarkIsValid(index)) {
            return {
                bgcolor: theme.palette.success.main,
                "&:hover,&.Mui-selected ": {
                    bgcolor: `${theme.palette.success.dark}!important`,
                },
            };
        } else {
            return {
                bgcolor: theme.palette.error.main,
                "&:hover,&.Mui-selected ": {
                    bgcolor: `${theme.palette.error.dark}!important`,
                },
            };
        }
    };

    return (
        <Box
            sx={{
                display: "flex", //
                mb: 2,
                mt: props.hideNavigation ? 4 : 2,
                justifyContent: "space-between",
                width: "100%",
            }}
        >
            {(() => {
                if (landmarks.length > 1) {
                    return (
                        <Fade in={true}>
                            <Select
                                value={props.currentSlideIndex}
                                inputProps={{ sx: { px: 2, py: 1 } }}
                                onChange={(e: any) => selectSlide(e)}
                                sx={{ width: "320px" }} //
                            >
                                {landmarks.map((landmark, index: number) => {
                                    return (
                                        <MenuItem value={index} key={index} sx={(theme) => backgroundColor(index, theme)}>
                                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                                {(() => {
                                                    if (landmarkIsValid(index)) return <Done sx={{ mr: 1 }}></Done>;
                                                    else return <Close sx={{ mr: 1 }}></Close>;
                                                })()}
                                                <span>{landmark.data.title}</span>
                                            </Box>
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </Fade>
                    );
                } else return <div></div>;
            })()}

            <Button variant="contained" sx={{ ml: 1 }} onClick={props.openCreateLandmarkDialog}>
                Create new landmark
            </Button>
        </Box>
    );
};

export default LandmarksNavigation;
