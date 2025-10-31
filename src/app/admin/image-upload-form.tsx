"use client";

import { useState } from "react";

export default function ImageUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [prompt, setPrompt] = useState("");
  const [aiModel, setAiModel] = useState("");
  const [category, setCategory] = useState("");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !prompt) {
      setError("Please select a file and enter a prompt");
      return;
    }

    setUploading(true);
    setError("");
    setSuccess(false);


    try {
      // Step 1: Generate signed URL
      const generateResponse = await fetch("/api/upload/generate-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileName: file.name,
          fileSize: file.size,
          contentType: file.type,
          prompt,
          aiModel,
          category,
        }),
      });

      if (!generateResponse.ok) {
        const errorData = await generateResponse.json();
        throw new Error(errorData.error || "Failed to generate upload URL");
      }

      const { uploadUrl, filePath, recordId } = await generateResponse.json();
      

      // Step 2: Upload directly to Supabase Storage
      const uploadResponse = await fetch(uploadUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to storage");
      }

      // Step 3: Confirm upload and update database
      const confirmResponse = await fetch("/api/upload/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ recordId, filePath }),
      });

      if (!confirmResponse.ok) {
        throw new Error("Failed to confirm upload");
      }

      setSuccess(true);
      // Reset form
      setFile(null);
      setPrompt("");
      setAiModel("");
      setCategory("");
      
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <div>
        <label className="block text-sm font-medium mb-2">
          Image File
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="w-full"
          disabled={uploading}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Prompt *
        </label>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full border p-2 rounded"
          disabled={uploading}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          AI Model
        </label>
        <input
          type="text"
          value={aiModel}
          onChange={(e) => setAiModel(e.target.value)}
          className="w-full border p-2 rounded"
          disabled={uploading}
          placeholder="e.g., DALL-E 3, Midjourney"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Category
        </label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          disabled={uploading}
          placeholder="e.g., Nature, Abstract"
        />
      </div>

      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}

      {success && (
        <div className="text-green-600 text-sm">Upload successful!</div>
      )}

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-blue-600 text-white p-2 rounded disabled:opacity-50"
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>
    </form>
  );
}