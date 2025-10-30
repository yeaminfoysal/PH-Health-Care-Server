import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import sendResponse from "../../shared/sendResponse";
import { UserService } from "./user.service";
import pick from "../../helper/pick";
import { userFilterableFields } from "./user.constant";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.createPatient(req);
    // console.log(req.body)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient created successfully!",
        data: result
    })
})

const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createAdmin(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin Created successfuly!",
        data: result
    })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createDoctor(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor Created successfuly!",
        data: result
    })
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {

    // const { page, limit, searchTerm, sortBy, sortOrder, role, status } = req.query;
    // const result = await UserService.getAllFromDB({
    //     page: Number(page), 
    //     limit: Number(limit), 
    //     searchTerm, sortBy, sortOrder, role, status
    // });

    const filters = pick(req.query, userFilterableFields) // searching , filtering
    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]) // pagination and sorting

    const result = await UserService.getAllFromDB(filters, options);

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User retrive successfully!",
        meta: result.meta,
        data: result.data
    })
})

export const userController = { createPatient, createAdmin, getAllFromDB, createDoctor }