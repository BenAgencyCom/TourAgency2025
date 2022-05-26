// Types
import type { ReviewType } from "@prisma/client";
import type { Review } from "@/@types/pages/api/ReviewsAPI";

// eslint-disable-next-line import/no-anonymous-default-export
export default (data: Review[], type: ReviewType) => {
    data.forEach((el) => {
        expect(el.type).toEqual(type);
    });
};
