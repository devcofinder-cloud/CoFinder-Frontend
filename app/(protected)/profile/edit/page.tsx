"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  Check,
  Globe,
  Loader2,
  Save,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { authStore } from "@/app/store/authStore";
import avatar1 from '@/public/avatars/peep-15.png';
import avatar2 from '@/public/avatars/peep-22.png';
import avatar3 from '@/public/avatars/peep-29.png';
import avatar4 from '@/public/avatars/peep-43.png';
import avatar5 from '@/public/avatars/peep-52.png';
import avatar6 from '@/public/avatars/peep-8.png';
import avatar7 from '@/public/avatars/peep-96.png';
import avatar8 from '@/public/avatars/peep-99 (1).png';
import avatar9 from '@/public/avatars/peep-99.png';

export default function EditProfilePage() {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imageType, setImageType] = useState<String>("image");
  const [avatarModal, setAvatarModal] = useState<Boolean>(false)

  const handleAvatar =()=>{
    try {
      setImageType("avatar")
      setAvatarModal(true)
    } catch (error) {
      console.log(error)
    }
  }

  const avatar_array = [
    avatar1,
    avatar2,
    avatar3,
    avatar4,
    avatar5,
    avatar6,
    avatar7,
    avatar8,
    avatar9,
  ]


  const {
    user,
    loading,
    fetchProfile,
    updateProfile,
    updateProfessionalProfile,
    updatingProfile,
    updatingProfessionalProfile,
  } = authStore();

  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    bio: "",
    website: "",
    github: "",
    linkedin: "",
    twitter: "",
  });

  const [profilePreview, setProfilePreview] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);


  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /* Fill Form                                                       */

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
      bio: "",
      website: "",
      github: "",
      linkedin: "",
      twitter: "",
    });

    setProfilePreview(user.profileImage || "");
  }, [user]);

  /* -------------------------------------------------------------- */
  /* Input Change                                                    */
  /* -------------------------------------------------------------- */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  /* Profile Image                                                   */

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      return;
    }

    setSelectedImage(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePreview(reader.result as string);
    };

    reader.readAsDataURL(file);

    setSaved(false);
  };


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      setSaved(false);

    
      const profilePayload: {
        name?: string;
        profileImage?: File;
      } = {
        name: formData.name,
      };

      if (selectedImage) {
        profilePayload.profileImage = selectedImage;
      }

      await updateProfile(profilePayload);

   

      await updateProfessionalProfile({
        currentRole: formData.role,
        about: formData.bio,

        socialLinks: {
          portfolio: formData.website,
          github: formData.github,
          linkedin: formData.linkedin,
          twitter: formData.twitter,
        },
      });


      setSaved(true);

      setTimeout(() => {
        router.push("/profile");
      }, 800);
    } catch (error) {
      console.error(
        "Failed to update profile:",
        error
      );
    } finally {
      setIsSaving(false);
    }
  };

  /* -------------------------------------------------------------- */
  /* Loading                                                         */
  /* -------------------------------------------------------------- */

  if (loading && !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-black border-t-transparent" />

          <p className="text-sm font-medium text-neutral-500">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white px-4 py-6 text-black sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        {/* ====================================================== */}
        {/* HEADER                                                 */}
        {/* ====================================================== */}

        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white transition hover:bg-black hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>

            <div>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Edit Profile
              </h1>

              <p className="mt-1 text-sm text-neutral-500">
                Update your profile information and social presence.
              </p>
            </div>
          </div>
        </div>

        {/* ====================================================== */}
        {/* FORM                                                    */}
        {/* ====================================================== */}

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
            {/* ================================================== */}
            {/* LEFT PROFILE CARD                                 */}
            {/* ================================================== */}

            <motion.div
              initial={{
                opacity: 0,
                y: 15,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="h-fit rounded-3xl border border-black/10 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col items-center">
                {/* Avatar */}

                <div className="relative">
                  <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border border-black/10 bg-neutral-100 text-4xl">
                    {profilePreview ? (
                      <img
                        src={profilePreview}
                        alt="Profile"
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span>
                        {user?.name?.charAt(0)?.toUpperCase() || (
                          <User className="h-10 w-10" />
                        )}
                      </span>
                    )}
                  </div>

                  {/* Camera */}

                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                    className="absolute bottom-1 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-black text-white shadow-lg transition hover:scale-105"
                  >
                    <Camera className="h-4 w-4" />
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </div>


                <p className="text-gray-600 font-semibold pt-4">Or</p>
                <button className="text-white bg-black px-3 py-1.3 rounded-full font-semibold">Choose Avatar</button>

                <h2 className="mt-5 text-lg font-bold">
                  {formData.name || "Your Name"}
                </h2>

                <p className="mt-1 text-xs text-neutral-500">
                  {formData.role || "Your Role"}
                </p>

                {/* Completion */}

                <div className="mt-6 w-full rounded-2xl bg-neutral-100 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-neutral-600">
                      Profile Completion
                    </span>

                    <span className="text-xs font-bold">
                      {user?.completionStatus || 0}%
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white">
                    <motion.div
                      initial={{
                        width: 0,
                      }}
                      animate={{
                        width: `${user?.completionStatus || 0}%`,
                      }}
                      transition={{
                        duration: 0.8,
                      }}
                      className="h-full rounded-full bg-black"
                    />
                  </div>
                </div>

                <p className="mt-4 text-center text-xs leading-relaxed text-neutral-500">
                  Use a clear profile picture so potential co-founders can
                  recognize you easily.
                </p>
              </div>
            </motion.div>

            {/* ================================================== */}
            {/* RIGHT CONTENT                                      */}
            {/* ================================================== */}

            <div className="space-y-6">
              {/* ================================================= */}
              {/* BASIC INFORMATION                                 */}
              {/* ================================================= */}

              <motion.section
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.05,
                }}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-6">
                  <h2 className="text-lg font-bold">
                    Basic Information
                  </h2>

                  <p className="mt-1 text-xs text-neutral-500">
                    Keep your basic profile information up to date.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {/* Name */}

                  <InputField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                  {/* Email */}

                  <InputField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    type="email"
                  />

                  {/* Role */}

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-bold text-neutral-700">
                      Role
                    </label>

                    <select
                      name="role"
                      value={formData.role}
                      onChange={handleChange}
                      className="w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm font-medium outline-none transition focus:border-black focus:bg-white"
                    >
                      <option value="">
                        Select your role
                      </option>

                      <option value="Founder">
                        Founder
                      </option>

                      <option value="Co-Founder">
                        Co-Founder
                      </option>

                      <option value="Developer">
                        Developer
                      </option>

                      <option value="Designer">
                        Designer
                      </option>

                      <option value="Product Manager">
                        Product Manager
                      </option>

                      <option value="Marketing">
                        Marketing
                      </option>

                      <option value="Sales">
                        Sales
                      </option>

                      <option value="Other">
                        Other
                      </option>
                    </select>
                  </div>

                  {/* Bio */}

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-bold text-neutral-700">
                      About Me
                    </label>

                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={5}
                      maxLength={500}
                      placeholder="Tell potential co-founders a little about yourself..."
                      className="w-full resize-none rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm font-medium leading-relaxed outline-none transition focus:border-black focus:bg-white"
                    />

                    <div className="mt-2 flex justify-end">
                      <span className="text-[11px] text-neutral-400">
                        {formData.bio.length}/500
                      </span>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* ================================================= */}
              {/* SOCIAL LINKS                                      */}
              {/* ================================================= */}

              <motion.section
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.1,
                }}
                className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="mb-6">
                  <h2 className="text-lg font-bold">
                    Social Presence
                  </h2>

                  <p className="mt-1 text-xs text-neutral-500">
                    Add your professional and social profiles.
                  </p>
                </div>

                <div className="space-y-4">
                  {/* Website */}

                  <SocialInput
                    icon={<Globe className="h-4 w-4" />}
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                  />

                  {/* Github */}

                  <SocialInput
                    icon={<Globe className="h-4 w-4" />}
                    label="GitHub"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                  />

                  {/* Linkedin */}

                  <SocialInput
                    icon={<Globe className="h-4 w-4" />}
                    label="LinkedIn"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                  />

                  {/* Twitter */}

                  <SocialInput
                    icon={<Globe className="h-4 w-4" />}
                    label="X / Twitter"
                    name="twitter"
                    value={formData.twitter}
                    onChange={handleChange}
                    placeholder="https://x.com/username"
                  />
                </div>
              </motion.section>

              {/* ================================================= */}
              {/* ACTIONS                                            */}
              {/* ================================================= */}

              <div className="sticky bottom-4 z-20 rounded-3xl border border-black/10 bg-white/95 p-3 shadow-xl backdrop-blur sm:static sm:border-0 sm:bg-transparent sm:p-0 sm:shadow-none sm:backdrop-blur-none">
                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={() => router.back()}
                    className="flex items-center justify-center rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-bold text-black transition hover:bg-neutral-100"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={
                      isSaving ||
                      updatingProfile ||
                      updatingProfessionalProfile
                    }
                    className="flex items-center justify-center gap-2 rounded-full bg-black px-7 py-3 text-sm font-bold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Saving...
                      </>
                    ) : saved ? (
                      <>
                        <Check className="h-4 w-4" />
                        Saved
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

/* ------------------------------------------------------------------ */
/* Input Field                                                        */
/* ------------------------------------------------------------------ */

function InputField({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-neutral-700">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-black/10 bg-neutral-50 px-4 py-3 text-sm font-medium outline-none transition placeholder:text-neutral-400 focus:border-black focus:bg-white"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Social Input                                                       */
/* ------------------------------------------------------------------ */

function SocialInput({
  icon,
  label,
  name,
  value,
  onChange,
  placeholder,
}: {
  icon: React.ReactNode;
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-neutral-700">
        {label}
      </label>

      <div className="relative">
        <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500">
          {icon}
        </div>

        <input
          type="url"
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full rounded-2xl border border-black/10 bg-neutral-50 py-3 pl-11 pr-4 text-sm font-medium outline-none transition placeholder:text-neutral-400 focus:border-black focus:bg-white"
        />
      </div>
    </div>
  );
}