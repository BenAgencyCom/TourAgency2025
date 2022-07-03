import type { CreateReviewRequest } from "@/pages/api/landmark/[landmark_id]/reviews/@types";

export const validDataRequestBody = {
    tags: ["lorem", "ipsum"],
    points: 9.3,
    reviewContent: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pretium, tortor nec porttitor condimentum, erat sapien luctus magna, a posuere enim magna vel mi. Nullam a neque purus. Aenean dapibus tincidunt nibh, id pharetra elit vulputate et. Vestibulum nec mauris lorem. Nulla metus elit, consectetur eu vulputate ac, gravida et ante. Nullam rhoncus blandit condimentum. Duis augue justo, scelerisque vel ligula et, finibus accumsan eros.`,
} as CreateReviewRequest["body"];
