/*
  # Create Birthing Center Tables

  1. New Tables
    - `birthing_centers`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `name` (text)
      - `address` (text)
      - `phone` (text)
      - `email` (text)
      - `website` (text)
      - `license` (text)
      - `facilities` (text[])
      - `services` (text[])
      - `insurance_accepted` (text[])
      - `staff` (jsonb)
      - `policies` (jsonb)
      - `rating` (numeric)
      - `created_at` (timestamptz)

    - `rooms`
      - `id` (uuid, primary key)
      - `center_id` (uuid, references birthing_centers)
      - `name` (text)
      - `type` (text)
      - `status` (text)
      - `features` (text[])
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create birthing_centers table
CREATE TABLE IF NOT EXISTS birthing_centers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  website text,
  license text NOT NULL,
  facilities text[] NOT NULL DEFAULT '{}',
  services text[] NOT NULL DEFAULT '{}',
  insurance_accepted text[] NOT NULL DEFAULT '{}',
  staff jsonb NOT NULL DEFAULT '{}',
  policies jsonb NOT NULL DEFAULT '{}',
  rating numeric DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  center_id uuid REFERENCES birthing_centers(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  type text NOT NULL,
  status text NOT NULL DEFAULT 'available',
  features text[] NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE birthing_centers ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;

-- Policies for birthing_centers
CREATE POLICY "Centers can read own profile"
  ON birthing_centers FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Centers can update own profile"
  ON birthing_centers FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can read center profiles"
  ON birthing_centers FOR SELECT
  TO authenticated
  USING (true);

-- Policies for rooms
CREATE POLICY "Centers can manage their rooms"
  ON rooms FOR ALL
  TO authenticated
  USING (center_id IN (SELECT id FROM birthing_centers WHERE user_id = auth.uid()));

CREATE POLICY "Users can read room information"
  ON rooms FOR SELECT
  TO authenticated
  USING (true);