import { Request } from "express";
import bcrypt from "bcryptjs"
import { prisma } from "../../shared/prisma";

const createPatient = async (req: Request) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    console.log(req.body)

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.email,
                password: hashedPassword
            }
        });

        return await tnx.patient.create({
            data: {
                name: req.body.name,
                email: req.body.email
            }
        })
    })

    return result;
}

export const UserService = {
    createPatient
}