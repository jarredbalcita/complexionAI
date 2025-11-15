// services/user.service.js
import { supabase } from "../config/supabase.js";

export const getProfile = async (authUserId) => {
  const { data, error } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("auth_user_id", authUserId)
    .single();

  if (error && error.code !== "PGRST116") throw error;
  return data || null;
};

export const upsertProfile = async (authUserId, profileData) => {
  // THIS LINE IS THE FIX — force auth_user_id so RLS allows it
  const payload = {
    auth_user_id: authUserId, // ← critical
    ...profileData,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("user_profiles")
    .upsert(payload, { onConflict: "auth_user_id" })
    .select()
    .single();

  if (error) {
    console.error("Supabase upsert error:", error);
    throw error;
  }
  return data;
};
