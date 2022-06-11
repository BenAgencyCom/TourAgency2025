// Tools
import joi from "joi";
import { useMemo } from "react";

// eslint-disable-next-line import/no-anonymous-default-export
export default (params: { email: string; password: string }): boolean => {
    const { email, password } = params;
    const joiScheme = joi.object({
        password: joi.string().min(6).max(255).trim(),
        email: joi.string().max(255).email({ tlds: false }),
    });

    return useMemo<boolean>(() => {
        const { error } = joiScheme.validate({ email, password });
        return !Boolean(error);
    }, [email, password, joiScheme]);
};
