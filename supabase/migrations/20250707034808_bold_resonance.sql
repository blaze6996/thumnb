/*
  # ThumbnailPro Database Schema

  1. New Tables
    - `thumbnails`
      - `id` (uuid, primary key)
      - `title` (text)
      - `category` (text)
      - `image_url` (text)
      - `views` (text)
      - `likes` (text)
      - `game_overlay` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `clients`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text, unique)
      - `phone` (text)
      - `platform` (text)
      - `channel_name` (text)
      - `channel_url` (text)
      - `subscribers` (text)
      - `status` (text)
      - `rating` (integer)
      - `notes` (text)
      - `preferred_contact` (text)
      - `total_orders` (integer, default 0)
      - `total_spent` (numeric, default 0)
      - `last_contact` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `client_id` (uuid, foreign key)
      - `package_type` (text)
      - `title` (text)
      - `description` (text)
      - `price` (numeric)
      - `status` (text)
      - `thumbnails_count` (integer)
      - `revisions` (integer, default 0)
      - `max_revisions` (integer)
      - `files` (jsonb)
      - `notes` (text)
      - `deadline` (date)
      - `delivery_date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `communications`
      - `id` (uuid, primary key)
      - `client_id` (uuid, foreign key)
      - `type` (text)
      - `subject` (text)
      - `message` (text)
      - `direction` (text)
      - `status` (text, default 'unread')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their data
*/

-- Create thumbnails table
CREATE TABLE IF NOT EXISTS thumbnails (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL DEFAULT 'builds',
  image_url text NOT NULL,
  views text DEFAULT '0',
  likes text DEFAULT '0',
  game_overlay text DEFAULT '🏰',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create clients table
CREATE TABLE IF NOT EXISTS clients (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  phone text DEFAULT '',
  platform text DEFAULT 'youtube',
  channel_name text DEFAULT '',
  channel_url text DEFAULT '',
  subscribers text DEFAULT '0',
  status text DEFAULT 'active',
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  notes text DEFAULT '',
  preferred_contact text DEFAULT 'discord',
  total_orders integer DEFAULT 0,
  total_spent numeric DEFAULT 0,
  last_contact date DEFAULT CURRENT_DATE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  package_type text DEFAULT 'basic',
  title text NOT NULL,
  description text DEFAULT '',
  price numeric DEFAULT 100,
  status text DEFAULT 'pending',
  thumbnails_count integer DEFAULT 1,
  revisions integer DEFAULT 0,
  max_revisions integer DEFAULT 1,
  files jsonb DEFAULT '[]'::jsonb,
  notes text DEFAULT '',
  deadline date,
  delivery_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create communications table
CREATE TABLE IF NOT EXISTS communications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid REFERENCES clients(id) ON DELETE CASCADE,
  type text DEFAULT 'discord',
  subject text NOT NULL,
  message text DEFAULT '',
  direction text DEFAULT 'outgoing',
  status text DEFAULT 'unread',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE thumbnails ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE communications ENABLE ROW LEVEL SECURITY;

-- Create policies for thumbnails (public read, authenticated write)
CREATE POLICY "Anyone can view thumbnails"
  ON thumbnails
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage thumbnails"
  ON thumbnails
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for clients (authenticated users only)
CREATE POLICY "Authenticated users can manage clients"
  ON clients
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for orders (authenticated users only)
CREATE POLICY "Authenticated users can manage orders"
  ON orders
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for communications (authenticated users only)
CREATE POLICY "Authenticated users can manage communications"
  ON communications
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_thumbnails_updated_at
  BEFORE UPDATE ON thumbnails
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_clients_updated_at
  BEFORE UPDATE ON clients
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_communications_updated_at
  BEFORE UPDATE ON communications
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_thumbnails_category ON thumbnails(category);
CREATE INDEX IF NOT EXISTS idx_thumbnails_created_at ON thumbnails(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_clients_email ON clients(email);
CREATE INDEX IF NOT EXISTS idx_clients_status ON clients(status);
CREATE INDEX IF NOT EXISTS idx_orders_client_id ON orders(client_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_communications_client_id ON communications(client_id);
CREATE INDEX IF NOT EXISTS idx_communications_created_at ON communications(created_at DESC);