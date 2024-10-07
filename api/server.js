import express from 'express';
import bodyParser from 'body-parser';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

app.use(bodyParser.json());

app.post('/api/user', async (req, res) => {
  const { id, username } = req.body;

  console.log('Received user data:', id, username);

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

    console.log('User  data:', user);

    return res.json(user);
  } catch (error) {
    console.error('Error processing user data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/increase-points', async (req, res) => {
  const { telegramId } = req.body;

  console.log('Received increase points request for user:', telegramId);

  try {
    const updatedUser  = await prisma.user.update({
      where: { telegramId: telegramId },
      data: { points: { increment: 1 } },
    });

    console.log('Updated user data:', updatedUser );

    return res.json({ success: true, points: updatedUser .points });
  } catch (error) {
    console.error('Error increasing points:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
