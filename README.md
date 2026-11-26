# Supabase Auth Assignment

## Run the app

1. Install dependencies:

   ```bash
   npm install
   ```

2. Create a `.env` file in the project root:

   ```env
   EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
   EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
   ```

3. Start Expo:

   ```bash
   npx expo start
   ```

## Supabase project setup notes

1. Create a new Supabase project.
2. In Supabase Dashboard, go to `Project Settings -> API` and copy:
   - Project URL -> `EXPO_PUBLIC_SUPABASE_URL`
   - `anon` public key -> `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
