import { generateReactHelpers } from "@uploadthing/react/hooks";

import type { OurFileRouter } from "@/app/api/uploadthing/cors";

export const { uploadFiles } = generateReactHelpers<OurFileRouter>()