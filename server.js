import express from 'express';
import cors from 'cors';
import pg from 'pg';

const { Client } = pg;
const app = express();
const PORT = 54321;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const DB_URL = process.env.DATABASE_URL || 'postgresql://n8n:AilaptopN8N@84.247.179.14:5432/n8n?sslmode=disable';

// Postgres API endpoint
app.post('/functions/v1/postgres-api', async (req, res) => {
  const { action, data } = req.body;
  
  if (!action) {
    return res.status(400).json({ error: 'Missing action' });
  }

  const client = new Client({ connectionString: DB_URL });

  try {
    await client.connect();
    let result;

    switch (action) {
      case 'get-laptop':
        result = await client.query('SELECT * FROM laptops ORDER BY row_number');
        return res.json(result.rows);

      case 'get-desktops':
        result = await client.query('SELECT * FROM desktops ORDER BY row_number');
        return res.json(result.rows);

      case 'get-accessories':
        result = await client.query('SELECT * FROM accessories ORDER BY row_number');
        return res.json(result.rows);

      case 'get-chats':
        try {
          result = await client.query('SELECT id, contact_uid, role, content, image_url, created_at, mobile_number, name FROM chat_messages ORDER BY created_at DESC');
          return res.json(result.rows);
        } catch (error) {
          console.error('chat_messages table error:', error.message);
          return res.json([]); // Return empty array if table doesn't exist
        }

      case 'get-contact-names':
        // Get unique names for each mobile number
        try {
          result = await client.query(`
            SELECT DISTINCT ON (mobile_number) mobile_number, name, contact_uid
            FROM chat_messages 
            WHERE name IS NOT NULL AND mobile_number IS NOT NULL
            ORDER BY mobile_number, created_at DESC
          `);
          return res.json(result.rows);
        } catch (error) {
          console.error('get-contact-names error:', error.message);
          return res.json([]);
        }

      case 'get-contacts':
        try {
          result = await client.query('SELECT uid, name, phone_number, email, created_at, updated_at FROM contacts ORDER BY updated_at DESC NULLS LAST');
          return res.json(result.rows);
        } catch {
          try {
            result = await client.query('SELECT DISTINCT contact_uid FROM chat_messages');
            return res.json(result.rows);
          } catch (error) {
            console.error('contacts table error:', error.message);
            return res.json([]); // Return empty array if table doesn't exist
          }
        }

      default:
        return res.status(400).json({ error: `Unknown action: ${action}` });
    }
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: error.message });
  } finally {
    await client.end();
  }
});

// Cloudinary placeholder
app.post('/functions/v1/cloudinary-upload', async (req, res) => {
  res.json({ success: false, error: 'Cloudinary not configured yet' });
});

// WhatsApp placeholder
app.post('/functions/v1/whatsapp-api', async (req, res) => {
  res.json({ success: false, error: 'WhatsApp API not configured yet' });
});

app.listen(PORT, () => {
  console.log(`✅ Backend server running on http://localhost:${PORT}`);
  console.log(`📊 Database: Connected to PostgreSQL`);
});
