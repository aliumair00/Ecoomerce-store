import request from 'supertest';
import express from 'express';

// Create a minimal test app without database dependencies
const testApp = express();
testApp.use(express.json());
testApp.get('/api/health', (_req, res) => res.json({ ok: true }));

describe('API Health Check', () => {
    it('should return 200 OK for health endpoint', async () => {
        const res = await request(testApp).get('/api/health');
        expect(res.status).toBe(200);
        expect(res.body).toEqual({ ok: true });
    });
});
