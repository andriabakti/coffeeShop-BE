--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-03-22 08:36:31

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 836 (class 1247 OID 16486)
-- Name: gender_coffeeteria; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.gender_coffeeteria AS ENUM (
    'male',
    'female'
);


ALTER TYPE public.gender_coffeeteria OWNER TO postgres;

--
-- TOC entry 833 (class 1247 OID 16480)
-- Name: role_coffeeteria; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.role_coffeeteria AS ENUM (
    'admin',
    'customer'
);


ALTER TYPE public.role_coffeeteria OWNER TO postgres;

--
-- TOC entry 839 (class 1247 OID 16492)
-- Name: status_coffeeteria; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.status_coffeeteria AS ENUM (
    'undelivered',
    'received'
);


ALTER TYPE public.status_coffeeteria OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 216 (class 1259 OID 16531)
-- Name: category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.category (
    id integer NOT NULL,
    name character varying(100) DEFAULT ''::character varying NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.category OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16530)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 3386 (class 0 OID 0)
-- Dependencies: 215
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.category.id;


--
-- TOC entry 218 (class 1259 OID 16540)
-- Name: order_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_detail (
    id integer NOT NULL,
    user_id smallint NOT NULL,
    total integer NOT NULL,
    payment character varying(50) NOT NULL,
    status public.status_coffeeteria,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.order_detail OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16539)
-- Name: order_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_details_id_seq OWNER TO postgres;

--
-- TOC entry 3387 (class 0 OID 0)
-- Dependencies: 217
-- Name: order_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_details_id_seq OWNED BY public.order_detail.id;


--
-- TOC entry 220 (class 1259 OID 16548)
-- Name: order_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_item (
    id integer NOT NULL,
    order_id smallint NOT NULL,
    user_id smallint NOT NULL,
    product_id smallint NOT NULL,
    quantity smallint NOT NULL,
    size character varying(50) DEFAULT ''::character varying,
    delivery character varying(50) NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.order_item OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16547)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.order_items_id_seq OWNER TO postgres;

--
-- TOC entry 3388 (class 0 OID 0)
-- Dependencies: 219
-- Name: order_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_items_id_seq OWNED BY public.order_item.id;


--
-- TOC entry 214 (class 1259 OID 16519)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(100) DEFAULT ''::character varying NOT NULL,
    price integer NOT NULL,
    image character varying,
    description text,
    category_id smallint,
    is_deleted smallint DEFAULT 0 NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone,
    deleted_at timestamp without time zone
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 213 (class 1259 OID 16518)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.products_id_seq OWNER TO postgres;

--
-- TOC entry 3389 (class 0 OID 0)
-- Dependencies: 213
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.product.id;


--
-- TOC entry 210 (class 1259 OID 16498)
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(50) DEFAULT ''::character varying,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    phone character varying(25) NOT NULL,
    role public.role_coffeeteria NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16507)
-- Name: user_detail; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_detail (
    id integer NOT NULL,
    user_id smallint NOT NULL,
    first_name character varying(50) DEFAULT ''::character varying NOT NULL,
    last_name character varying(50) DEFAULT ''::character varying NOT NULL,
    birth_date date,
    gender public.gender_coffeeteria,
    address text DEFAULT ''::character varying NOT NULL,
    image character varying,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp without time zone
);


ALTER TABLE public.user_detail OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16506)
-- Name: user_details_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_details_id_seq OWNER TO postgres;

--
-- TOC entry 3390 (class 0 OID 0)
-- Dependencies: 211
-- Name: user_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_details_id_seq OWNED BY public.user_detail.id;


--
-- TOC entry 209 (class 1259 OID 16497)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3391 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public."user".id;


--
-- TOC entry 3210 (class 2604 OID 16534)
-- Name: category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3213 (class 2604 OID 16543)
-- Name: order_detail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail ALTER COLUMN id SET DEFAULT nextval('public.order_details_id_seq'::regclass);


--
-- TOC entry 3215 (class 2604 OID 16551)
-- Name: order_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item ALTER COLUMN id SET DEFAULT nextval('public.order_items_id_seq'::regclass);


--
-- TOC entry 3206 (class 2604 OID 16522)
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- TOC entry 3198 (class 2604 OID 16501)
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3201 (class 2604 OID 16510)
-- Name: user_detail id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_detail ALTER COLUMN id SET DEFAULT nextval('public.user_details_id_seq'::regclass);


--
-- TOC entry 3376 (class 0 OID 16531)
-- Dependencies: 216
-- Data for Name: category; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.category (id, name, created_at, updated_at) VALUES (1, 'Coffee', '2022-03-22 05:19:48.321', NULL);
INSERT INTO public.category (id, name, created_at, updated_at) VALUES (2, 'Non Coffee', '2022-03-22 05:20:02.245', NULL);
INSERT INTO public.category (id, name, created_at, updated_at) VALUES (3, 'Food', '2022-03-22 05:20:09.641', NULL);
INSERT INTO public.category (id, name, created_at, updated_at) VALUES (4, 'Add-on', '2022-03-22 05:20:18.025', NULL);


--
-- TOC entry 3378 (class 0 OID 16540)
-- Dependencies: 218
-- Data for Name: order_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3380 (class 0 OID 16548)
-- Dependencies: 220
-- Data for Name: order_item; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3374 (class 0 OID 16519)
-- Dependencies: 214
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (1, 'Veggie Tomato Mix', 34000, 'http://localhost:3939/uploads/1645025608094-Wed_Feb_16_2022-22.33.28-Veggie_Tomato_Mix.png', 'This food is named Veggie Tomato Mix because Veggie Tomato Mix is Veggie Tomato Mix', 3, 0, '2022-03-22 04:58:11.824', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (2, 'Hazelnut Latte', 25000, 'http://localhost:3939/uploads/1645025631296-Wed_Feb_16_2022-22.33.51-Hazelnut_Latte.png', 'This drink is named Hazelnut Latte because Hazelnut Latte is Hazelnut Latte', 1, 0, '2022-03-22 05:00:54.847', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (3, 'Summer Fried Rice', 32000, 'http://localhost:3939/uploads/1645025649926-Wed_Feb_16_2022-22.34.09-Summer_Fried_Rice.png', 'This food is named Summer Fried Rice because Summer Fried Rice is Summer Fried Rice', 3, 0, '2022-03-22 05:01:32.542', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (4, 'Creamy Ice Latte', 27000, 'http://localhost:3939/uploads/1645025666410-Wed_Feb_16_2022-22.34.26-Creamy_Ice_Latte.png', 'This drink is named Creamy Ice Latte because Creamy Ice Latte is Creamy Ice Latte', 1, 0, '2022-03-22 05:02:07.79', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (5, 'Drum Sticks', 30000, 'http://localhost:3939/uploads/1645025693241-Wed_Feb_16_2022-22.34.53-Drum_Sticks.png', 'This food is named Drum Sticks because Drum Sticks is Drum Sticks', 3, 0, '2022-03-22 05:03:05.267', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (6, 'Salty Rice', 20000, 'http://localhost:3939/uploads/1645025712425-Wed_Feb_16_2022-22.35.12-Salty_Rice.png', 'This food is named Salty Rice because Salty Rice is Salty Rice', 3, 0, '2022-03-22 05:03:48.185', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (7, 'Pinky Promise', 20000, 'http://localhost:3939/uploads/1645025728528-Wed_Feb_16_2022-22.35.28-Pinky_Promise.png', 'This drink is named Pinky Promise because Pinky Promise is Pinky Promise', 2, 0, '2022-03-22 05:04:10.034', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (8, 'Chicken Wings', 40000, 'http://localhost:3939/uploads/1645475570300-Tue_Feb_22_2022-03.32.50-Chicken_Wings.png', 'This food is named Chicken Wings because Chicken Wings is Chicken Wings', 3, 0, '2022-03-22 05:04:57.78', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (10, 'Coffee Latte', 15000, 'http://localhost:3939/uploads/1645363787616-Sun_Feb_20_2022-20.29.47-Cofee_Latte.jpg', 'Coffee Latte is named Coffee Latte because Coffee Latte is Coffee Latte', 1, 0, '2022-03-22 05:07:12.236', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (11, 'Cappucino', 5000, 'http://localhost:3939/uploads/1645363825647-Sun_Feb_20_2022-20.30.25-Cappucino.jpg', 'Cappucino is named Cappucino because Cappucino is Cappucino', 1, 0, '2022-03-22 05:07:36.19', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (12, 'Red Velvet Latte', 33000, 'http://localhost:3939/uploads/1645363883554-Sun_Feb_20_2022-20.31.23-Red_Velvet_Latte.jpg', 'Red Velvet Latte is named Red Velvet Latte because Red Velvet Latte is Red Velvet Latte', 1, 0, '2022-03-22 05:08:00.557', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (13, 'Choco Rhum', 28000, 'http://localhost:3939/uploads/1645363980533-Sun_Feb_20_2022-20.33.00-Choco_Rhum.jpg', 'Choco Rhum is named Choco Rhum because Choco Rhum is Choco Rhum', 4, 0, '2022-03-22 05:08:39.712', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (14, 'Salmon Truffle Teriyaki', 60000, 'http://localhost:3939/uploads/1645364114911-Sun_Feb_20_2022-20.35.14-Salmon_Truffle_Teriyaki.jpg', 'Salmon Truffle Teriyaki is named Salmon Truffle Teriyaki because Salmon Truffle Teriyaki is Salmon Truffle Teriyaki', 3, 0, '2022-03-22 05:09:12.823', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (15, 'Wiener Schnitzel', 69000, 'http://localhost:3939/uploads/1645364163509-Sun_Feb_20_2022-20.36.03-Wiener_Schnitzel.jpg', 'Wiener Schnitzel is named Wiener Schnitzel because Wiener Schnitzel is Wiener Schnitzel', 3, 0, '2022-03-22 05:09:37.583', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (9, 'Cold Brew', 15000, 'http://localhost:3939/uploads/1645025755941-Wed_Feb_16_2022-22.35.55-Cold_Brew.png', 'Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours', 2, 0, '2022-03-22 05:06:02.803', NULL, NULL);
INSERT INTO public.product (id, name, price, image, description, category_id, is_deleted, created_at, updated_at, deleted_at) VALUES (16, 'Just Dummy', 10000, 'https://res.cloudinary.com/gomii/image/upload/v1647911650/app_CoffeeTeria/q71g4xiaa1okmcfnzhx7.jpg', 'Test', 4, 1, '2022-03-22 08:14:09.628', '2022-03-22 08:18:54.057', '2022-03-22 08:19:24.571');


--
-- TOC entry 3370 (class 0 OID 16498)
-- Dependencies: 210
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user" (id, username, email, password, phone, role, created_at, updated_at) VALUES (3, '', 'lecca@gmail.com', '$2a$10$cCmL027mG4Ja2bJVDhKNLupYEPjv4tM1P9hv2Kab9HuG.s0T4LA62', '081234567890', 'customer', '2022-03-22 05:23:33.878', NULL);
INSERT INTO public."user" (id, username, email, password, phone, role, created_at, updated_at) VALUES (2, 'Terra', 'terra@gmail.com', '$2a$10$Laz8ljyF7vsttK8f4K/YKeKGJ83t9ZbQBfUISJb/vFoqexYHkgRqG', '+6281234567890', 'admin', '2022-03-22 04:50:57.229', '2022-03-22 08:12:25.827');


--
-- TOC entry 3372 (class 0 OID 16507)
-- Dependencies: 212
-- Data for Name: user_detail; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.user_detail (id, user_id, first_name, last_name, birth_date, gender, address, image, created_at, updated_at) VALUES (3, 3, '', '', NULL, NULL, '', NULL, '2022-03-22 05:23:34.743', NULL);
INSERT INTO public.user_detail (id, user_id, first_name, last_name, birth_date, gender, address, image, created_at, updated_at) VALUES (2, 2, 'Terra', 'Firma', '2022-03-22', 'male', 'Example Road, Block. AA, No. 00, Example City', 'http://localhost:3939/uploads/1645289817890-Sat_Feb_19_2022-23.56.57-A2.jpeg', '2022-03-22 04:50:57.798', '2022-03-22 08:12:25.827');


--
-- TOC entry 3392 (class 0 OID 0)
-- Dependencies: 215
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 4, true);


--
-- TOC entry 3393 (class 0 OID 0)
-- Dependencies: 217
-- Name: order_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_details_id_seq', 2, true);


--
-- TOC entry 3394 (class 0 OID 0)
-- Dependencies: 219
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 4, true);


--
-- TOC entry 3395 (class 0 OID 0)
-- Dependencies: 213
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 16, true);


--
-- TOC entry 3396 (class 0 OID 0)
-- Dependencies: 211
-- Name: user_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_details_id_seq', 3, true);


--
-- TOC entry 3397 (class 0 OID 0)
-- Dependencies: 209
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 3, true);


--
-- TOC entry 3225 (class 2606 OID 16538)
-- Name: category categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.category
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3227 (class 2606 OID 16546)
-- Name: order_detail order_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_detail
    ADD CONSTRAINT order_details_pkey PRIMARY KEY (id);


--
-- TOC entry 3229 (class 2606 OID 16554)
-- Name: order_item order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 3223 (class 2606 OID 16529)
-- Name: product products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 3221 (class 2606 OID 16517)
-- Name: user_detail user_details_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_detail
    ADD CONSTRAINT user_details_pkey PRIMARY KEY (id);


--
-- TOC entry 3219 (class 2606 OID 16505)
-- Name: user users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


-- Completed on 2022-03-22 08:36:33

--
-- PostgreSQL database dump complete
--

