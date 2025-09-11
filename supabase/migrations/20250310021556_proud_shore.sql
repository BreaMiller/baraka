/*
  # Create Doula Tables

  1. New Tables
    - `doulas`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `certifications` (text[])
      - `specialties` (text[])
      - `languages` (text[])
      - `cultural_expertise` (text[])
      - `availability` (jsonb)
      - `services` (text[])
      - `rates` (jsonb)
      - `location` (text)
      - `travel_radius` (integer)
      - `bio` (text)
      - `rating` (numeric)
      - `created_at` (timestamptz)

    - `appointments`
      - `id` (uuid, primary key)
      - `doula_id` (uuid, references doulas)
      - `client_id` (uuid, references users)
      - `date` (timestamptz)
      - `type` (text)
      - `status` (text)
      - `amount` (numeric)
      - `payment_status` (text)
      - `notes` (text)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create doulas table
CREATE TABLE IF NOT EXISTS doulas (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  certifications text[] NOT NULL DEFAULT '{}',
  specialties text[] NOT NULL DEFAULT '{}',
  languages text[] NOT NULL DEFAULT '{}',
  cultural_expertise text[] NOT NULL DEFAULT '{}',
  availability jsonb NOT NULL DEFAULT '{}',
  services text[] NOT NULL DEFAULT '{}',
  rates jsonb NOT NULL DEFAULT '{}',
  location text NOT NULL,
  travel_radius integer NOT NULL DEFAULT 0,
  bio text NOT NULL DEFAULT '',
  rating numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  doula_id uuid REFERENCES doulas(id) ON DELETE CASCADE NOT NULL,
  client_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  date timestamptz NOT NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  amount numeric NOT NULL DEFAULT 0,
  payment_status text NOT NULL DEFAULT 'pending',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE doulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Policies for doulas
CREATE POLICY "Doulas can read own profile"
  ON doulas FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Doulas can update own profile"
  ON doulas FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Clients can read doula profiles"
  ON doulas FOR SELECT
  TO authenticated
  USING (true);

-- Policies for appointments
CREATE POLICY "Doulas can read their appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (doula_id IN (SELECT id FROM doulas WHERE user_id = auth.uid()));

CREATE POLICY "Clients can read their appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (client_id = auth.uid());

CREATE POLICY "Doulas can update their appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (doula_id IN (SELECT id FROM doulas WHERE user_id = auth.uid()));

CREATE POLICY "Clients can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (client_id = auth.uid());