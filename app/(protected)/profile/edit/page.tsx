"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  Check,
  Globe,
  Loader2,
  Save,
  User,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";

import { authStore } from "@/app/store/authStore";

import avatar1 from "@/public/avatars/peep-15.png";
import avatar2 from "@/public/avatars/peep-22.png";
import avatar3 from "@/public/avatars/peep-29.png";
import avatar4 from "@/public/avatars/peep-43.png";
import avatar5 from "@/public/avatars/peep-52.png";
import avatar6 from "@/public/avatars/peep-8.png";
import avatar7 from "@/public/avatars/peep-96.png";
import avatar8 from "@/public/avatars/peep-99 (1).png";
import avatar9 from "@/public/avatars/peep-99.png";
import ImageCropper from "./comp/ImageCropper";

export default function EditProfilePage() {
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  /*
  |--------------------------------------------------------------------------
  | STORE
  |--------------------------------------------------------------------------
  */

  const {
    user,
    loading,
    fetchProfile,
    updateProfile,
    updateProfessionalProfile,
    updatingProfile,
    updatingProfessionalProfile,
  } = authStore();

  /*
  |--------------------------------------------------------------------------
  | AVATARS
  |--------------------------------------------------------------------------
  */

  const avatarArray = [
    {
      id: "avatar-1",
      src: avatar1,
      url: "/avatars/peep-15.png",
    },
    {
      id: "avatar-2",
      src: avatar2,
      url: "/avatars/peep-22.png",
    },
    {
      id: "avatar-3",
      src: avatar3,
      url: "/avatars/peep-29.png",
    },
    {
      id: "avatar-4",
      src: avatar4,
      url: "/avatars/peep-43.png",
    },
    {
      id: "avatar-5",
      src: avatar5,
      url: "/avatars/peep-52.png",
    },
    {
      id: "avatar-6",
      src: avatar6,
      url: "/avatars/peep-8.png",
    },
    {
      id: "avatar-7",
      src: avatar7,
      url: "/avatars/peep-96.png",
    },
    {
      id: "avatar-8",
      src: avatar8,
      url: "/avatars/peep-99 (1).png",
    },
    {
      id: "avatar-9",
      src: avatar9,
      url: "/avatars/peep-99.png",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | STATE
  |--------------------------------------------------------------------------
  */

  const [imageType, setImageType] = useState<"image" | "avatar">("image");

  const [avatarModal, setAvatarModal] = useState(false);

  const [selectedAvatar, setSelectedAvatar] = useState("");

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
  const [cropperOpen, setCropperOpen] = useState(false);
  const [cropperImage, setCropperImage] = useState("");
  const [cropperType, setCropperType] = useState<"image" | "avatar">("image");

  /*
  |--------------------------------------------------------------------------
  | FETCH PROFILE
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  /*
  |--------------------------------------------------------------------------
  | FILL FORM
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (!user) return;

    setFormData({
      name: user.name || "",
      email: user.email || "",
      role: user.role || "",
      bio: user.about || user.bio || "",
      website: user.socialLinks?.portfolio || "",
      github: user.socialLinks?.github || "",
      linkedin: user.socialLinks?.linkedin || "",
      twitter: user.socialLinks?.twitter || "",
    });

    setProfilePreview(user.profileImage || "");

    /*
     * Existing image type
     */

    if (user.profileImageType === "avatar") {
      setImageType("avatar");
      setSelectedAvatar(user.profileImage || "");
    } else {
      setImageType("image");
      setSelectedAvatar("");
    }

    setSelectedImage(null);
  }, [user]);

  /*
  |--------------------------------------------------------------------------
  | INPUT CHANGE
  |--------------------------------------------------------------------------
  */

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setSaved(false);
  };

  /*
  |--------------------------------------------------------------------------
  | IMAGE UPLOAD
  |--------------------------------------------------------------------------
  */

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      console.error("Please select a valid image");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      setCropperImage(reader.result as string);
      setCropperType("image");
      setCropperOpen(true);
    };

    reader.readAsDataURL(file);

    e.target.value = "";

    setSaved(false);
  };

  const handleCroppedImage = (file: File, preview: string) => {
    setSelectedImage(file);
    setProfilePreview(preview);

    // Cropper se nikli image ab uploaded image hai
    setImageType("image");
    setSelectedAvatar("");

    setCropperOpen(false);
    setCropperImage("");

    setSaved(false);
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN AVATAR MODAL
  |--------------------------------------------------------------------------
  */

  const handleAvatar = () => {
    setAvatarModal(true);
  };

  /*
  |--------------------------------------------------------------------------
  | SELECT AVATAR
  |--------------------------------------------------------------------------
  */

  const handleSelectAvatar = (avatarUrl: string) => {
    setAvatarModal(false);

    setCropperImage(avatarUrl);
    setCropperType("avatar");
    setCropperOpen(true);

    setSaved(false);
  };

  /*
  |--------------------------------------------------------------------------
  | SAVE
  |--------------------------------------------------------------------------
  */

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setIsSaving(true);
      setSaved(false);

      /*
      |--------------------------------------------------------------------------
      | PROFILE PAYLOAD
      |--------------------------------------------------------------------------
      */

      if (imageType === "avatar") {
        /*
         * Avatar selected
         *
         * NO FILE
         * NO CLOUDINARY
         */

        if (!selectedAvatar) {
          console.error("Please select an avatar");
          return;
        }

        await updateProfile({
          name: formData.name,

          profileImage: selectedAvatar,

          profileImageType: "avatar",
        });
      } else {
        /*
         * Normal image
         */

        const profilePayload: {
          name?: string;
          profileImage?: File;
          profileImageType?: "image";
        } = {
          name: formData.name,

          profileImageType: "image",
        };

        /*
         * Only send file if user selected a new image
         */

        if (selectedImage) {
          profilePayload.profileImage = selectedImage;
        }

        await updateProfile(profilePayload);
      }

      /*
      |--------------------------------------------------------------------------
      | PROFESSIONAL PROFILE
      |--------------------------------------------------------------------------
      */

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

      /*
      |--------------------------------------------------------------------------
      | SUCCESS
      |--------------------------------------------------------------------------
      */

      setSaved(true);

      setTimeout(() => {
        router.push("/profile");
      }, 800);
    } catch (error) {
      console.error("Failed to update profile:", error);
    } finally {
      setIsSaving(false);
    }
  };

  /*
  |--------------------------------------------------------------------------
  | LOADING
  |--------------------------------------------------------------------------
  */

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

  /*
  |--------------------------------------------------------------------------
  | UI
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen bg-white px-4 py-6 text-black sm:px-6 sm:py-10">
      <div className="mx-auto max-w-5xl">
        {/* HEADER */}

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

        {/* FORM */}

        <form onSubmit={handleSave}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
            {/* LEFT PROFILE CARD */}

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
                {/* PROFILE IMAGE */}

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

                  {/* CAMERA */}

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute -bottom-2 right-1 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-black text-white shadow-lg transition hover:scale-105"
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

                {/* IMAGE TYPE */}

                <div className="mt-4 flex items-center gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide ${
                      imageType === "avatar"
                        ? "bg-neutral-100 text-neutral-700"
                        : "bg-black text-white"
                    }`}
                  >
                    {imageType === "avatar" ? "Avatar" : "Uploaded Image"}
                  </span>
                </div>

                {/* OR */}

                <p className="pt-4 font-semibold text-gray-600">Or</p>

                {/* CHOOSE AVATAR */}

                <button
                  type="button"
                  onClick={handleAvatar}
                  className="mt-2 rounded-full bg-black px-4 py-2 font-semibold text-white transition hover:bg-neutral-800"
                >
                  Choose Avatar
                </button>

                {/* NAME */}

                <h2 className="mt-5 text-lg font-bold">
                  {formData.name || "Your Name"}
                </h2>

                <p className="mt-1 text-xs text-neutral-500">
                  {formData.role || "Your Role"}
                </p>

                {/* COMPLETION */}

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

            {/* RIGHT CONTENT */}

            <div className="space-y-6">
              {/* BASIC INFORMATION */}

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
                  <h2 className="text-lg font-bold">Basic Information</h2>

                  <p className="mt-1 text-xs text-neutral-500">
                    Keep your basic profile information up to date.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <InputField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                  <InputField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    type="email"
                  />

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
                      <option value="">Select your role</option>

                      <option value="Founder">Founder</option>

                      <option value="Co-Founder">Co-Founder</option>

                      <option value="Developer">Developer</option>

                      <option value="Designer">Designer</option>

                      <option value="Product Manager">Product Manager</option>

                      <option value="Marketing">Marketing</option>

                      <option value="Sales">Sales</option>

                      <option value="Other">Other</option>
                    </select>
                  </div>

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

              {/* SOCIAL LINKS */}

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
                  <h2 className="text-lg font-bold">Social Presence</h2>

                  <p className="mt-1 text-xs text-neutral-500">
                    Add your professional and social profiles.
                  </p>
                </div>

                <div className="space-y-4">
                  <SocialInput
                    icon={<Globe className="h-4 w-4" />}
                    label="Website"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://yourwebsite.com"
                  />

                  <SocialInput
                    icon={<Globe className="h-4 w-4" />}
                    label="GitHub"
                    name="github"
                    value={formData.github}
                    onChange={handleChange}
                    placeholder="https://github.com/username"
                  />

                  <SocialInput
                    icon={<Globe className="h-4 w-4" />}
                    label="LinkedIn"
                    name="linkedin"
                    value={formData.linkedin}
                    onChange={handleChange}
                    placeholder="https://linkedin.com/in/username"
                  />

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

              {/* ACTIONS */}

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
                      isSaving || updatingProfile || updatingProfessionalProfile
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

      {/* ============================================================
          AVATAR MODAL
      ============================================================ */}

      <AnimatePresence>
        {avatarModal && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm"
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) {
                setAvatarModal(false);
              }
            }}
          >
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 10,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 10,
              }}
              transition={{
                duration: 0.2,
              }}
              className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
              onMouseDown={(e) => e.stopPropagation()}
            >
              {/* MODAL HEADER */}

              <div className="flex items-center justify-between border-b border-neutral-100 px-5 py-4 sm:px-6">
                <div>
                  <h3 className="text-lg font-bold text-black">
                    Choose Avatar
                  </h3>

                  <p className="mt-1 text-xs text-neutral-500">
                    Select an avatar for your profile.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setAvatarModal(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 transition hover:bg-neutral-100 hover:text-black"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* AVATAR GRID */}

              <div className="grid grid-cols-3 gap-4 p-5 sm:grid-cols-4 sm:p-6">
                {avatarArray.map((avatar) => {
                  const isSelected =
                    selectedAvatar === avatar.url && imageType === "avatar";

                  return (
                    <button
                      key={avatar.id}
                      type="button"
                      onClick={() => handleSelectAvatar(avatar.url)}
                      className={`group relative aspect-square overflow-hidden rounded-2xl border-2 bg-neutral-50 transition ${
                        isSelected
                          ? "border-black"
                          : "border-transparent hover:border-neutral-300"
                      }`}
                    >
                      <img
                        src={avatar.src.src}
                        alt="Avatar"
                        className="h-full w-full object-cover transition duration-200 group-hover:scale-105"
                      />

                      {isSelected && (
                        <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black text-white shadow-lg">
                          <Check className="h-4 w-4" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* MODAL FOOTER */}

              <div className="border-t border-neutral-100 bg-neutral-50 px-5 py-4 sm:px-6">
                <button
                  type="button"
                  onClick={() => setAvatarModal(false)}
                  className="w-full rounded-full bg-black py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
                >
                  Done
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {cropperOpen && cropperImage && (
          <ImageCropper
            image={cropperImage}
            onCancel={() => {
              setCropperOpen(false);
              setCropperImage("");
            }}
            onCropComplete={handleCroppedImage}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

/*
|--------------------------------------------------------------------------
| INPUT FIELD
|--------------------------------------------------------------------------
*/

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
    >,
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

/*
|--------------------------------------------------------------------------
| SOCIAL INPUT
|--------------------------------------------------------------------------
*/

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
    >,
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
