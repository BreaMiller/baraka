/*
  # Mother Preferences Schema

  1. New Tables
    - mother_preferences: Stores preferences for expecting mothers
      - id (uuid, primary key)
      - user_id (uuid, references users)
      - due_date (date)
      - location (text)
      - birth_plan (text array)
      - doula_preferences (jsonb)
      - created_at (timestamp)

  2. Security
    - Enable RLS
    - Add policies for authenticated users to manage their own preferences
*/

-- Create mother_preferences table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS mother_preferences (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    due_date date NOT NULL,
    location text NOT NULL,
    birth_plan text[] NOT NULL,
    doula_preferences jsonb NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id)
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Enable RLS
DO $$ BEGIN
  ALTER TABLE mother_preferences ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN undefined_table THEN NULL;
END $$;

-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read own preferences" ON mother_preferences;
  DROP POLICY IF EXISTS "Users can insert own preferences" ON mother_preferences;
  DROP POLICY IF EXISTS "Users can update own preferences" ON mother_preferences;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create policies
DO $$ BEGIN
  CREATE POLICY "Users can read own preferences"
    ON mother_preferences FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

  CREATE POLICY "Users can insert own preferences"
    ON mother_preferences FOR INSERT
    TO authenticated
    WITH CHECK (user_id = auth.uid());

  CREATE POLICY "Users can update own preferences"
    ON mother_preferences FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;