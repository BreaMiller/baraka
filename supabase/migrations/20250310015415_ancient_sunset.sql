/*
  # Initial Database Schema

  1. Tables
    - users: Core user information
    - subscriptions: User subscription details
    - doulas: Doula profiles and information
    - appointments: Booking appointments between clients and doulas
    - resources: Educational content and resources
    - user_favorites: User's favorite resources

  2. Security
    - RLS enabled on all tables
    - Policies for data access control
    - Role-based permissions
*/

-- Users Table
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS users (
    id uuid PRIMARY KEY DEFAULT auth.uid(),
    email text UNIQUE NOT NULL,
    full_name text,
    role text CHECK (role IN ('mother', 'doula')) NOT NULL,
    created_at timestamptz DEFAULT now(),
    stripe_customer_id text,
    CONSTRAINT fk_user FOREIGN KEY (id) REFERENCES auth.users (id) ON DELETE CASCADE
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Subscriptions Table
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS subscriptions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    status text CHECK (status IN ('active', 'canceled', 'past_due', 'unpaid')) NOT NULL,
    plan_id text NOT NULL,
    current_period_end timestamptz NOT NULL,
    created_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Doulas Table
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS doulas (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    bio text,
    location text NOT NULL,
    specialties text[] NOT NULL,
    hourly_rate numeric NOT NULL,
    availability jsonb NOT NULL,
    rating numeric DEFAULT 5.0,
    reviews_count integer DEFAULT 0,
    created_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Appointments Table
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS appointments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    doula_id uuid REFERENCES doulas(id) ON DELETE CASCADE NOT NULL,
    date timestamptz NOT NULL,
    status text CHECK (status IN ('pending', 'confirmed', 'completed', 'canceled')) NOT NULL,
    payment_status text CHECK (payment_status IN ('pending', 'paid', 'refunded')) NOT NULL,
    amount numeric NOT NULL,
    created_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Resources Table
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS resources (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    category text NOT NULL,
    content jsonb NOT NULL,
    is_premium boolean DEFAULT false,
    created_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- User Favorites Table
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS user_favorites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    resource_id uuid REFERENCES resources(id) ON DELETE CASCADE NOT NULL,
    created_at timestamptz DEFAULT now(),
    UNIQUE(user_id, resource_id)
  );
EXCEPTION
  WHEN duplicate_table THEN NULL;
END $$;

-- Enable Row Level Security
DO $$ BEGIN
  ALTER TABLE users ENABLE ROW LEVEL SECURITY;
  ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
  ALTER TABLE doulas ENABLE ROW LEVEL SECURITY;
  ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
  ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
  ALTER TABLE user_favorites ENABLE ROW LEVEL SECURITY;
EXCEPTION
  WHEN undefined_table THEN NULL;
END $$;

-- Drop existing policies if they exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "Users can read own data" ON users;
  DROP POLICY IF EXISTS "Users can update own data" ON users;
  DROP POLICY IF EXISTS "Users can read own subscriptions" ON subscriptions;
  DROP POLICY IF EXISTS "Anyone can read doula profiles" ON doulas;
  DROP POLICY IF EXISTS "Doulas can update own profile" ON doulas;
  DROP POLICY IF EXISTS "Users can read own appointments" ON appointments;
  DROP POLICY IF EXISTS "Users can create appointments" ON appointments;
  DROP POLICY IF EXISTS "Anyone can read free resources" ON resources;
  DROP POLICY IF EXISTS "Users can manage their favorites" ON user_favorites;
EXCEPTION
  WHEN undefined_object THEN NULL;
END $$;

-- Create Policies
DO $$ BEGIN
  -- Users Policies
  CREATE POLICY "Users can read own data"
    ON users FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

  CREATE POLICY "Users can update own data"
    ON users FOR UPDATE
    TO authenticated
    USING (auth.uid() = id);

  -- Subscriptions Policies
  CREATE POLICY "Users can read own subscriptions"
    ON subscriptions FOR SELECT
    TO authenticated
    USING (user_id = auth.uid());

  -- Doulas Policies
  CREATE POLICY "Anyone can read doula profiles"
    ON doulas FOR SELECT
    TO authenticated
    USING (true);

  CREATE POLICY "Doulas can update own profile"
    ON doulas FOR UPDATE
    TO authenticated
    USING (user_id = auth.uid());

  -- Appointments Policies
  CREATE POLICY "Users can read own appointments"
    ON appointments FOR SELECT
    TO authenticated
    USING (client_id = auth.uid() OR doula_id IN (
      SELECT id FROM doulas WHERE user_id = auth.uid()
    ));

  CREATE POLICY "Users can create appointments"
    ON appointments FOR INSERT
    TO authenticated
    WITH CHECK (client_id = auth.uid());

  -- Resources Policies
  CREATE POLICY "Anyone can read free resources"
    ON resources FOR SELECT
    TO authenticated
    USING (NOT is_premium OR EXISTS (
      SELECT 1 FROM subscriptions 
      WHERE user_id = auth.uid() 
      AND status = 'active'
    ));

  -- User Favorites Policies
  CREATE POLICY "Users can manage their favorites"
    ON user_favorites FOR ALL
    TO authenticated
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;