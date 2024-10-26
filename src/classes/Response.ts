import { NextResponse } from "next/server";

import { StatusCodes } from "http-status-codes";

export abstract class Response {

    public static OK(data: Object) {
        return NextResponse.json({ data }, { status: StatusCodes.OK })
    }

    public static CREATED(data: Object) {
        return NextResponse.json({ data }, { status: StatusCodes.CREATED })
    }

}