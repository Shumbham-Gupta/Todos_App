import { Router, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { Todo } from '../models';
import { authMiddleware, AuthRequest } from '../middleware/auth';

const router = Router();

// All routes require authentication
router.use(authMiddleware);

// Create Todo
router.post(
  '/',
  [body('title').trim().notEmpty(), body('description').optional().trim()],
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { title, description } = req.body;

      const todo = await Todo.create({
        title,
        description,
        userId: req.userId,
        completed: false,
      });

      res.status(201).json({
        message: 'Todo created successfully',
        todo,
      });
    } catch (error) {
      res.status(500);
      throw error;
    }
  }
);

// List Todos
router.get('/', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const todos = await Todo.find({ userId: req.userId }).sort({ createdAt: -1 });

    res.json({
      todos,
      count: todos.length,
    });
  } catch (error) {
    res.status(500);
    throw error;
  }
});

// Update Todo
router.put(
  '/:id',
  [
    body('title').optional().trim().notEmpty(),
    body('description').optional().trim(),
    body('completed').optional().isBoolean(),
  ],
  async (req: AuthRequest, res: Response): Promise<void> => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
      }

      const { id } = req.params;
      const updates = req.body;

      const todo = await Todo.findOne({ _id: id, userId: req.userId });

      if (!todo) {
        res.status(404).json({ error: 'Todo not found' });
        return;
      }

      Object.assign(todo, updates, { updatedAt: new Date() });
      await todo.save();

      res.json({
        message: 'Todo updated successfully',
        todo,
      });
    } catch (error) {
      res.status(500);
      throw error;
    }
  }
);

// Delete Todo
router.delete('/:id', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.userId });

    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    res.json({
      message: 'Todo deleted successfully',
    });
  } catch (error) {
    res.status(500);
    throw error;
  }
});

// Toggle Todo Completion
router.patch('/:id/toggle', async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const todo = await Todo.findOne({ _id: id, userId: req.userId });

    if (!todo) {
      res.status(404).json({ error: 'Todo not found' });
      return;
    }

    todo.completed = !todo.completed;
    todo.updatedAt = new Date();
    await todo.save();

    res.json({
      message: 'Todo status updated',
      todo,
    });
  } catch (error) {
    res.status(500);
    throw error;
  }
});

export default router;