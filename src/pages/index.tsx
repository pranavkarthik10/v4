import dynamic from 'next/dynamic';
import { Icon } from '@iconify/react';
import React, { useState, useEffect } from 'react';

import { Animate, Button, Pill } from '~/components';
import { EventType, NavigationItemType } from '~/types';
import { Layout } from '~/layouts';

import type { EventProps } from '~/components/Event.component';
import type { NavigationItem } from '~/types';

const Event = dynamic<EventProps>(
	() => import('~/components/Event.component').then(({ Event }) => Event),
	{
		ssr: false,
	},
);

const ACTIONS: Array<NavigationItem> = [
	{
		type: NavigationItemType.LINK,
		href: '/press',
		icon: <Icon className="mr-3" icon="feather:aperture" />,
		text: 'Press',
	},
	{
		type: NavigationItemType.LINK,
		href: '/projects',
		icon: <Icon className="mr-3" icon="feather:copy" />,
		text: 'Projects',
	},
	{
		type: NavigationItemType.LINK,
		href: 'https://github.com/pranavkarthik10',
		icon: <Icon className="mr-3" icon="feather:printer" />,
		text: 'Resume',
	},
	{
		type: NavigationItemType.LINK,
		external: true,
		href: 'https://github.com/pranavkarthik10',
		icon: <Icon className="mr-3" icon="feather:github" />,
		text: 'GitHub',
	},
];
export default function HomePage(): JSX.Element {
	const options = ['builder', 'entrepreneur', 'visionary'];
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isFirstRender, setIsFirstRender] = useState(true);
	const today = new Date();
	const birthday = new Date('2005-09-10');
	const isBirthday = today.getDate() === birthday.getDate() && today.getMonth() === birthday.getMonth();

	const description = `Delivering experiences for mobile, web, and spatial interfaces.`;

	// useEffect(() => {
	// 	const intervalId = setInterval(() => {
	// 		setCurrentIndex((prevIndex) => (prevIndex + 1) % options.length);
	// 	}, 2000);

	// 	return () => clearInterval(intervalId);
	// }, [options.length]);

	useEffect(() => {
		// Set isFirstRender to false after the initial render
		setIsFirstRender(false);
	}, []);

	return (
		<Layout.Default>
			{isBirthday && <Event event={EventType.BIRTHDAY} />}
			<div className={`min-h-screen flex items-center justify-center py-12 ${isFirstRender ? 'animate' : ''}`}>
				<div className={`max-w-md sm:max-w-lg md:sm:max-w-2xl lg:sm:max-w-3xl w-full space-y-8 text-center ${isFirstRender ? 'animate' : ''}`}>
					<Animate
						as="h1"
						animation={{
							opacity: [0, 1],
							scale: [0.75, 1],
						}}
						className="text-gray-500 dark:text-white text-5xl sm:text-5xl md:text-6xl lg:text-6xl tracking-tight font-extrabold"
					>
						Hey <span className="inline-block origin-70 hover:(animate-wave)">👋</span>{' '}
						I&apos;m Pranav, <br className="hidden sm:block" />a{' '}
						<Pill.Standard className={`mt-4 ${isFirstRender ? 'animate' : ''}`}>
							{options[currentIndex]}
						</Pill.Standard>
					</Animate>

					<Animate
						as="p"
						animation={{
							opacity: [0, 1],
							scale: [0.75, 1],
						}}
						className="max-w-xs mt-4 md:mt-8 mx-auto text-base text-gray-400 sm:text-lg md:text-xl md:max-w-3xl"
						transition={{
							delay: 0.5,
						}}
					>
						{description}
					</Animate>

					<div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-4 sm:space-y-0 w-full mt-8 sm:mt-4">
						{ACTIONS.map((action, index) => {
							if (action.type !== NavigationItemType.LINK) return null;

							return (
								<Animate
									animation={{
										y: [50, 0],
										opacity: [0, 1],
									}}
									className="w-full sm:w-auto"
									key={index}
									transition={{
										delay: 0.1 * (index + 2) + 0.5,
									}}
								>
									<Button.Outline href={action.href}>
										{action.icon}
										<span>{action.text}</span>
									</Button.Outline>
								</Animate>
							);
						})}
					</div>
				</div>
			</div>
		</Layout.Default>
	);
}