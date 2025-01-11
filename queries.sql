-- Database: permalist

-- DROP DATABASE IF EXISTS permalist;

CREATE DATABASE permalist
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    LC_COLLATE = 'English_United States.1252'
    LC_CTYPE = 'English_United States.1252'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;

-- Table: public.items

-- DROP TABLE IF EXISTS public.items;

CREATE TABLE IF NOT EXISTS public.items
(
    id integer NOT NULL DEFAULT nextval('items_id_seq'::regclass),
    title character varying(100) COLLATE pg_catalog."default" NOT NULL,
    day_id integer,
    CONSTRAINT items_pkey PRIMARY KEY (id),
    CONSTRAINT items_day_id_fkey FOREIGN KEY (day_id)
        REFERENCES public.weekdays (date) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.items
    OWNER to postgres;


-- Table: public.weekdays

-- DROP TABLE IF EXISTS public.weekdays;

CREATE TABLE IF NOT EXISTS public.weekdays
(
    id integer NOT NULL DEFAULT nextval('weekdays_id_seq'::regclass),
    day character varying(50) COLLATE pg_catalog."default",
    date integer,
    CONSTRAINT weekdays_pkey PRIMARY KEY (id),
    CONSTRAINT weekdays_date_key UNIQUE (date)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.weekdays
    OWNER to postgres;