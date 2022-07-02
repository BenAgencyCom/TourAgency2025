/* eslint-disable import/no-anonymous-default-export */
// Tools
import prisma from "../../db";
// Types
import type { ContentStatus } from "@prisma/client";
import type { Destination } from "@/@types/pages/destinations/ManyDestinations";

export default async (data: Destination[]) => {
    const slugs: string[] = data.map((el) => el.slug);
    const destinationsWithStatus = await prisma.destination.findMany({ where: { slug: { in: slugs } }, select: { status: true, slug: true } });

    expect(destinationsWithStatus.length).toEqual(data.length);
    data.forEach(({ slug }) => {
        const { status } = destinationsWithStatus.find((target) => target.slug === slug) as { slug: string; status: ContentStatus };
        expect(status).toEqual("APPROVED" as ContentStatus);
    });
};
