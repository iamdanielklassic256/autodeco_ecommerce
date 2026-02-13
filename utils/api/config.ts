export const config = {
  API: {
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:4002/api/v1",
    get BEARER_TOKEN() {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
      }
      return null;
    },
    get BRANCH_ID() {
      if (typeof window !== 'undefined') {
        return localStorage.getItem('branchId');
      }
      return null;
    },
    get TERM_ID() {
      if (typeof window !== 'undefined') {
        const termData = localStorage.getItem('currentTerm');
        return termData ? JSON.parse(termData).id : null;
      }
      return null;
    },
    CLOUDINARY_CLOUD_NAME: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_UPLOAD_PRESET: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
  }
} as const;
