import { Request } from "express";
import bcrypt from "bcryptjs"
import { prisma } from "../../shared/prisma";
import { fileUploader } from "../../helper/fileUploader";

const createPatient = async (req: Request) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(req.file)

    if (req.file) {
        const uploadResult = await fileUploader.uploadToCloudinary(req.file)
        req.body.patient.profilePhoto = uploadResult?.secure_url
    }

    const result = await prisma.$transaction(async (tnx) => {
        await tnx.user.create({
            data: {
                email: req.body.patient.email,
                password: hashedPassword
            }
        });

        return await tnx.patient.create({
            data: req.body.patient
        })
    })

    return result;
}

export const UserService = {
    createPatient
}