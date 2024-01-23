CREATE UNIQUE INDEX games_pkey1 ON public.games USING btree (id);

alter table "public"."games" add constraint "games_pkey1" PRIMARY KEY using index "games_pkey1";


