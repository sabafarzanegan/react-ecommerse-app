import { createClient } from "@supabase/supabase-js";

// const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
// const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

export const supabase = createClient(
  "https://feqvggrdsrgojxfkogun.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlcXZnZ3Jkc3Jnb2p4ZmtvZ3VuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyMjk1ODksImV4cCI6MjA0ODgwNTU4OX0.9qqwPjXXsCBubdcoOge4B7H0xhOX90aPyf8IXq-Pytg"
);

const bucket = "shop";

export const UploadImageInSupabase = async (image: File | undefined) => {
  const Timestamp = Date.now();
  const newName = `${Timestamp}-${image?.name}`;
  console.log(image);

  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(newName, image as File, { cacheControl: "3600" });

  if (error) {
    console.error("Error uploading to Supabase:", error.message);
    throw new Error("مشکلی پیش آمد: " + error.message); // چاپ پیام خطا
  }
  console.log("url", data);

  const publicUrl = supabase.storage.from(bucket).getPublicUrl(newName)
    .data.publicUrl;
  return publicUrl;
};
