create table "public"."reviews" (
    "id" bigint generated always as identity not null,
    "profile_id" uuid,
    "game_id" bigint,
    "review_text" text,
    "rating" bigint,
    "posted" timestamp with time zone,
    "updated" timestamp with time zone
);


CREATE UNIQUE INDEX reviews_pkey ON public.reviews USING btree (id);

alter table "public"."reviews" add constraint "reviews_pkey" PRIMARY KEY using index "reviews_pkey";

alter table "public"."reviews" add constraint "reviews_game_id_fkey" FOREIGN KEY (game_id) REFERENCES games(id) not valid;

alter table "public"."reviews" validate constraint "reviews_game_id_fkey";

alter table "public"."reviews" add constraint "reviews_profile_id_fkey" FOREIGN KEY (profile_id) REFERENCES profiles(id) not valid;

alter table "public"."reviews" validate constraint "reviews_profile_id_fkey";

grant delete on table "public"."reviews" to "anon";

grant insert on table "public"."reviews" to "anon";

grant references on table "public"."reviews" to "anon";

grant select on table "public"."reviews" to "anon";

grant trigger on table "public"."reviews" to "anon";

grant truncate on table "public"."reviews" to "anon";

grant update on table "public"."reviews" to "anon";

grant delete on table "public"."reviews" to "authenticated";

grant insert on table "public"."reviews" to "authenticated";

grant references on table "public"."reviews" to "authenticated";

grant select on table "public"."reviews" to "authenticated";

grant trigger on table "public"."reviews" to "authenticated";

grant truncate on table "public"."reviews" to "authenticated";

grant update on table "public"."reviews" to "authenticated";

grant delete on table "public"."reviews" to "service_role";

grant insert on table "public"."reviews" to "service_role";

grant references on table "public"."reviews" to "service_role";

grant select on table "public"."reviews" to "service_role";

grant trigger on table "public"."reviews" to "service_role";

grant truncate on table "public"."reviews" to "service_role";

grant update on table "public"."reviews" to "service_role";


