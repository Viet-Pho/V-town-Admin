import express from 'express';
import controller from '../controllers/user';

const router = express.Router();

router.get('/', controller.getAllUsers);

export = router;
