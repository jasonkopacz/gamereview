alter table "public"."reviews" add column "username" text;

alter table "public"."reviews" add constraint "reviews_username_fkey" FOREIGN KEY (username) REFERENCES profiles(username) not valid;

alter table "public"."reviews" validate constraint "reviews_username_fkey";


