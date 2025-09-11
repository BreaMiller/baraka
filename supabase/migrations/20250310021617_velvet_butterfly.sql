/*
  # Create Doula Organization Tables

  1. New Tables
    - `doula_organizations`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `name` (text)
      - `address` (text)
      - `phone` (text)
      - `email` (text)
      - `website` (text)
      - `tax_id` (text)
      - `services` (text[])
      - `coverage` (jsonb)
      - `requirements` (jsonb)
      - `compensation` (jsonb)
      - `created_at` (timestamptz)

    - `organization_members`
      - `id` (uuid, primary key)
      - `organization_id` (uuid, references doula_organizations)
      - `doula_id` (uuid, references doulas)
      - `role` (text)
      - `status` (text)
      - `joined_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create doula_organizations table
CREATE TABLE IF NOT EXISTS doula_organizations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name text NOT NULL,
  address text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  website text,
  tax_id text NOT NULL,
  services text[] NOT NULL DEFAULT '{}',
  coverage jsonb NOT NULL DEFAULT '{}',
  requirements jsonb NOT NULL DEFAULT '{}',
  compensation jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Create organization_members table
CREATE TABLE IF NOT EXISTS organization_members (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES doula_organizations(id) ON DELETE CASCADE NOT NULL,
  doula_id uuid REFERENCES doulas(id) ON DELETE CASCADE NOT NULL,
  role text NOT NULL DEFAULT 'member',
  status text NOT NULL DEFAULT 'active',
  joined_at timestamptz DEFAULT now(),
  UNIQUE(organization_id, doula_id)
);

-- Enable RLS
ALTER TABLE doula_organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE organization_members ENABLE ROW LEVEL SECURITY;

-- Policies for doula_organizations
CREATE POLICY "Organizations can read own profile"
  ON doula_organizations FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Organizations can update own profile"
  ON doula_organizations FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can read organization profiles"
  ON doula_organizations FOR SELECT
  TO authenticated
  USING (true);

-- Policies for organization_members
CREATE POLICY "Organizations can manage their members"
  ON organization_members FOR ALL
  TO authenticated
  USING (organization_id IN (SELECT id FROM doula_organizations WHERE user_id = auth.uid()));

CREATE POLICY "Doulas can read their memberships"
  ON organization_members FOR SELECT
  TO authenticated
  USING (doula_id IN (SELECT id FROM doulas WHERE user_id = auth.uid()));