import type { BetterJoiError } from "@/utils/betterJoiErrors";

export class InvalidRequestedBody extends Error {
    constructor(public joiFeedback: BetterJoiError[]) {
        super();
    }
}
