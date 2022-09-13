import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ILevel } from "../models/ILevel";

export const levelsApi = createApi({
	reducerPath: "levelsApi",
	baseQuery: fetchBaseQuery({
		baseUrl: `https://api.gooded.xyz/api/level`,
	}),
	endpoints: (build) => ({
		getLevels: build.query<ILevel[], void>({
			query() {
				return `?_limit=1000&_sort=asc`;
			},
			transformResponse: (res: { data: { levels: ILevel[] } }) => res.data.levels,
		}),
	}),
});

export const { useGetLevelsQuery } = levelsApi;
