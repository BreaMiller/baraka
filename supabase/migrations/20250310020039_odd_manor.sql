/*
  # Messages Schema

  1. New Tables
    - messages: Stores chat messages between users
      - id (uuid, primary key)
      - sender_id (uuid, references users)
      - recipient_id (uuid, references users)
      - content (text)
      - read (boolean)
      - created_at (timestamp)

  2. Security
    - Enable RLS
    - Add policies for:
      - Reading messages (sender and recipient only)
      - Sending messages (authenticated users)
      - Marking messages as read (recipient only)
*/

-- Create messages table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS messages (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    recipient_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    content text NOT NULL,
    read boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Enable RLS
DO $$ BEGIN
  ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN undefined_table THEN NULL;
END $$;

-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read messages they sent or received" ON messages;
  DROP POLICY IF EXISTS "Users can send messages" ON messages;
  DROP POLICY IF EXISTS "Recipients can mark messages as read" ON messages;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create policies
DO $$ BEGIN
  CREATE POLICY "Users can read messages they sent or received"
    ON messages FOR SELECT
    TO authenticated
    USING (
      auth.uid() = sender_id OR 
      auth.uid() = recipient_id
    );

  CREATE POLICY "Users can send messages"
    ON messages FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = sender_id);

  CREATE POLICY "Recipients can mark messages as read"
    ON messages FOR UPDATE
    TO authenticated
    USING (auth.uid() = recipient_id)
    WITH CHECK (
      auth.uid() = recipient_id AND
      read = true -- Only allow updating to mark as read
    );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;