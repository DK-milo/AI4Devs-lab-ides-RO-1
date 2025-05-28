import { Request, Response, NextFunction } from 'express';
import prisma from '../index';
import { CandidateCreateInput, CandidateUpdateInput } from '../types/candidate';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

export const createCandidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const candidateData: CandidateCreateInput = req.body;

    const candidate = await prisma.candidate.create({
      data: {
        firstName: candidateData.firstName,
        lastName: candidateData.lastName,
        email: candidateData.email,
        phone: candidateData.phone,
        address: candidateData.address,
        education: candidateData.education ? {
          create: candidateData.education
        } : undefined,
        workExperience: candidateData.workExperience ? {
          create: candidateData.workExperience
        } : undefined,
        documents: candidateData.documents ? {
          create: candidateData.documents
        } : undefined,
      },
      include: {
        education: true,
        workExperience: true,
        documents: true,
      },
    });

    res.status(201).json({
      status: 'success',
      data: candidate,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
      return res.status(400).json({
        status: 'error',
        message: 'A candidate with this email already exists',
      });
    }
    next(error);
  }
};

export const getCandidates = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const candidates = await prisma.candidate.findMany({
      include: {
        education: true,
        workExperience: true,
        documents: true,
      },
    });

    res.json({
      status: 'success',
      data: candidates,
    });
  } catch (error) {
    next(error);
  }
};

export const getCandidateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const candidate = await prisma.candidate.findUnique({
      where: { id: parseInt(id) },
      include: {
        education: true,
        workExperience: true,
        documents: true,
      },
    });

    if (!candidate) {
      return res.status(404).json({
        status: 'error',
        message: 'Candidate not found',
      });
    }

    res.json({
      status: 'success',
      data: candidate,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCandidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const updateData: CandidateUpdateInput = req.body;

    const candidate = await prisma.candidate.update({
      where: { id: parseInt(id) },
      data: {
        firstName: updateData.firstName,
        lastName: updateData.lastName,
        email: updateData.email,
        phone: updateData.phone,
        address: updateData.address,
        status: updateData.status,
      },
      include: {
        education: true,
        workExperience: true,
        documents: true,
      },
    });

    res.json({
      status: 'success',
      data: candidate,
    });
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'Candidate not found',
      });
    }
    next(error);
  }
};

export const deleteCandidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    await prisma.candidate.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
      return res.status(404).json({
        status: 'error',
        message: 'Candidate not found',
      });
    }
    next(error);
  }
}; 