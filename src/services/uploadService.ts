import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const uploadApi = createApi({
	reducerPath: "uploadApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.gooded.xyz/api/media/upload",
	}),
	endpoints: (build) => ({
		uploadFile: build.mutation<any, any>({
			query: ({ body, token }) => ({
				url: "",
				body,
				headers: {
					Authorization: `Bearer ${token}`,
				},
				method: "POST",
			}),
		}),
	}),
});

export const { useUploadFileMutation } = uploadApi;
