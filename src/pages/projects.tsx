// import { fetchProjects } from '~/lib/projects';
import { Layout } from '~/layouts';
import { Animate, List } from '~/components';
import { ListActionType } from '~/types';

import type { GetStaticProps } from 'next';

import type { ListAction, Project } from '~/types';

interface ProjectProps {
	stringifiedProjects: string;
}

export const getStaticProps: GetStaticProps<ProjectProps> = async () => {
	const projects = [
		{
			"name": "Trackr - Manage Assignments",
			"description": "Beautiful homework tracker for students with over 10k downloads",
			"icon": "📝",
			"url": "https://apps.apple.com/us/app/trackr-manage-assignments/id1479152010"
		},
		{
			"name": "Washo",
			"description": "Handwashing timer built during the pandemic to enforce good habits",
			"icon": "🤝",
			"url": "https://apps.apple.com/us/app/washo/id1521120340"
		},
		{
			"name": "Manavata",
			"description": "An app I helped build for a nonprofit organization",
			"icon": "🕊️",
			"url": "https://apps.apple.com/app/manavata/id1513845689"
		},
		{
			"name": "exercisAR",
			"description": "My winning submission to Apple's Swift Student Challenge 2020",
			"icon": "🧘‍♂️",
			"url": "https://www.youtube.com/watch?v=SYeBaYsg_ZY"
		},
		{
			"name": "Journey to WWDC",
			"description": "My winning submission to Apple's Swift WWDC Scholarship 2019",
			"icon": "🎮",
			"url": "https://www.youtube.com/watch?v=dvN3aRJJju0"
		},
		{
			"name": "Discord SwiftUI",
			"description": "A native rewrite and redesign of Discord with SwiftUI",
			"icon": "💬",
			"url": "https://github.com/pranavkarthik10/DiscordSwfitUI"
		},
		{
			"name": "TravoAI",
			"description": "AI Travel planner with customization",
			"icon": "🗺️"
		},
		{
			"name": "ChemKit",
			"description": "Chemistry Labs in Augmented Reality",
			"icon": "🧪"
		},
		{
			"name": "destroyNegativity",
			"description": "AR game to build mental health and performs sentiment analysis",
			"icon": "🧠"
		}
	];
	// const stringifiedProjects = (projects as Array<Project>)
	return {
		props: {
			stringifiedProjects: JSON.stringify(projects),
		},
		revalidate: 3600,
	};
};

export default function ProjectsPage({ stringifiedProjects }: ProjectProps): JSX.Element {
	const projects = JSON.parse(stringifiedProjects) as Array<Project>;

	return (
		<Layout.Default seo={{ title: 'Projects' }}>
			<div className="my-24 mx-2 sm:mx-6 lg:mb-28 lg:mx-8">
				<div className="relative max-w-xl mx-auto">
					<List.Container>
						{projects.map((project, index) => (
							<Animate
								animation={{ y: [50, 0], opacity: [0, 1] }}
								key={index}
								transition={{
									delay: 0.1 * index,
								}}>
								<List.Item
									actions={[
										...(project.post
											? [
												{
													type: ListActionType.LINK,
													external: false,
													href: project.post,
													icon: 'feather:edit-3',
													label: `Blog post about ${project.name}`,
												} as ListAction,
											]
											: []),
										...(project.homepage
											? [
												{
													type: ListActionType.LINK,
													href: project.homepage,
													icon: 'feather:home',
													label: `${project.name} homepage`,
												} as ListAction,
											]
											: []),
										...(project.url
											? [
												{
													type: ListActionType.LINK,
													href: project.url,
													icon: 'feather:link',
													label: `${project.name} url`,
												} as ListAction,
											]
											: []),
									]}
									description={project.description}
									icon={<span className="text-xl">{project.icon}</span>}
									title={project.name}
								/>
							</Animate>
						))}
					</List.Container>
				</div>
			</div>
		</Layout.Default>
	);
}
