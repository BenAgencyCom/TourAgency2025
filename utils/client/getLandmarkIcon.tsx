// Types
import type { ReactNode } from "react";
import type { LandmarkType } from "@prisma/client";
// Material UI Icons
import Forest from "@mui/icons-material/Forest";
import Diamond from "@mui/icons-material/Diamond";
import Palette from "@mui/icons-material/Palette";
import AccessTime from "@mui/icons-material/AccessTime";
import Restaurant from "@mui/icons-material/Restaurant";
import AccountBalance from "@mui/icons-material/AccountBalance";
import LinkedCamera from "@mui/icons-material/LinkedCamera";

export const iconsList: Record<LandmarkType, ReactNode> = {
    ANTIQUE: <AccessTime></AccessTime>,
    ART: <Palette></Palette>,
    BUILDING: <AccountBalance></AccountBalance>,
    MONUMENT: <LinkedCamera></LinkedCamera>,
    NATURE: <Forest></Forest>,
    RESTAURANT: <Restaurant></Restaurant>,
    MUSEUM: <Diamond></Diamond>,
};

export const GetLandmarkIcon = (icon: LandmarkType): ReactNode => iconsList[icon];
