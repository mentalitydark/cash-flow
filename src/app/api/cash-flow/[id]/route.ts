import { NextRequest } from "next/server"
import { ZodError } from "zod"

import { EntityNotFound } from "@/errors"
import { RepositoryDatabase } from "@/Repositories/CashFlow"
import { Response } from "@/classes"

type params = { params: Promise<{ id: string }>}

export async function PUT(request: NextRequest, { params }: params) {
    try {
        const { id } = await params

        const repository = new RepositoryDatabase

        const entity = await repository.getOne(Number(id))

        entity.updateFromJSON(await request.json())

        await repository.update(entity)

        return Response.OK(entity.toJSON())
    } catch (error) {
        if (error instanceof ZodError)
            return Response.BAD_REQUEST(error, { title: 'Parameters required', instance: request.url, error: error.issues})

        if (error instanceof EntityNotFound)
            return Response.NOT_FOUND(error, {instance: request.url})

        if (error instanceof Error)
            return Response.INTERNAL_SERVER_ERROR(error, {instance: request.url})
    }
}

export async function DELETE(request: NextRequest, { params }: params) {
    try {
        const { id } = await params
        const repository = new RepositoryDatabase

        const entity = await repository.getOne(Number(id))

        await repository.delete(entity)

        return Response.OK({})
    } catch (error) {
        if (error instanceof EntityNotFound)
            return Response.NOT_FOUND(error, {instance: request.url})

        if (error instanceof Error)
            return Response.INTERNAL_SERVER_ERROR(error, {instance: request.url})
    }
}