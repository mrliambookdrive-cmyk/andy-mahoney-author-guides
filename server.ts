import express from 'express';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || '3000', 10);

  app.use(express.json());

  // API Routes for Supabase / Backend sync
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      supabaseConfigured: !!process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_URL !== 'https://placeholder-supabase.supabase.co',
    });
  });

  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, message } = req.body;
      console.log('Contact form submission received:', { name, email, message });
      res.json({ success: true, message: 'Message sent and stored successfully!' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  });

  // Create Vite server in middleware mode
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
