import { NextFunction, Request, Response } from 'express';
import { medicineServices } from './medicine.service';
import sendResponse from '../../utils/sendResponse';
import catchAsync from '../../utils/catchAsync';
import httpStatus from 'http-status';

const createMedicine = catchAsync(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await medicineServices.createMedicineIntoDB(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Medicine is created successfully!',
      data: result,
    });
  },
);

// get all medicines | search and filter medicine
const getAllMedicines = catchAsync(async (req: Request, res: Response) => {
  const result = await medicineServices.getAllMedicinesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicines retrieved successfully!',
    data: result,
  });
});

// get a single medicine
const getSingleMedicine = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await medicineServices.getSingleMedicinesFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine retrieved successfully!',
    data: result,
  });
});

// update a single medicine
const updateMedicine = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const body = req.body;
  const result = await medicineServices.updateMedicineIntoDB(id, body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine updated successfully!',
    data: result,
  });
});

// delete a medicine
const deleteMedicine = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await medicineServices.deleteMedicineFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Medicine Deleted successfully!',
    data: result,
  });
});

export const medicineControllers = {
  createMedicine,
  getAllMedicines,
  getSingleMedicine,
  updateMedicine,
  deleteMedicine,
};
