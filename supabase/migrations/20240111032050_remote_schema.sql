create table "public"."games" (
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


alter table "public"."games" enable row level security;

CREATE UNIQUE INDEX games_pkey ON public.games USING btree (id);

alter table "public"."games" add constraint "games_pkey" PRIMARY KEY using index "games_pkey";

grant delete on table "public"."games" to "anon";

grant insert on table "public"."games" to "anon";

grant references on table "public"."games" to "anon";

grant select on table "public"."games" to "anon";

grant trigger on table "public"."games" to "anon";

grant truncate on table "public"."games" to "anon";

grant update on table "public"."games" to "anon";

grant delete on table "public"."games" to "authenticated";

grant insert on table "public"."games" to "authenticated";

grant references on table "public"."games" to "authenticated";

grant select on table "public"."games" to "authenticated";

grant trigger on table "public"."games" to "authenticated";

grant truncate on table "public"."games" to "authenticated";

grant update on table "public"."games" to "authenticated";

grant delete on table "public"."games" to "service_role";

grant insert on table "public"."games" to "service_role";

grant references on table "public"."games" to "service_role";

grant select on table "public"."games" to "service_role";

grant trigger on table "public"."games" to "service_role";

grant truncate on table "public"."games" to "service_role";

grant update on table "public"."games" to "service_role";

create policy "Enable read access for all users"
on "public"."games"
as permissive
for select
to public
using (true);



