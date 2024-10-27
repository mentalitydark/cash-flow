import { NextResponse } from "next/server";

import { StatusCodes } from "http-status-codes";

export abstract class Response {

    public static OK(data: Object) {
        return NextResponse.json({ data }, { status: StatusCodes.OK })
    }

    public static CREATED(data: Object) {
        return NextResponse.json({ data }, { status: StatusCodes.CREATED })
    }

    public static BAD_REQUEST(instace: Error, body = {}) {
        return Response.error({
            title: instace.message,
            error: instace.toString(),
            ...body
        }, StatusCodes.BAD_REQUEST)
    }

    public static NOT_FOUND(instace: Error, body = {}) {
        return Response.error({
            title: instace.message,
            error: instace.toString(),
            ...body
        }, StatusCodes.NOT_FOUND)
    }

    public static INTERNAL_SERVER_ERROR(instace: Error, body = {}) {
        return Response.error({
            title: instace.message,
            error: instace.toString(),
            ...body
        }, StatusCodes.INTERNAL_SERVER_ERROR)
    }

    private static error(body: Object, status: StatusCodes) {
        return NextResponse.json({ ...body, status }, {
            status: status,
            headers: {
                "content-type": "application/problem+json"
            }
        })
    }

}