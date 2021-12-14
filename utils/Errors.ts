import type { BetterJoiError } from "@/utils/betterJoiErrors";

export class InvalidRequestedBody extends Error {
    constructor(public joiFeedback: BetterJoiError[]) {
        super();
    }
}

export class CredentialsDoNotMatch extends Error {
    public readonly msg: string = "Credentials do not match any user.";
    constructor() {
        super();
    }
}

export class Forbidden extends Error {}
