import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.post('/api/user', async (req, res) => {
  const { id, username } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Invalid user data' });
  }

  try {
    let user = await prisma.user.upsert({
      where: { telegramId: id },
      update: {},
      create: {
        telegramId: id,
        username: username || '',
        points: 0,
      },
    });

    return res.json(user);
  } catch (error) {
    console.error('Error processing user data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/increase-points', async (req, res) => {
  const { telegramId } = req.body;

  if (!telegramId) {
    return res.status(400).json({ error: 'Invalid telegramId' });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { telegramId: telegramId },
      data: { points: { increment: 1 } },
    });

    return res.json({ success: true, points: updatedUser.points });
  } catch (error) {
    console.error('Error increasing points:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});