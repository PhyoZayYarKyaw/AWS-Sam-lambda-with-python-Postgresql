PGDMP  .                    |            Employee    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16724    Employee    DATABASE     �   CREATE DATABASE "Employee" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "Employee";
                postgres    false            �            1259    25299 	   education    TABLE     �   CREATE TABLE public.education (
    eduid integer NOT NULL,
    type character varying,
    description character varying,
    year bigint,
    id character varying
);
    DROP TABLE public.education;
       public         heap    postgres    false            �            1259    25298    education_eduid_seq    SEQUENCE     �   CREATE SEQUENCE public.education_eduid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.education_eduid_seq;
       public          postgres    false    239            �           0    0    education_eduid_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.education_eduid_seq OWNED BY public.education.eduid;
          public          postgres    false    238            J           2604    25302    education eduid    DEFAULT     r   ALTER TABLE ONLY public.education ALTER COLUMN eduid SET DEFAULT nextval('public.education_eduid_seq'::regclass);
 >   ALTER TABLE public.education ALTER COLUMN eduid DROP DEFAULT;
       public          postgres    false    239    238    239            �          0    25299 	   education 
   TABLE DATA           G   COPY public.education (eduid, type, description, year, id) FROM stdin;
    public          postgres    false    239   p       �           0    0    education_eduid_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.education_eduid_seq', 60, true);
          public          postgres    false    238            L           2606    25306    education education_pkey 
   CONSTRAINT     Y   ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_pkey PRIMARY KEY (eduid);
 B   ALTER TABLE ONLY public.education DROP CONSTRAINT education_pkey;
       public            postgres    false    239            M           2606    33498    education education_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.education
    ADD CONSTRAINT education_id_fkey FOREIGN KEY (id) REFERENCES public.samtest(id) ON DELETE CASCADE;
 E   ALTER TABLE ONLY public.education DROP CONSTRAINT education_id_fkey;
       public          postgres    false    239            �   �   x��б
A�z�+�%�mֽV����9�����7����y̐QJ��]�m^�~�??ﾬN���'!�鰦� S�X��1A��8������:�(��`�D~46���r K �f
�J���y� ��J     