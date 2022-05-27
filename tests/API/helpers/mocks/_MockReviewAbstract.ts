// Tools
import faker from "faker";
// Types
import type { ReviewType } from "@prisma/client";

export default abstract class MockReview {
    protected generatePoints(type: ReviewType): number {
        if (type === "POSITIVE") return 10;
        else if (type === "NEGATIVE") return 2;
        return 5;
    }

    protected generateTags(): string[] {
        const generateSingleTag = (): string => faker.lorem.word();
        return [generateSingleTag(), generateSingleTag(), generateSingleTag()];
    }

    protected generateComment(): string {
        return faker.lorem.sentences(7);
    }
}
