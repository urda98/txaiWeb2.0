ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own profile"
On usersFOR SELECTUSING (auth.uid() = id);