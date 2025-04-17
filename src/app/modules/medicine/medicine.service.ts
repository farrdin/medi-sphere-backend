import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { IMedicine } from './medicine.interface';
import { Medicine } from './medicine.model';

// create a medicine into db
const createMedicineIntoDB = async (payload: IMedicine) => {
  const result = await Medicine.create(payload);

  return result;
};

// get all medicines from db
const getAllMedicinesFromDB = async () => {
  const result = await Medicine.find();
  return result;
};

// get a single medicines from db
const getSingleMedicinesFromDB = async (id: string) => {
  const result = await Medicine.findById(id);

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Medicine not found!');
  }

  return result;
};

// update medicine
const updateMedicineIntoDB = async (
  id: string,
  payload: Partial<IMedicine>,
) => {
  const result = await Medicine.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'Medicine not found!');
  }

  return result;
};

// soft delete
const deleteMedicineFromDB = async (id: string) => {
  const deletedMedicine = await Medicine.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );

  if (!deletedMedicine) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete Medicine');
  }

  return deletedMedicine;
};

export const medicineServices = {
  createMedicineIntoDB,
  getAllMedicinesFromDB,
  getSingleMedicinesFromDB,
  updateMedicineIntoDB,
  deleteMedicineFromDB,
};
