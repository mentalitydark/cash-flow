import { NextRequest } from "next/server"
import { ZodError } from "zod"

import { RepositoryMemory } from "@/Repositories/CashFlow"
import { Executor } from "@/Repositories"
import { EntityNotFound, ResponseErrors } from "@/errors"
import { CashFlow, Response } from "@/classes"
import { ICashFlow } from "@/interfaces"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    const id = searchParams.get('id')

    try {
        const repository = new RepositoryMemory

        const entities = Executor.get(repository, Number(id))

        let data = {}
        if (Array.isArray(entities)) {
            data = entities.map(e => e.toJson())
        } else {
            data = entities.toJson()
        }
    
        return Response.OK(data)
    } catch(error) {
        if (error instanceof EntityNotFound)
            return ResponseErrors.NotFound(error, {instance: request.url})

        if (error instanceof Error)
            return ResponseErrors.InternalServerError(error, {instance: request.url})
    }

}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as ICashFlow

        const entity = CashFlow.createFromJson(body)

        entity.validate()

        Executor.add(new RepositoryMemory, entity)
    
        return Response.CREATED(entity.toJson())
    } catch (error) {
        if (error instanceof ZodError)
            return ResponseErrors.BadRequest(error, { title: 'Parameters required', instance: request.url, error: error.issues})

        if (error instanceof Error)
            return ResponseErrors.InternalServerError(error, {instance: request.url})
    }
}