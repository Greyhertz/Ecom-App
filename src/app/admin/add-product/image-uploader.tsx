"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "@/app/api/uploadthing/core";

export function ImageUploader({ onUploadComplete }: { onUploadComplete: (url: string) => void }) {
  return (
    <UploadButton<OurFileRouter, "productImage">
      endpoint="productImage"
      onClientUploadComplete={(res) => {
        if (res && res[0]) {
          onUploadComplete(res[0].url);
        }
      }}
      onUploadError={(error: Error) => {
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}