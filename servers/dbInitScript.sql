-- Database: acrocharge

-- DROP DATABASE acrocharge;

CREATE DATABASE acrocharge
    WITH 
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'C.UTF-8'
    LC_CTYPE = 'C.UTF-8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

-- public.gender enum
create TYPE gender as enum ('male', 'female');

-- public customers TABLE
CREATE TABLE public.customers (
    id serial PRIMARY key,
    first_name text,
    last_name text,
    email text,
    gender gender,
    country text,
    city text,
    street text,
    phone text
);

-- public.credit_cards TABLE
CREATE TABLE public.credit_cards (
	number	text primary key,
	type	text
);

-- public.transactions table
CREATE TABLE public.transactions (
	id		serial primary key,
	currency text,
	type text,
	customer_id serial REFERENCES public.customers("id"),
	credit_card_number text REFERENCES public.credit_cards("number")
);

-- insert INTO public.customers values (default,'Dan', 'Dan', 'dan@gmail.com', 'male','Israel','Tel-Aviv','Hatapuah', '0523333333');