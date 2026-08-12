"use client";

import { useRef, useState } from "react";
import {
  Image as ImageIcon,
  Video,
  FileText,
  X,
  Plus,
  Send,
} from "lucide-react";

interface MediaFile {
  file: File;
  preview: string;
  type: "image" | "video" | "file";
}

export default function CreatePost() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState("");
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newFiles: MediaFile[] = Array.from(files).map((file) => {
      let type: "image" | "video" | "file" = "file";

      if (file.type.startsWith("image/")) {
        type = "image";
      } else if (file.type.startsWith("video/")) {
        type = "video";
      }

      return {
        file,
        type,
        preview:
          type === "image" || type === "video"
            ? URL.createObjectURL(file)
            : "",
      };
    });

    setMedia((prev) => [...prev, ...newFiles]);
  };

  const removeMedia = (index: number) => {
    setMedia((prev) => {
      const item = prev[index];

      if (item.preview) {
        URL.revokeObjectURL(item.preview);
      }

      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async () => {
    if (!content.trim() && media.length === 0) return;

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("content", content);

      media.forEach((item) => {
        formData.append("media", item.file);
      });

      // Example:
      // await createPost(formData);

      console.log("FormData ready");

      setContent("");
      setMedia([]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] px-3 py-4 sm:px-6">
      <div className="mx-auto w-full max-w-2xl">
        {/* Header */}
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-black sm:text-2xl">
              Create Post
            </h1>

            <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
              Share something with the community
            </p>
          </div>

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
            <Plus size={19} />
          </div>
        </div>

        {/* Card */}
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-sm">
          {/* User */}
          <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-bold text-white">
              A
            </div>

            <div>
              <p className="text-sm font-semibold text-black">
                Aditya
              </p>

              <p className="text-xs text-zinc-500">
                Public
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="px-4 pt-4">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind?"
              maxLength={5000}
              rows={5}
              className="w-full resize-none border-0 bg-transparent text-[15px] leading-6 text-black outline-none placeholder:text-zinc-400"
            />

            <div className="pb-3 text-right text-[11px] text-zinc-400">
              {content.length}/5000
            </div>
          </div>

          {/* Media Preview */}
          {media.length > 0 && (
            <div className="px-4 pb-4">
              <div className="grid grid-cols-2 gap-2">
                {media.map((item, index) => (
                  <div
                    key={`${item.file.name}-${index}`}
                    className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100"
                  >
                    {item.type === "image" && (
                      <img
                        src={item.preview}
                        alt={item.file.name}
                        className="h-36 w-full object-cover sm:h-48"
                      />
                    )}

                    {item.type === "video" && (
                      <video
                        src={item.preview}
                        className="h-36 w-full object-cover sm:h-48"
                        controls
                      />
                    )}

                    {item.type === "file" && (
                      <div className="flex h-36 flex-col items-center justify-center gap-2 sm:h-48">
                        <FileText
                          size={30}
                          className="text-zinc-500"
                        />

                        <p className="max-w-[90%] truncate px-3 text-xs font-medium text-zinc-700">
                          {item.file.name}
                        </p>
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={() => removeMedia(index)}
                      className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/80 text-white backdrop-blur transition hover:bg-black"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="border-t border-zinc-100 px-4 py-3">
            <div className="flex items-center justify-between gap-3">
              {/* Upload buttons */}
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-black sm:w-auto sm:gap-2 sm:px-3"
                >
                  <ImageIcon size={19} />

                  <span className="hidden text-xs font-medium sm:block">
                    Media
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-zinc-600 transition hover:bg-zinc-100 hover:text-black sm:w-auto sm:gap-2 sm:px-3"
                >
                  <Video size={19} />

                  <span className="hidden text-xs font-medium sm:block">
                    Video
                  </span>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,video/*,.pdf,.doc,.docx"
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </div>

              {/* Post */}
              <button
                type="button"
                disabled={
                  loading ||
                  (!content.trim() && media.length === 0)
                }
                onClick={handleSubmit}
                className="flex h-10 items-center gap-2 rounded-full bg-black px-5 text-xs font-semibold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-200 disabled:text-zinc-400"
              >
                {loading ? (
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                ) : (
                  <Send size={15} />
                )}

                <span>Post</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tip */}
        <div className="mt-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3">
          <p className="text-[11px] leading-5 text-zinc-500">
            <span className="font-semibold text-zinc-800">
              Tip:
            </span>{" "}
            Share useful ideas, startup updates, or opportunities
            with the community.
          </p>
        </div>
      </div>
    </div>
  );
}