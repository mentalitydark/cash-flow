import { NextRequest } from "next/server"
import { ZodError } from "zod"

import { RepositoryDatabase } from "@/Repositories/CashFlow"
import { EntityNotFound } from "@/errors"
import { CashFlow, Response } from "@/classes"
import { ICashFlowProps } from "@/interfaces"

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url)

    const id = searchParams.get('id')

    try {
        const repository = new RepositoryDatabase

        if (id) {
            const entity = await repository.getOne(Number(id))

            return Response.OK(entity.toJSON())
        } else {
            const entities = await repository.getAll()

            return Response.OK(entities.map(e => e.toJSON()))
        }
    } catch(error) {
        if (error instanceof EntityNotFound)
            return Response.NOT_FOUND(error, {instance: request.url})

        if (error instanceof Error)
            return Response.INTERNAL_SERVER_ERROR(error, {instance: request.url})
    }

}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as ICashFlowProps

        const entity = new CashFlow()
        
        entity.createFromJSON(CashFlow.validate(body))

        const repository = new RepositoryDatabase

        await repository.insert(entity)
    
        return Response.CREATED(entity.toJSON())
    } catch (error) {
        if (error instanceof ZodError)
            return Response.BAD_REQUEST(error, { title: 'Parameters required', instance: request.url, error: error.issues})

        if (error instanceof Error)
            return Response.INTERNAL_SERVER_ERROR(error, {instance: request.url})
    }
}