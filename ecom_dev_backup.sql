--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9
-- Dumped by pg_dump version 16.9

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
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: fees_fee_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.fees_fee_type_enum AS ENUM (
    'FIXED',
    'PERCENTAGE'
);


ALTER TYPE public.fees_fee_type_enum OWNER TO postgres;

--
-- Name: verification_codes_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.verification_codes_type_enum AS ENUM (
    'email_verification',
    'password_reset'
);


ALTER TYPE public.verification_codes_type_enum OWNER TO postgres;

--
-- Name: vouchers_voucher_type_enum; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public.vouchers_voucher_type_enum AS ENUM (
    'PERCENTAGE',
    'FIXED_AMOUNT',
    'FREE_SHIPPING'
);


ALTER TYPE public.vouchers_voucher_type_enum OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: addresses; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.addresses (
    "addressId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    street character varying NOT NULL,
    city character varying NOT NULL,
    "postalCode" character varying NOT NULL,
    country character varying NOT NULL,
    is_default boolean DEFAULT false NOT NULL,
    "userId" uuid
);


ALTER TABLE public.addresses OWNER TO postgres;

--
-- Name: book_attributes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.book_attributes (
    "bookId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    book_title character varying(255) NOT NULL,
    book_pages integer DEFAULT 0 NOT NULL,
    publish_date date NOT NULL,
    product_id uuid
);


ALTER TABLE public.book_attributes OWNER TO postgres;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    "categoryId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    category_name character varying(50) NOT NULL,
    category_description text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_promotions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories_promotions (
    promotion_id uuid NOT NULL,
    category_id uuid NOT NULL
);


ALTER TABLE public.categories_promotions OWNER TO postgres;

--
-- Name: clothing_attributes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.clothing_attributes (
    "clothingId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    clothing_size character varying(10) NOT NULL,
    clothing_color character varying(50) NOT NULL,
    clothing_material character varying(50) NOT NULL,
    product_id uuid
);


ALTER TABLE public.clothing_attributes OWNER TO postgres;

--
-- Name: fees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fees (
    "feeId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    fee_name character varying NOT NULL,
    fee_type public.fees_fee_type_enum NOT NULL,
    fee_amount numeric NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.fees OWNER TO postgres;

--
-- Name: inventories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventories (
    "inventoryId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    quantity_on_stock integer DEFAULT 0 NOT NULL,
    available_stock integer DEFAULT 0 NOT NULL,
    reserved_stock integer DEFAULT 0 NOT NULL,
    sku character varying(50) NOT NULL,
    img_url text[] DEFAULT '{}'::text[],
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "createdBy" uuid NOT NULL,
    product_id uuid
);


ALTER TABLE public.inventories OWNER TO postgres;

--
-- Name: inventories_variationOptions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."inventories_variationOptions" (
    variation_option_id uuid NOT NULL,
    inventory_id uuid NOT NULL
);


ALTER TABLE public."inventories_variationOptions" OWNER TO postgres;

--
-- Name: migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO postgres;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    "orderItemId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    total_price numeric(10,2) NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "orderId" uuid
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- Name: order_status_history; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_status_history (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    old_status character varying NOT NULL,
    new_status character varying NOT NULL,
    note character varying,
    changed_at timestamp without time zone DEFAULT now() NOT NULL,
    "orderId" uuid
);


ALTER TABLE public.order_status_history OWNER TO postgres;

--
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    "orderId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    total_price numeric NOT NULL,
    payment_method character varying NOT NULL,
    status character varying NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    user_id uuid,
    address_id uuid,
    shipping_id uuid
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- Name: orders_fees; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_fees (
    order_id uuid NOT NULL,
    fee_id uuid NOT NULL
);


ALTER TABLE public.orders_fees OWNER TO postgres;

--
-- Name: orders_vouchers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders_vouchers (
    "orderVoucherId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "appliedDiscount" numeric NOT NULL,
    "orderId" uuid,
    voucher_id uuid
);


ALTER TABLE public.orders_vouchers OWNER TO postgres;

--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    "permissionId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    permission_name character varying NOT NULL
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    "productId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    product_name character varying NOT NULL,
    product_price numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    img_url text[] DEFAULT '{}'::text[],
    is_active boolean DEFAULT true NOT NULL,
    is_signature boolean DEFAULT false NOT NULL,
    description text,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatesAt" timestamp with time zone DEFAULT now() NOT NULL,
    category_id uuid
);


ALTER TABLE public.products OWNER TO postgres;

--
-- Name: promotions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.promotions (
    "promotionId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    promotion_name character varying(50) NOT NULL,
    promotion_discount numeric(10,2) DEFAULT '0'::numeric NOT NULL,
    "createAt" timestamp with time zone DEFAULT now() NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.promotions OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    "roleId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    role_name character varying NOT NULL
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles_permissions (
    role_id uuid NOT NULL,
    permission_id uuid NOT NULL
);


ALTER TABLE public.roles_permissions OWNER TO postgres;

--
-- Name: sessions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.sessions (
    "sessionId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "userAgent" character varying(255),
    "expiresAt" timestamp without time zone NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "userId" uuid
);


ALTER TABLE public.sessions OWNER TO postgres;

--
-- Name: shipping; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shipping (
    "shippingId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    shipping_name character varying(50) NOT NULL,
    shipping_price numeric(10,2) NOT NULL
);


ALTER TABLE public.shipping OWNER TO postgres;

--
-- Name: store_product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.store_product (
    store_id uuid NOT NULL,
    product_id uuid NOT NULL
);


ALTER TABLE public.store_product OWNER TO postgres;

--
-- Name: stores; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.stores (
    "storeId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(255) NOT NULL,
    location character varying NOT NULL
);


ALTER TABLE public.stores OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    "userId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    username character varying NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone DEFAULT now() NOT NULL,
    "updatedAt" timestamp with time zone DEFAULT now() NOT NULL,
    "roleId" uuid
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: variation_options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.variation_options (
    "variationOptionId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    option_value character varying(50) NOT NULL,
    variation_id uuid
);


ALTER TABLE public.variation_options OWNER TO postgres;

--
-- Name: variations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.variations (
    "variationId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    variation_name character varying(50) NOT NULL,
    category_id uuid
);


ALTER TABLE public.variations OWNER TO postgres;

--
-- Name: verification_codes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.verification_codes (
    "verificationId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    type public.verification_codes_type_enum NOT NULL,
    "createAt" timestamp with time zone DEFAULT now() NOT NULL,
    "expiresAt" timestamp without time zone NOT NULL,
    "userId" uuid
);


ALTER TABLE public.verification_codes OWNER TO postgres;

--
-- Name: vouchers; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.vouchers (
    "voucherId" uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    voucher_code character varying NOT NULL,
    voucher_type public.vouchers_voucher_type_enum NOT NULL,
    description character varying NOT NULL,
    voucher_value numeric(10,2) NOT NULL,
    min_order_value numeric(10,2),
    max_discount numeric(10,2),
    voucher_limit integer DEFAULT 1 NOT NULL,
    voucher_used integer DEFAULT 0 NOT NULL,
    is_active boolean DEFAULT true NOT NULL
);


ALTER TABLE public.vouchers OWNER TO postgres;

--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Data for Name: addresses; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.addresses ("addressId", street, city, "postalCode", country, is_default, "userId") FROM stdin;
\.


--
-- Data for Name: book_attributes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.book_attributes ("bookId", book_title, book_pages, publish_date, product_id) FROM stdin;
10cdde15-29bf-4c37-b281-6c4cd947b4a6	Hello	0	2025-10-10	4c4cd2dd-ddd9-4c9d-a1c8-12dad5342f2b
c63e62fe-68fc-4c44-9c49-6ace95fcfac8	Hello	0	2025-10-10	5bc92133-4815-4c65-b5c1-4f5e5eaf4632
f24232f8-c44c-48d6-88ec-9d3ebd1e137b	Hello	0	2025-10-10	52fdad8b-abe0-4dd4-8de8-0e34201d12b8
9e7de13f-b09a-41e2-a826-4596789dc4f9	Hello	0	2025-10-10	cdf99fa5-7914-430a-bc43-6315dfc6ce13
9cc57105-60a8-471f-9292-fc56a0c9a147	Hello	0	2025-10-10	59069d16-2285-4892-a59e-02a204dd0f85
d70f15c6-0f6f-44b6-9c35-526a03119e7a	Hello	0	2025-10-10	c1419dbb-89c8-4f61-ae0a-3a19f955dfd8
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories ("categoryId", category_name, category_description, "createdAt") FROM stdin;
b9d4d841-2019-439f-935c-86ceb88e95bc	Book	\N	2025-07-07 14:57:23.303075+07
227d7c6c-cdf3-467c-ac84-ec8539eff2d3	Clothing	\N	2025-07-07 14:57:31.66307+07
\.


--
-- Data for Name: categories_promotions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories_promotions (promotion_id, category_id) FROM stdin;
\.


--
-- Data for Name: clothing_attributes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.clothing_attributes ("clothingId", clothing_size, clothing_color, clothing_material, product_id) FROM stdin;
\.


--
-- Data for Name: fees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.fees ("feeId", fee_name, fee_type, fee_amount, is_active) FROM stdin;
\.


--
-- Data for Name: inventories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventories ("inventoryId", quantity_on_stock, available_stock, reserved_stock, sku, img_url, "createdAt", "createdBy", product_id) FROM stdin;
8886c939-9d6c-4864-84a3-2e7a158c04f2	5	5	0	Hello=hello	{}	2025-07-08 16:20:17.604593+07	2eacf00d-ed65-4925-a6c1-c4e26cfbd712	4c4cd2dd-ddd9-4c9d-a1c8-12dad5342f2b
4a927f04-6541-43be-8ca1-f05a574f4f48	5	5	0	ProductL05-5bc92133-4815-4c65-b5c1-4f5e5eaf4632	{}	2025-07-08 16:25:14.042865+07	2eacf00d-ed65-4925-a6c1-c4e26cfbd712	5bc92133-4815-4c65-b5c1-4f5e5eaf4632
df9b97b1-eb2e-4bf2-9a93-0cadbc4eb09c	5	5	0	ProductL05-52fdad8b-abe0-4dd4-8de8-0e34201d12b8	{}	2025-07-08 16:25:51.404183+07	2eacf00d-ed65-4925-a6c1-c4e26cfbd712	52fdad8b-abe0-4dd4-8de8-0e34201d12b8
99aa37bb-6210-48a0-8959-882b234fc06d	5	5	0	ProductL05-cdf99fa5-7914-430a-bc43-6315dfc6ce13	{}	2025-07-08 16:26:08.425529+07	2eacf00d-ed65-4925-a6c1-c4e26cfbd712	cdf99fa5-7914-430a-bc43-6315dfc6ce13
5f27146c-594c-4599-8ee5-5b48da4dc103	5	5	0	Product_05-59069d16-2285-4892-a59e-02a204dd0f85	{}	2025-07-08 16:41:43.56854+07	2eacf00d-ed65-4925-a6c1-c4e26cfbd712	59069d16-2285-4892-a59e-02a204dd0f85
c93f8bd1-bf86-479e-80a1-25735529c63d	5	5	0	Product_05-Hello-2025-10-10	{}	2025-07-08 17:11:04.513863+07	2eacf00d-ed65-4925-a6c1-c4e26cfbd712	c1419dbb-89c8-4f61-ae0a-3a19f955dfd8
\.


--
-- Data for Name: inventories_variationOptions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."inventories_variationOptions" (variation_option_id, inventory_id) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1750749828989	CreateAndModifyOrder1750749828989
2	1750752478757	AddAddressFeatureToUser1750752478757
3	1750752889164	AddAddressFeatureToUser1750752889164
4	1750833456848	ModifyFeatureOfProduct1750833456848
5	1751014282979	AddCreateAndUpdateTimeOnProduct1751014282979
6	1751707145954	UpdateDatabaseSchema1751707145954
7	1751863188589	UpdateDatabaseSchema1751863188589
8	1751874884520	UpdateDatabaseSchema1751874884520
9	1751875000734	UpdateDatabaseSchema1751875000734
10	1751963220165	UpdateDatabaseSchema1751963220165
\.


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items ("orderItemId", unit_price, total_price, "createdAt", "orderId") FROM stdin;
\.


--
-- Data for Name: order_status_history; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_status_history (id, old_status, new_status, note, changed_at, "orderId") FROM stdin;
\.


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders ("orderId", total_price, payment_method, status, "createdAt", "updatedAt", user_id, address_id, shipping_id) FROM stdin;
\.


--
-- Data for Name: orders_fees; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_fees (order_id, fee_id) FROM stdin;
\.


--
-- Data for Name: orders_vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders_vouchers ("orderVoucherId", "appliedDiscount", "orderId", voucher_id) FROM stdin;
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions ("permissionId", permission_name) FROM stdin;
bbcfb054-b01e-4f05-96d7-4eed5e1a923c	create:product
72d76707-7b77-46f5-8800-67faa08715e0	update:product
4abcccbd-fc06-439c-b80d-9d31b1a439b1	get:product
c77e4cba-b7b5-4be7-a131-a85c9aba0fe7	delete:product
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products ("productId", product_name, product_price, img_url, is_active, is_signature, description, "createdAt", "updatesAt", category_id) FROM stdin;
c65962f0-3d6c-42ea-91d4-a2d535323ae6	Product_01	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1750846947/products/djh1kgdaieh2qhem9fjd.png}	t	f	12	2025-06-27 15:51:51.454386+07	2025-06-27 15:51:51.454386+07	\N
23af9f24-7dd9-4965-9a8e-38cd9f6ce65d	Product_02	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1750915614/products/pusmgpaj5utxj2ydqyuj.png,https://res.cloudinary.com/dtattw8cd/image/upload/v1750915614/products/tvuv84arlk43ql6bi5l5.png}	t	f	12	2025-06-27 15:51:51.454386+07	2025-06-27 15:51:51.454386+07	\N
fcc3def5-9650-48e4-9607-8fbf797f65ce	Product_04	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751090218/qerqlduhrnhsjc7qhwhk.png,https://res.cloudinary.com/dtattw8cd/image/upload/v1751090219/j3apnrffs8wyga0svktt.png}	t	f	12	2025-06-28 12:57:00.220205+07	2025-06-28 12:57:00.220205+07	\N
1d690ab3-6c04-4f8e-9cc1-0e214a8ec611	Product_03	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751118341/larm9zjpxzynpf0bohge.png,https://res.cloudinary.com/dtattw8cd/image/upload/v1751171656/imjhox6lmw7a893t9xwt.png,https://res.cloudinary.com/dtattw8cd/image/upload/v1751265157/btclus6z5qsgujtmgnxh.png}	t	f	12	2025-06-27 18:25:04.879168+07	2025-06-30 13:32:38.894152+07	\N
59c4a120-4812-40ff-b731-4dc35c114d44	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751963305/kd1cd1jps9zl4xuacbpc.png}	t	f	\N	2025-07-08 15:28:27.062864+07	2025-07-08 15:28:27.062864+07	\N
9c433379-25c5-416a-bc77-5dc8c9a049dc	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751963340/bwyx164vrfyfjodmg0ru.png}	t	f	\N	2025-07-08 15:29:01.857899+07	2025-07-08 15:29:01.857899+07	\N
fd50a418-3155-4d0a-8df7-384831377e27	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751963406/szglto3wfgkkwwm00c9k.png}	t	f	\N	2025-07-08 15:30:07.499669+07	2025-07-08 15:30:07.499669+07	\N
7c4bfa3a-d42a-472c-8a4f-83273c6a51ab	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751963698/henxhlrvqywnomnaltnf.png}	t	f	\N	2025-07-08 15:34:59.257306+07	2025-07-08 15:34:59.257306+07	\N
50add87e-f611-446c-8a8a-6806d679ddb7	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751963740/sr9e6vlmdlomj7sgioda.png}	t	f	\N	2025-07-08 15:35:42.068605+07	2025-07-08 15:35:42.068605+07	\N
93baa9cf-9450-4606-8d6e-50c95ea43897	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751964484/c0xmew50xjybntatkzct.png}	t	f	\N	2025-07-08 15:48:05.701018+07	2025-07-08 15:48:05.701018+07	\N
0c6e2d95-b73f-4553-810a-2570ce803317	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751964669/rlgjbmk4edaijztshkmf.png}	t	f	\N	2025-07-08 15:51:10.845822+07	2025-07-08 15:51:10.845822+07	\N
9073f022-0c27-44f2-9f03-5a64d8092f7a	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751964999/c5i3qr8niome12ghdzi7.png}	t	f	\N	2025-07-08 15:56:41.239074+07	2025-07-08 15:56:41.239074+07	\N
f5b2765b-d176-4bd7-bfde-8003c2da5acf	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751965048/kdbibbmchf3x8840egws.png}	t	f	\N	2025-07-08 15:57:29.917805+07	2025-07-08 15:57:29.917805+07	\N
ee1475e8-020a-4736-82df-b8efdcd1d00e	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751965528/uc184vo6nobtvin6v6fs.png}	t	f	\N	2025-07-08 16:05:30.893612+07	2025-07-08 16:05:30.893612+07	\N
a732df57-e23c-4e59-8876-5c133926eb07	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751965809/rktmhfkzxzq4rf1azq9y.png}	t	f	\N	2025-07-08 16:10:10.442704+07	2025-07-08 16:10:10.442704+07	\N
7831558e-1b0e-404d-a584-91922ab279fc	ProductL05	10000.00	{}	t	f	\N	2025-07-08 16:11:57.091328+07	2025-07-08 16:11:57.091328+07	\N
db83e62d-492d-449d-9aa9-b6ebac7a152f	ProductL05	10000.00	{}	t	f	\N	2025-07-08 16:12:26.640276+07	2025-07-08 16:12:26.640276+07	\N
4c4cd2dd-ddd9-4c9d-a1c8-12dad5342f2b	ProductL05	10000.00	{}	t	f	\N	2025-07-08 16:20:17.592316+07	2025-07-08 16:20:17.592316+07	\N
5bc92133-4815-4c65-b5c1-4f5e5eaf4632	ProductL05	10000.00	{}	t	f	\N	2025-07-08 16:25:14.016612+07	2025-07-08 16:25:14.016612+07	\N
52fdad8b-abe0-4dd4-8de8-0e34201d12b8	ProductL05	10000.00	{}	t	f	\N	2025-07-08 16:25:51.391344+07	2025-07-08 16:25:51.391344+07	\N
cdf99fa5-7914-430a-bc43-6315dfc6ce13	ProductL05	10000.00	{}	t	f	\N	2025-07-08 16:26:08.403067+07	2025-07-08 16:26:08.403067+07	\N
59069d16-2285-4892-a59e-02a204dd0f85	Product_05	10000.00	{}	t	f	\N	2025-07-08 16:41:43.551063+07	2025-07-08 16:41:43.551063+07	\N
c1419dbb-89c8-4f61-ae0a-3a19f955dfd8	Product_05	10000.00	{https://res.cloudinary.com/dtattw8cd/image/upload/v1751970741/pljm4w7w05ecc256qfes.png,https://res.cloudinary.com/dtattw8cd/image/upload/v1751970740/f3zx7veexcdgtlrfakih.png}	t	f	\N	2025-07-08 17:11:04.503131+07	2025-07-08 17:32:22.438258+07	\N
\.


--
-- Data for Name: promotions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.promotions ("promotionId", promotion_name, promotion_discount, "createAt", "expiresAt") FROM stdin;
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles ("roleId", role_name) FROM stdin;
4219f856-885d-499d-8d93-cdc2464d1496	admin
90c516b6-0cf9-46fc-a482-80b69f5abc32	customer
\.


--
-- Data for Name: roles_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles_permissions (role_id, permission_id) FROM stdin;
4219f856-885d-499d-8d93-cdc2464d1496	bbcfb054-b01e-4f05-96d7-4eed5e1a923c
4219f856-885d-499d-8d93-cdc2464d1496	72d76707-7b77-46f5-8800-67faa08715e0
4219f856-885d-499d-8d93-cdc2464d1496	4abcccbd-fc06-439c-b80d-9d31b1a439b1
4219f856-885d-499d-8d93-cdc2464d1496	c77e4cba-b7b5-4be7-a131-a85c9aba0fe7
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.sessions ("sessionId", "createdAt", "userAgent", "expiresAt", "updatedAt", "userId") FROM stdin;
d9acd81c-ce24-4911-972d-5ef106d9ca31	2025-07-11 14:59:07.680192+07	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0	2025-08-10 14:59:07.677	2025-07-11 14:59:07.680192+07	21e9e94d-6f6b-484e-8c69-04b557d64442
8d68177e-445d-47e8-821c-52217be3ba3a	2025-07-11 16:33:32.135153+07	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0	2025-08-10 16:33:32.134	2025-07-11 16:33:32.135153+07	21e9e94d-6f6b-484e-8c69-04b557d64442
5cf0a5a8-4a13-4509-8e34-1c6039b0632c	2025-07-11 16:33:32.134709+07	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0	2025-08-10 16:33:32.131	2025-07-11 16:33:32.134709+07	21e9e94d-6f6b-484e-8c69-04b557d64442
f8f5d1a7-88ac-43b9-9924-529be188a197	2025-07-11 16:33:38.267277+07	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36 Edg/138.0.0.0	2025-08-10 16:33:38.266	2025-07-11 16:33:38.267277+07	21e9e94d-6f6b-484e-8c69-04b557d64442
\.


--
-- Data for Name: shipping; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shipping ("shippingId", shipping_name, shipping_price) FROM stdin;
\.


--
-- Data for Name: store_product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.store_product (store_id, product_id) FROM stdin;
\.


--
-- Data for Name: stores; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.stores ("storeId", name, location) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users ("userId", username, email, password, verified, "createdAt", "updatedAt", "roleId") FROM stdin;
21e9e94d-6f6b-484e-8c69-04b557d64442	Duong Chau	boyonecharm1409@gmail.com	$2b$10$xjGbMpknqv2r0lm52Nkk2uzAv22enC8uNqsfhkZS/LpgAtSuXr48S	t	2025-07-11 14:59:02.617947+07	2025-07-11 15:00:45.772496+07	90c516b6-0cf9-46fc-a482-80b69f5abc32
\.


--
-- Data for Name: variation_options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.variation_options ("variationOptionId", option_value, variation_id) FROM stdin;
\.


--
-- Data for Name: variations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.variations ("variationId", variation_name, category_id) FROM stdin;
\.


--
-- Data for Name: verification_codes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.verification_codes ("verificationId", type, "createAt", "expiresAt", "userId") FROM stdin;
fe4279ba-4ff2-497c-9fed-2b825a31bd88	email_verification	2025-07-11 14:59:02.702829+07	2025-07-11 15:04:02.701	21e9e94d-6f6b-484e-8c69-04b557d64442
\.


--
-- Data for Name: vouchers; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.vouchers ("voucherId", voucher_code, voucher_type, description, voucher_value, min_order_value, max_discount, voucher_limit, voucher_used, is_active) FROM stdin;
\.


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.migrations_id_seq', 10, true);


--
-- Name: roles_permissions PK_0cd11f0b35c4d348c6ebb9b36b7; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT "PK_0cd11f0b35c4d348c6ebb9b36b7" PRIMARY KEY (role_id, permission_id);


--
-- Name: inventories_variationOptions PK_1d31609f5724c66d23f26e9edcc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."inventories_variationOptions"
    ADD CONSTRAINT "PK_1d31609f5724c66d23f26e9edcc" PRIMARY KEY (variation_option_id, inventory_id);


--
-- Name: variation_options PK_28c31f8296dd37022dc2ae518d2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variation_options
    ADD CONSTRAINT "PK_28c31f8296dd37022dc2ae518d2" PRIMARY KEY ("variationOptionId");


--
-- Name: roles PK_39bf7e8af8fe54d9d1c7a8efe6f; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "PK_39bf7e8af8fe54d9d1c7a8efe6f" PRIMARY KEY ("roleId");


--
-- Name: orders PK_41ba27842ac1a2c24817ca59eaa; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "PK_41ba27842ac1a2c24817ca59eaa" PRIMARY KEY ("orderId");


--
-- Name: order_items PK_4e1bb5fea3ad96dcc899be6cc7d; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "PK_4e1bb5fea3ad96dcc899be6cc7d" PRIMARY KEY ("orderItemId");


--
-- Name: promotions PK_685072e22d6413c91bc4b92390a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.promotions
    ADD CONSTRAINT "PK_685072e22d6413c91bc4b92390a" PRIMARY KEY ("promotionId");


--
-- Name: clothing_attributes PK_72b9cd04e5254a22c77763f3311; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clothing_attributes
    ADD CONSTRAINT "PK_72b9cd04e5254a22c77763f3311" PRIMARY KEY ("clothingId");


--
-- Name: inventories PK_79fa97e66bebd5549e4be0c11ef; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventories
    ADD CONSTRAINT "PK_79fa97e66bebd5549e4be0c11ef" PRIMARY KEY ("inventoryId");


--
-- Name: products PK_7b3b507508cd0f86a5b2e923459; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_7b3b507508cd0f86a5b2e923459" PRIMARY KEY ("productId");


--
-- Name: shipping PK_7bb53fc029bd38a48d26ffefce5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shipping
    ADD CONSTRAINT "PK_7bb53fc029bd38a48d26ffefce5" PRIMARY KEY ("shippingId");


--
-- Name: book_attributes PK_82059196c9f28acea26ace447e6; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_attributes
    ADD CONSTRAINT "PK_82059196c9f28acea26ace447e6" PRIMARY KEY ("bookId");


--
-- Name: orders_fees PK_895cd2af48a680bd1426286122a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_fees
    ADD CONSTRAINT "PK_895cd2af48a680bd1426286122a" PRIMARY KEY (order_id, fee_id);


--
-- Name: users PK_8bf09ba754322ab9c22a215c919; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "PK_8bf09ba754322ab9c22a215c919" PRIMARY KEY ("userId");


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: fees PK_91f2c864927aee4fa537e06d1c5; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fees
    ADD CONSTRAINT "PK_91f2c864927aee4fa537e06d1c5" PRIMARY KEY ("feeId");


--
-- Name: orders_vouchers PK_9e8f9f569849da8db5908601508; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_vouchers
    ADD CONSTRAINT "PK_9e8f9f569849da8db5908601508" PRIMARY KEY ("orderVoucherId");


--
-- Name: variations PK_9efbc99366b6697239fbf66eb22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variations
    ADD CONSTRAINT "PK_9efbc99366b6697239fbf66eb22" PRIMARY KEY ("variationId");


--
-- Name: categories_promotions PK_a91fc0529ce6381b5ffb813fdc9; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories_promotions
    ADD CONSTRAINT "PK_a91fc0529ce6381b5ffb813fdc9" PRIMARY KEY (promotion_id, category_id);


--
-- Name: stores PK_aae7a9efec0e6e614522d90c840; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.stores
    ADD CONSTRAINT "PK_aae7a9efec0e6e614522d90c840" PRIMARY KEY ("storeId");


--
-- Name: permissions PK_b4b17d691e3c22be36b2b9f355a; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "PK_b4b17d691e3c22be36b2b9f355a" PRIMARY KEY ("permissionId");


--
-- Name: sessions PK_ba57f8421edf5e5c4e99b833811; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "PK_ba57f8421edf5e5c4e99b833811" PRIMARY KEY ("sessionId");


--
-- Name: verification_codes PK_bbb9d5dfd806fa1b639bc589818; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_codes
    ADD CONSTRAINT "PK_bbb9d5dfd806fa1b639bc589818" PRIMARY KEY ("verificationId");


--
-- Name: categories PK_c9594c262e6781893a1068d91be; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_c9594c262e6781893a1068d91be" PRIMARY KEY ("categoryId");


--
-- Name: vouchers PK_c9fa7aaaaf8bb9c0c80e4ab8545; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT "PK_c9fa7aaaaf8bb9c0c80e4ab8545" PRIMARY KEY ("voucherId");


--
-- Name: order_status_history PK_e6c66d853f155531985fc4f6ec8; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT "PK_e6c66d853f155531985fc4f6ec8" PRIMARY KEY (id);


--
-- Name: store_product PK_eb8d5fcb214fac7025e9ef0d6dc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store_product
    ADD CONSTRAINT "PK_eb8d5fcb214fac7025e9ef0d6dc" PRIMARY KEY (store_id, product_id);


--
-- Name: addresses PK_ff59275f5928941ce06f1d8890c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT "PK_ff59275f5928941ce06f1d8890c" PRIMARY KEY ("addressId");


--
-- Name: vouchers UQ_1445a42f62127bf6cde38b4de47; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.vouchers
    ADD CONSTRAINT "UQ_1445a42f62127bf6cde38b4de47" UNIQUE (voucher_code);


--
-- Name: users UQ_97672ac88f789774dd47f7c8be3; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE (email);


--
-- Name: roles UQ_ac35f51a0f17e3e1fe121126039; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT "UQ_ac35f51a0f17e3e1fe121126039" UNIQUE (role_name);


--
-- Name: permissions UQ_b990eff1fc3540798960d80e452; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT "UQ_b990eff1fc3540798960d80e452" UNIQUE (permission_name);


--
-- Name: users UQ_fe0bb3f6520ee0469504521e710; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE (username);


--
-- Name: IDX_337aa8dba227a1fe6b73998307; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_337aa8dba227a1fe6b73998307" ON public.roles_permissions USING btree (permission_id);


--
-- Name: IDX_36912be2e1c4f8106115d5e44f; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_36912be2e1c4f8106115d5e44f" ON public.orders_fees USING btree (order_id);


--
-- Name: IDX_5e6205d75fd130438dd311bede; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_5e6205d75fd130438dd311bede" ON public.orders_fees USING btree (fee_id);


--
-- Name: IDX_77cac5a2dbf7a65dacb7772a42; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_77cac5a2dbf7a65dacb7772a42" ON public."inventories_variationOptions" USING btree (inventory_id);


--
-- Name: IDX_7d2dad9f14eddeb09c256fea71; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_7d2dad9f14eddeb09c256fea71" ON public.roles_permissions USING btree (role_id);


--
-- Name: IDX_a669efcb2ed113493634c0e7d8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_a669efcb2ed113493634c0e7d8" ON public.categories_promotions USING btree (promotion_id);


--
-- Name: IDX_bf5b5be4ac6f34e7df70408adc; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_bf5b5be4ac6f34e7df70408adc" ON public.categories_promotions USING btree (category_id);


--
-- Name: IDX_d4c18c1e1f18ea7dc540ba82f8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_d4c18c1e1f18ea7dc540ba82f8" ON public.store_product USING btree (store_id);


--
-- Name: IDX_d5ababd600191c8e5f09583c39; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_d5ababd600191c8e5f09583c39" ON public."inventories_variationOptions" USING btree (variation_option_id);


--
-- Name: IDX_f4f685a135a1e11dc5cf892fe5; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_f4f685a135a1e11dc5cf892fe5" ON public.store_product USING btree (product_id);


--
-- Name: idx_sessions_expires_at; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_sessions_expires_at ON public.sessions USING btree ("expiresAt");


--
-- Name: idx_sessions_user_agent; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_sessions_user_agent ON public.sessions USING btree ("userAgent");


--
-- Name: idx_sessions_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX idx_sessions_user_id ON public.sessions USING btree ("userId");


--
-- Name: roles_permissions FK_337aa8dba227a1fe6b73998307b; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT "FK_337aa8dba227a1fe6b73998307b" FOREIGN KEY (permission_id) REFERENCES public.permissions("permissionId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: users FK_368e146b785b574f42ae9e53d5e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "FK_368e146b785b574f42ae9e53d5e" FOREIGN KEY ("roleId") REFERENCES public.roles("roleId");


--
-- Name: orders_fees FK_36912be2e1c4f8106115d5e44fd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_fees
    ADD CONSTRAINT "FK_36912be2e1c4f8106115d5e44fd" FOREIGN KEY (order_id) REFERENCES public.orders("orderId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: clothing_attributes FK_4adc6cee6212403019a58d94325; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.clothing_attributes
    ADD CONSTRAINT "FK_4adc6cee6212403019a58d94325" FOREIGN KEY (product_id) REFERENCES public.products("productId");


--
-- Name: variation_options FK_54a7b8efdb5abca6f903e8318dc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variation_options
    ADD CONSTRAINT "FK_54a7b8efdb5abca6f903e8318dc" FOREIGN KEY (variation_id) REFERENCES public.variations("variationId");


--
-- Name: sessions FK_57de40bc620f456c7311aa3a1e6; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT "FK_57de40bc620f456c7311aa3a1e6" FOREIGN KEY ("userId") REFERENCES public.users("userId") ON DELETE CASCADE;


--
-- Name: orders_fees FK_5e6205d75fd130438dd311bede8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_fees
    ADD CONSTRAINT "FK_5e6205d75fd130438dd311bede8" FOREIGN KEY (fee_id) REFERENCES public.fees("feeId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: order_status_history FK_689db3835e5550e68d26ca32676; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_status_history
    ADD CONSTRAINT "FK_689db3835e5550e68d26ca32676" FOREIGN KEY ("orderId") REFERENCES public.orders("orderId");


--
-- Name: inventories_variationOptions FK_77cac5a2dbf7a65dacb7772a424; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."inventories_variationOptions"
    ADD CONSTRAINT "FK_77cac5a2dbf7a65dacb7772a424" FOREIGN KEY (inventory_id) REFERENCES public.inventories("inventoryId");


--
-- Name: roles_permissions FK_7d2dad9f14eddeb09c256fea719; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_permissions
    ADD CONSTRAINT "FK_7d2dad9f14eddeb09c256fea719" FOREIGN KEY (role_id) REFERENCES public.roles("roleId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: orders_vouchers FK_8dd11f21d717c8bb156f703ee3c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_vouchers
    ADD CONSTRAINT "FK_8dd11f21d717c8bb156f703ee3c" FOREIGN KEY ("orderId") REFERENCES public.orders("orderId");


--
-- Name: inventories FK_92fc0c77bab4a656b9619322c62; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventories
    ADD CONSTRAINT "FK_92fc0c77bab4a656b9619322c62" FOREIGN KEY (product_id) REFERENCES public.products("productId");


--
-- Name: addresses FK_95c93a584de49f0b0e13f753630; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.addresses
    ADD CONSTRAINT "FK_95c93a584de49f0b0e13f753630" FOREIGN KEY ("userId") REFERENCES public.users("userId");


--
-- Name: products FK_9a5f6868c96e0069e699f33e124; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_9a5f6868c96e0069e699f33e124" FOREIGN KEY (category_id) REFERENCES public.categories("categoryId");


--
-- Name: verification_codes FK_9a854eeb4598a22d554ecfe6e81; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.verification_codes
    ADD CONSTRAINT "FK_9a854eeb4598a22d554ecfe6e81" FOREIGN KEY ("userId") REFERENCES public.users("userId") ON DELETE CASCADE;


--
-- Name: categories_promotions FK_a669efcb2ed113493634c0e7d8c; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories_promotions
    ADD CONSTRAINT "FK_a669efcb2ed113493634c0e7d8c" FOREIGN KEY (promotion_id) REFERENCES public.promotions("promotionId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: book_attributes FK_a7e4d9ac829fec2d459db238a54; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.book_attributes
    ADD CONSTRAINT "FK_a7e4d9ac829fec2d459db238a54" FOREIGN KEY (product_id) REFERENCES public.products("productId");


--
-- Name: orders FK_a89d985ed97296e5d5f47c9be26; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_a89d985ed97296e5d5f47c9be26" FOREIGN KEY (shipping_id) REFERENCES public.shipping("shippingId");


--
-- Name: orders FK_a922b820eeef29ac1c6800e826a; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_a922b820eeef29ac1c6800e826a" FOREIGN KEY (user_id) REFERENCES public.users("userId");


--
-- Name: categories_promotions FK_bf5b5be4ac6f34e7df70408adc4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories_promotions
    ADD CONSTRAINT "FK_bf5b5be4ac6f34e7df70408adc4" FOREIGN KEY (category_id) REFERENCES public.categories("categoryId");


--
-- Name: orders FK_d39c53244703b8534307adcd073; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "FK_d39c53244703b8534307adcd073" FOREIGN KEY (address_id) REFERENCES public.addresses("addressId");


--
-- Name: store_product FK_d4c18c1e1f18ea7dc540ba82f89; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store_product
    ADD CONSTRAINT "FK_d4c18c1e1f18ea7dc540ba82f89" FOREIGN KEY (store_id) REFERENCES public.stores("storeId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: inventories_variationOptions FK_d5ababd600191c8e5f09583c39e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."inventories_variationOptions"
    ADD CONSTRAINT "FK_d5ababd600191c8e5f09583c39e" FOREIGN KEY (variation_option_id) REFERENCES public.variation_options("variationOptionId") ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: variations FK_d8d59bfc4d994fb45f1d2be0931; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.variations
    ADD CONSTRAINT "FK_d8d59bfc4d994fb45f1d2be0931" FOREIGN KEY (category_id) REFERENCES public.categories("categoryId");


--
-- Name: orders_vouchers FK_e86503f959361448bc92228a194; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders_vouchers
    ADD CONSTRAINT "FK_e86503f959361448bc92228a194" FOREIGN KEY (voucher_id) REFERENCES public.vouchers("voucherId");


--
-- Name: order_items FK_f1d359a55923bb45b057fbdab0d; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "FK_f1d359a55923bb45b057fbdab0d" FOREIGN KEY ("orderId") REFERENCES public.orders("orderId");


--
-- Name: store_product FK_f4f685a135a1e11dc5cf892fe54; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.store_product
    ADD CONSTRAINT "FK_f4f685a135a1e11dc5cf892fe54" FOREIGN KEY (product_id) REFERENCES public.products("productId");


--
-- PostgreSQL database dump complete
--

