import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

export const ourFileRouter = {
  // Define what you can upload
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    // Middleware: Check if the user is an admin before allowing upload
    .middleware(async () => {
      // You can add your isAdmin() check here
      return { userId: "admin" };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete:", file.url);
      return { url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;