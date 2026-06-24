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
  const {
    display_name, email, skin_type, skin_tone,
    main_concerns, allergies, age_range, gender,
    patch_test_results, preferences,
  } = profileData;

  const payload = {
    auth_user_id: authUserId,
    display_name, email, skin_type, skin_tone,
    main_concerns, allergies, age_range, gender,
    patch_test_results, preferences,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("user_profiles")
    .upsert(payload, { onConflict: "auth_user_id" })
    .select()
    .single();

  if (error) throw error;
  return data;
};
