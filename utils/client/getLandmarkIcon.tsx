// Types
import type { LandmarkType } from "@prisma/client";
import type { ReactNode } from "react";
// Material UI Icons
import AccountBalance from "@mui/icons-material/AccountBalance";
import Palette from "@mui/icons-material/Palette";
import AccessTime from "@mui/icons-material/AccessTime";
import AlignVerticalTop from "@mui/icons-material/AlignVerticalTop";
import Park from "@mui/icons-material/Park";
import MenuBook from "@mui/icons-material/MenuBook";
import LocalDining from "@mui/icons-material/LocalDining";

export const iconsList: Record<LandmarkType, ReactNode> = {
    ANTIQUE: <AccessTime></AccessTime>,
    ART: <Palette></Palette>,
    BUILDING: <AccountBalance></AccountBalance>,
    MONUMENT: <AlignVerticalTop></AlignVerticalTop>,
    NATURE: <Park></Park>,
    RELIC: <MenuBook></MenuBook>,
    RESTAURANT: <LocalDining></LocalDining>,
};

export const GetLandmarkIcon = (icon: LandmarkType): ReactNode => iconsList[icon];
