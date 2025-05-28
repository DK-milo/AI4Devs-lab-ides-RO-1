import { Router } from 'express';
import {
  createCandidate,
  getCandidates,
  getCandidateById,
  updateCandidate,
  deleteCandidate,
} from '../controllers/candidateController';
import { validateCandidate } from '../middleware/validation';

const router = Router();

router.post('/', validateCandidate, createCandidate);
router.get('/', getCandidates);
router.get('/:id', getCandidateById);
router.put('/:id', validateCandidate, updateCandidate);
router.delete('/:id', deleteCandidate);

export default router; 