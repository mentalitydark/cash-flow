import { StatusCodes } from "http-status-codes"
import { NextResponse } from "next/server"

export abstract class ResponseErrors {

    private static error(body: Object, status: StatusCodes) {
        return NextResponse.json({ ...body, status }, {
            status: status,
            headers: {
                "content-type": "application/problem+json"
            }
        })
    }

    public static BadRequest(instace: Error, body = {}) {
        return ResponseErrors.error({
            title: instace.message,
            error: instace.toString(),
            ...body
        }, StatusCodes.BAD_REQUEST)
    }

    public static NotFound(instace: Error, body = {}) {
        return ResponseErrors.error({
            title: instace.message,
            error: instace.toString(),
            ...body
        }, StatusCodes.NOT_FOUND)
    }

    public static InternalServerError(instace: Error, body = {}) {
        return ResponseErrors.error({
            title: instace.message,
            error: instace.toString(),
            ...body
        }, StatusCodes.INTERNAL_SERVER_ERROR)
    }

}