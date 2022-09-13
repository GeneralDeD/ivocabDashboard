import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IAuth } from '../models/IAuth';

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://api.gooded.xyz/api',
	}),
	endpoints: (build) => ({
		getLogin: build.mutation<any, IAuth>({
			query: (body) => ({
				url: '/auth/login',
				body,
				method: 'POST',
			}),
			transformResponse: (res: { data: { token: string } }) => res.data.token,
		}),
	}),
});

export const { useGetLoginMutation } = authApi;
