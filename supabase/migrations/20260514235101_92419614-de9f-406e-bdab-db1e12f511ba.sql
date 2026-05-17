
-- CARS (sale inventory)
CREATE TABLE public.cars (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL,
  price NUMERIC NOT NULL,
  currency TEXT NOT NULL DEFAULT 'USD',
  mileage INTEGER,
  engine TEXT,
  transmission TEXT,
  fuel_type TEXT,
  drivetrain TEXT,
  zero_to_sixty TEXT,
  top_speed TEXT,
  horsepower TEXT,
  vin TEXT,
  exterior_color TEXT,
  interior_color TEXT,
  description TEXT NOT NULL DEFAULT '',
  narrative TEXT,
  hero_image TEXT NOT NULL,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'available',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX cars_category_idx ON public.cars(category);
CREATE INDEX cars_featured_idx ON public.cars(featured);

ALTER TABLE public.cars ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Cars are viewable by everyone"
  ON public.cars FOR SELECT USING (true);

-- RENTALS
CREATE TABLE public.rentals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  rental_type TEXT NOT NULL DEFAULT 'self-drive',
  daily_rate NUMERIC NOT NULL,
  weekly_rate NUMERIC,
  monthly_rate NUMERIC,
  currency TEXT NOT NULL DEFAULT 'USD',
  seats INTEGER,
  transmission TEXT,
  fuel_type TEXT,
  description TEXT NOT NULL DEFAULT '',
  hero_image TEXT NOT NULL,
  gallery JSONB NOT NULL DEFAULT '[]'::jsonb,
  tags JSONB NOT NULL DEFAULT '[]'::jsonb,
  available BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.rentals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Rentals are viewable by everyone"
  ON public.rentals FOR SELECT USING (true);

-- CONTACT INQUIRIES
CREATE TABLE public.contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  car_id UUID REFERENCES public.cars(id) ON DELETE SET NULL,
  inquiry_type TEXT NOT NULL DEFAULT 'general',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a contact inquiry"
  ON public.contact_inquiries FOR INSERT WITH CHECK (true);

-- NEWSLETTER
CREATE TABLE public.newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can subscribe to the newsletter"
  ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END $$;

CREATE TRIGGER cars_updated_at BEFORE UPDATE ON public.cars
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
CREATE TRIGGER rentals_updated_at BEFORE UPDATE ON public.rentals
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
