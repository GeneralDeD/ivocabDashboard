import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IAddWord, IWord } from "../models/IWord";
import { RootState } from "../store";

interface IWordsApi {
	words: IWord[];
	total: number;
}

export const wordsApi = createApi({
	reducerPath: "wordsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: "https://api.gooded.xyz/api/word",
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).admin.token;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	}),
	tagTypes: ["Words"],
	endpoints: (build) => ({
		getWords: build.query<IWordsApi, number>({
			query: (limit) => ({
				url: `?_limit=${limit}`,
			}),
			providesTags: ["Words"],
			transformResponse: (res: { data: IWordsApi }) => res.data,
		}),
		addWord: build.mutation<any, IAddWord>({
			query: (word) => ({
				method: "POST",
				url: "",
				body: word,
			}),
			invalidatesTags: ["Words"],
		}),
		editWord: build.mutation<any, { id: string; word: IAddWord }>({
			query: ({ id, word }) => ({
				method: "PUT",
				url: `/${id}`,
				body: word,
			}),
			invalidatesTags: ["Words"],
		}),
		deleteWord: build.mutation<any, string>({
			query: (id) => ({
				method: "DELETE",
				url: `/${id}`,
			}),
			invalidatesTags: ["Words"],
		}),
	}),
});

export const { useGetWordsQuery, useAddWordMutation, useEditWordMutation, useDeleteWordMutation } =
	wordsApi;
