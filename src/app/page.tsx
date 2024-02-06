'use client';
import styles from './page.module.css';
import { useQuery } from 'react-query';

const token = 'BQAU7U3gi2YRdupav9sVUmK9NKAyfGzmgwBXlwtm815-ytJVJ4s_h3Iznd30fcpQZa2P-PcLCfpzvnpQrBSTzDlyhPh7Jm14MmeGMxk9nsPDEnr89Of1aX1s5czZm9ohoSLr3NmMFQY0LoltqbhFo-ef48KaSz209XUOzx1tTnYFVNbpHhrIfHs8oz5_VSfBG6hddPWlALQxHmBDY6Yuwat4ICXZXgL9kOo8zW-KlcOmv_MFxzohwfA-RSQMMq5AoZwbYmVpztJ-2RPB_nFkgt19';

export default function Home() {

	async function fetchWebApi(
		endpoint?: string,
		method?: any,
		body?: any,
	) {
		const res = await fetch(`https://api.spotify.com/${endpoint}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
			method,
			body: JSON.stringify(body),
		});
		return await res.json();
	}

	const topTracksIds = [
		'2oBMZYteeO8DyXV9gDx6Za', '4KL3FJYexPrPuMdPagHPXp', '0PkpRtJqrwuXhbdtJuQm7E', '4QhnNyKDsAkXPwHkSnuc89', '3gVbD5APaL2N4yDWM5YWiQ',
	];

	async function getRecommendations() {
		// Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
		const { tracks } = await fetchWebApi(
			`v1/recommendations?limit=5&seed_tracks=${topTracksIds.join(',')}`,
			'GET',
		);
		return tracks;
	}

	async function getAlbums({ id }) {
		// Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-recommendations
		const { tracks } = await fetchWebApi(
			`v1/albums/${id}`,
			'GET',
		);
		return tracks;
	}

	// const { data: recommendedTracks, isLoading, isError, error } = useQuery<any>(
	// 	'getRecommendations',
	// 	() => getRecommendations({ id: '4aawyAB9vmqN3uQ7FjRGTy' }),
	// );

	const { data: albums, isLoading, isError, error } = useQuery<any>(
		'getAlbums',
		() => getAlbums({ id: '4aawyAB9vmqN3uQ7FjRGTy' }),
	);

	if (isLoading) {
		return <div>loading...</div>; // loading data
	}

	if (isError) {
		return <div>{error.message}</div>; // error data
	}

	return (
		<main className={styles.main}>

			{albums?.map(
				({ name, artists }: any) => {
					return (
						<div>
							<p>
								{name} by {artists.map(artist => artist.name).join(', ')}
							</p>
						</div>
					);
				},
			)}
			<iframe
				id="inlineFrameExample"
				title="Inline Frame Example"
				width="300"
				height="200"
				src="https://www.openstreetmap.org/export/embed.html?bbox=-0.004017949104309083%2C51.47612752641776%2C0.00030577182769775396%2C51.478569861898606&layer=mapnik">
			</iframe>
		</main>
	);
}
