/* eslint-disable import/no-anonymous-default-export */
// Types
import type { LandmarkType } from "@prisma/client";
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";

export default (data: Landmark[], type: LandmarkType) => {
    data.forEach((landmark) => {
        expect(landmark.type).toEqual(type);
    });
    expect(data.length).toBeGreaterThan(0);
};
