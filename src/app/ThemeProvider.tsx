'use client';
import {
	QueryClient,
	QueryClientProvider,
} from 'react-query';

const queryClient = new QueryClient();

export const QueryClientWrapper = ({ children }: any) => {
	return (
		// Provide the client to your App
		<QueryClientProvider client={queryClient}>
			{children}
		</QueryClientProvider>
	);
};