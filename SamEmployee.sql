PGDMP                      |            Employee    16.3    16.3     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16724    Employee    DATABASE     �   CREATE DATABASE "Employee" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
    DROP DATABASE "Employee";
                postgres    false            �            1259    25291    samtest    TABLE     x  CREATE TABLE public.samtest (
    id character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    dob date NOT NULL,
    gender character varying NOT NULL,
    nrc character varying(50) NOT NULL,
    email character varying(200) NOT NULL,
    address text NOT NULL,
    skills character varying(100) NOT NULL,
    department character varying(30) NOT NULL
);
    DROP TABLE public.samtest;
       public         heap    postgres    false            �          0    25291    samtest 
   TABLE DATA           a   COPY public.samtest (id, name, dob, gender, nrc, email, address, skills, department) FROM stdin;
    public          postgres    false    237   v       K           2606    33497    samtest samtest_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.samtest
    ADD CONSTRAINT samtest_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.samtest DROP CONSTRAINT samtest_pkey;
       public            postgres    false    237            �   u  x���Mk�@����c1�]?o$jB���Њ��[�i��wV#m���PO�����0-��,.$[c!3���Mzx 1V)w1F�ƛ�-���Pҁ��R��g5��E�4�����mr%a3��@��8;�rM��U��]������6-Ǵ�:��@��u�5�w�u걺�@�;%�dVak��'�2\�`�"}�ms�K�V]��}��?pH�!R] [���]U��הꍆ)����W*Ut���p�i���R}��(3��P���K|�zV��l�/�C���	�w!<�Po�n|s~4�F4[��ߵ��j�^W�6O�^��:<w�¡�䠋nh�����ao�R�l��NU8���Js�����0�Oj2@     