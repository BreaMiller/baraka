/*
  # Update User Policies

  1. Changes
    - Drop existing policies if they exist
    - Create new policies for user table:
      - Insert policy for authentication
      - Select policy for own data
      - Update policy for own data
    
  2. Security
    - Ensure users can only access their own data
    - Allow insert during authentication
    - Restrict updates to own data

  Note: Using IF EXISTS to prevent errors if policies don't exist
*/

DO $$ 
BEGIN
  -- Drop existing policies if they exist
  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'users' 
    AND policyname = 'Users can read own data'
  ) THEN
    DROP POLICY "Users can read own data" ON users;
  END IF;

  IF EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'users' 
    AND policyname = 'Users can update own data'
  ) THEN
    DROP POLICY "Users can update own data" ON users;
  END IF;

  -- Create new policies
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'users' 
    AND policyname = 'Enable insert for authentication'
  ) THEN
    CREATE POLICY "Enable insert for authentication" ON users
      FOR INSERT
      WITH CHECK (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'users' 
    AND policyname = 'Enable select for users based on id'
  ) THEN
    CREATE POLICY "Enable select for users based on id" ON users
      FOR SELECT
      USING (auth.uid() = id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE schemaname = 'public' 
    AND tablename = 'users' 
    AND policyname = 'Enable update for users based on id'
  ) THEN
    CREATE POLICY "Enable update for users based on id" ON users
      FOR UPDATE
      USING (auth.uid() = id)
      WITH CHECK (auth.uid() = id);
  END IF;
END $$;