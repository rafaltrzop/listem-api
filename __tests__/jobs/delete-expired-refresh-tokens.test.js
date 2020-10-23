const { v4: uuidv4 } = require('uuid');

const { RefreshToken, User } = require('../../src/models');
const {
  deleteExpiredRefreshTokens,
} = require('../../src/jobs/delete-expired-refresh-tokens');

describe('Delete expired refresh tokens job', () => {
  test('should delete expired refresh tokens', async () => {
    const email = 'test@gmail.com';
    const password = 'Passw0rd!';
    const { id: userId } = await User.create({
      email,
      passwordHash: password,
    });

    const refreshToken = uuidv4();
    const expiryDate = new Date(
      Date.now() - process.env.REFRESH_TOKEN_LIFETIME_DAYS * 24 * 60 * 60 * 1000
    );
    await RefreshToken.create({
      userId,
      refreshTokenHash: refreshToken,
      createdAt: expiryDate,
    });

    expect(await RefreshToken.count({ where: { userId } })).toBe(1);
    deleteExpiredRefreshTokens();
    expect(await RefreshToken.count({ where: { userId } })).toBe(0);
  });

  test('should not delete not expired refresh tokens', async () => {
    const email = 'test@gmail.com';
    const password = 'Passw0rd!';
    const { id: userId } = await User.create({
      email,
      passwordHash: password,
    });

    const refreshToken = uuidv4();
    await RefreshToken.create({
      userId,
      refreshTokenHash: refreshToken,
    });

    expect(await RefreshToken.count({ where: { userId } })).toBe(1);
    deleteExpiredRefreshTokens();
    expect(await RefreshToken.count({ where: { userId } })).toBe(1);
  });
});
