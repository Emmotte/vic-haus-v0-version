-- Create the 'sites' table
CREATE TABLE public.sites (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    site_name text NOT NULL,
    site_description text,
    created_at timestamp with time zone DEFAULT now()
);

-- Create the 'rooms' table
CREATE TABLE public.rooms (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    site_id uuid REFERENCES public.sites(id) ON DELETE CASCADE,
    name text NOT NULL,
    description text,
    images text[] DEFAULT ARRAY[]::text[], -- Array of image URLs
    display_order integer, -- To control the order of rooms
    created_at timestamp with time zone DEFAULT now()
);

-- Enable Row Level Security (RLS) for 'sites' table
ALTER TABLE public.sites ENABLE ROW LEVEL SECURITY;

-- Policies for 'sites' table
CREATE POLICY "Users can view their own sites." ON public.sites
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own sites." ON public.sites
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own sites." ON public.sites
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own sites." ON public.sites
  FOR DELETE USING (auth.uid() = user_id);

-- Enable Row Level Security (RLS) for 'rooms' table
ALTER TABLE public.rooms ENABLE ROW LEVEL SECURITY;

-- Policies for 'rooms' table
CREATE POLICY "Users can view rooms for their own sites." ON public.rooms
  FOR SELECT USING (EXISTS (SELECT 1 FROM public.sites WHERE sites.id = rooms.site_id AND sites.user_id = auth.uid()));

CREATE POLICY "Users can insert rooms for their own sites." ON public.rooms
  FOR INSERT WITH CHECK (EXISTS (SELECT 1 FROM public.sites WHERE sites.id = rooms.site_id AND sites.user_id = auth.uid()));

CREATE POLICY "Users can update rooms for their own sites." ON public.rooms
  FOR UPDATE USING (EXISTS (SELECT 1 FROM public.sites WHERE sites.id = rooms.site_id AND sites.user_id = auth.uid()));

CREATE POLICY "Users can delete rooms for their own sites." ON public.rooms
  FOR DELETE USING (EXISTS (SELECT 1 FROM public.sites WHERE sites.id = rooms.site_id AND sites.user_id = auth.uid()));
