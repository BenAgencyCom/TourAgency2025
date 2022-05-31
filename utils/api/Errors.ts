import type { BetterJoiError } from "@/utils/api/betterJoiErrors";

export class InvalidRequestedBody extends Error {
    constructor(public joiFeedback?: BetterJoiError[]) {
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
export class SessionExpired extends Error {}
export class ValidationError extends Error {}
export class NotFound extends Error {}
export class Conflict extends Error {}
export class MethodNotAllowed extends Error {}
