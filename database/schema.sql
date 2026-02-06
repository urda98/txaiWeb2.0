CREATE TABLE users (
    id uuid PRIMARY KEY REFERENCES auth.users(id), ON DELETE CASCADE,
    email text NOT NULL UNIQUE,
    role text NOT NULL DEFAULT 'user',
    created_at timestampz DEFAULT NOW(),
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
);
