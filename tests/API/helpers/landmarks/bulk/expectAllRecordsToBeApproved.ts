/* eslint-disable import/no-anonymous-default-export */
// Tools
import prisma from "../../db";
// Types
import type { Landmark } from "@/@types/pages/landmarks/ManyLandmarks";
import type { ContentStatus } from "@prisma/client";

export default async (data: Landmark[]) => {
    const slugs: string[] = data.map((el) => el.slug);
    const landmarksWithStatus = await prisma.landmark.findMany({ where: { slug: { in: slugs } }, select: { status: true, slug: true } });

    expect(landmarksWithStatus.length).toEqual(data.length);
    data.forEach(({ slug }) => {
        const { status } = landmarksWithStatus.find((target) => target.slug === slug) as { slug: string; status: ContentStatus };
        expect(status).toEqual("APPROVED" as ContentStatus);
    });
};
