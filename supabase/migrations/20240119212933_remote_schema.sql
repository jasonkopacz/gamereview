drop policy "Enable read access for all users" on "public"."games";

alter table "public"."reviews" drop constraint "reviews_game_id_fkey";

alter table "public"."games" drop constraint "games_pkey";

drop index if exists "public"."games_pkey";

create table "public"."games_old" (
    "id" bigint generated always as identity not null,
    "name" text,
    "slug" text,
    "released" date,
    "background_image" text,
    "rating" double precision,
    "reviews_text_count" text,
    "metacritic" integer,
    "esrb_rating" text
);


alter table "public"."games_old" enable row level security;

alter table "public"."games" drop column "background_image";

alter table "public"."games" drop column "esrb_rating";

alter table "public"."games" drop column "metacritic";

alter table "public"."games" drop column "released";

alter table "public"."games" drop column "reviews_text_count";

alter table "public"."games" drop column "slug";

alter table "public"."games" add column "api_detail_url" text not null;

alter table "public"."games" add column "deck" text;

alter table "public"."games" add column "description" text;

alter table "public"."games" add column "developer" text;

alter table "public"."games" add column "genres" text[];

alter table "public"."games" add column "guid" text not null;

alter table "public"."games" add column "image" text;

alter table "public"."games" add column "number_of_reviews" integer;

alter table "public"."games" add column "platforms" text[];

alter table "public"."games" add column "publisher" text;

alter table "public"."games" add column "release_date" timestamp with time zone;

alter table "public"."games" add column "themes" text[];

alter table "public"."games" alter column "id" drop identity;

alter table "public"."games" alter column "id" set data type text using "id"::text;

alter table "public"."games" alter column "rating" set data type text using "rating"::text;

alter table "public"."reviews" enable row level security;

CREATE UNIQUE INDEX games_api_detail_url_key ON public.games USING btree (api_detail_url);

CREATE UNIQUE INDEX games_guid_key ON public.games USING btree (guid);

CREATE UNIQUE INDEX games_id_key ON public.games USING btree (id);

CREATE UNIQUE INDEX games_pkey ON public.games_old USING btree (id);

alter table "public"."games_old" add constraint "games_pkey" PRIMARY KEY using index "games_pkey";

alter table "public"."games" add constraint "games_api_detail_url_key" UNIQUE using index "games_api_detail_url_key";

alter table "public"."games" add constraint "games_guid_key" UNIQUE using index "games_guid_key";

alter table "public"."games" add constraint "games_id_key" UNIQUE using index "games_id_key";

alter table "public"."reviews" add constraint "reviews_game_id_fkey" FOREIGN KEY (game_id) REFERENCES games_old(id) not valid;

alter table "public"."reviews" validate constraint "reviews_game_id_fkey";

create or replace view "public"."profile_game_reviews" as  SELECT profiles.username AS profile_name,
    games_old.name AS game_name,
    reviews.review_text,
    reviews.rating AS review_rating
   FROM ((profiles
     JOIN reviews ON ((profiles.id = reviews.profile_id)))
     JOIN games_old ON ((reviews.game_id = games_old.id)));


grant delete on table "public"."games_old" to "anon";

grant insert on table "public"."games_old" to "anon";

grant references on table "public"."games_old" to "anon";

grant select on table "public"."games_old" to "anon";

grant trigger on table "public"."games_old" to "anon";

grant truncate on table "public"."games_old" to "anon";

grant update on table "public"."games_old" to "anon";

grant delete on table "public"."games_old" to "authenticated";

grant insert on table "public"."games_old" to "authenticated";

grant references on table "public"."games_old" to "authenticated";

grant select on table "public"."games_old" to "authenticated";

grant trigger on table "public"."games_old" to "authenticated";

grant truncate on table "public"."games_old" to "authenticated";

grant update on table "public"."games_old" to "authenticated";

grant delete on table "public"."games_old" to "service_role";

grant insert on table "public"."games_old" to "service_role";

grant references on table "public"."games_old" to "service_role";

grant select on table "public"."games_old" to "service_role";

grant trigger on table "public"."games_old" to "service_role";

grant truncate on table "public"."games_old" to "service_role";

grant update on table "public"."games_old" to "service_role";

create policy "Enable read access for all users"
on "public"."games_old"
as permissive
for select
to public
using (true);



