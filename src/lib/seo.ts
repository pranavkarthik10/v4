import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

import type { ComponentProps } from 'react';

export function useSeoProps(
	props: Partial<ComponentProps<typeof NextSeo>> = {},
): Partial<ComponentProps<typeof NextSeo>> {
	const router = useRouter();

	const title = "Hey👋 I'm Pranav";
	const description = "Welcome to my personal website!";

	return {
		title,
		description,
		canonical: `https://www.pranavkarthik.me/${router.asPath}`,
		openGraph: {
			title,
			description,
			site_name: 'nuro',
			url: `https://www.pranavkarthik.me/${router.asPath}`,
			type: 'website',
			images: [
				{
					url: 'https://nuro.dev/banner.png',
					alt: description,
					width: 1280,
					height: 720,
				},
			],
		},
		twitter: {
			cardType: 'summary_large_image',
			handle: '@pranavkarthik__',
			site: '@pranavkarthik__',
		},
		...props,
	};
}
