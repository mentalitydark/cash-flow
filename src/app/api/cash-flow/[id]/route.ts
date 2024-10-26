import { EntityNotFound, ResponseErrors } from "@/errors"
import { Executor } from "@/Repositories"
import { RepositoryMemory } from "@/Repositories/CashFlow"
import { StatusCodes } from "http-status-codes"
import { NextRequest } from "next/server"
import { ZodError } from "zod"

type params = { params: Promise<{ id: string }>}

export async function PUT(request: NextRequest, { params }: params) {
    try {
        const { id } = await params
        const repository = new RepositoryMemory
        const entity = Executor.getOne(repository, Number(id))

        entity.updateFromJson(await request.json())

        Executor.update(repository, entity)

        return Response.json({ data: entity.toJson() }, { status: StatusCodes.OK })
    } catch (error) {
        if (error instanceof ZodError)
            return ResponseErrors.BadRequest(error, { title: 'Parameters required', instance: request.url, error: error.issues})

        if (error instanceof EntityNotFound)
            return ResponseErrors.NotFound(error, {instance: request.url})

        if (error instanceof Error)
            return ResponseErrors.InternalServerError(error, {instance: request.url})
    }
}

export async function DELETE(request: NextRequest, { params }: params) {
    try {
        const { id } = await params
        const repository = new RepositoryMemory
        const entity = Executor.getOne(repository, Number(id))

        Executor.delete(repository, entity)

        return Response.json({}, { status: StatusCodes.OK })
    } catch (error) {
        if (error instanceof EntityNotFound)
            return ResponseErrors.NotFound(error, {instance: request.url})

        if (error instanceof Error)
            return ResponseErrors.InternalServerError(error, {instance: request.url})
    }
}