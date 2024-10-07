const express = require('express');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const router = express.Router();

router.post('/user', async (req, res) => {
  const { id, username } = req.body;

  if (!id) {
    return res.status(400).json({ error: 'Invalid user data' });
  }

  let user = await prisma.user.findUnique({
    where: { telegramId: id },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        telegramId: id,
        username: username || '',
        points: 0,
      },
    });
  }

  res.json(user);
});

module.exports = router;
