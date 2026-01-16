import type { ErrorRequestHandler} from "express";

export const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
    console.error(err);
    const status = (err as any)?.status ?? 500;
    const message = err.message ?? 'nternal Server Error';
    res.status(status).json({
        message: message,
    })
};
