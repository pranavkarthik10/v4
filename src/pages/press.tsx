import { format, parse } from 'date-fns';
import { Icon } from '@iconify/react';

import { Button, Pill } from '~/components';
import { Layout } from '~/layouts';

import type { GetStaticProps } from 'next';

import type { Timeline, TimelineEvent } from '~/types';

interface TimelineProps {
    timeline?: Timeline;
}

export const getStaticProps: GetStaticProps<TimelineProps> = async () => {
    const rawTimeline = [
        {
            "date": "02-18-2021",
            "title": "OWL Connected",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://owlconnected.com/archives/interview-canadian-coding-wunderkid-pranav/"
            }
        },
        {
            "date": "06-25-2020",
            "title": "Live TV on OMNI TV x2",
            "icon": "feather:tv"
        },
        {
            "date": "06-23-2020",
            "title": "CTV News",
            "icon": "feather:tv",
            "link": {
                "text": "View Recording",
                "url": "https://bc.ctvnews.ca/vancouver-teen-coding-phenom-using-skills-for-good-1.4995106"
            }
        },
        {
            "date": "06-23-2020",
            "title": "DailyHive: Venture x2",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://dailyhive.com/vancouver/apple-wwdc20-conference-winners"
            }
        },
        {
            "date": "06-16-2020",
            "title": "ViewTheVibe",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://viewthevibe.com/canadian-representation-game-strong-wwdc20s-swift-student-challenge-winners/"
            }
        },
        {
            "date": "06-16-2020",
            "title": "DailyHive: Venture",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://dailyhive.com/vancouver/canadian-winners-apple-wwdc20-swift-student-challenge"
            }
        },
        {
            "date": "06-15-2020",
            "title": "MobileSyrup",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://mobilesyrup.com/2020/06/15/canadian-ios-app-developers-covid-19-pandemic-ipnos-ko_op-manavata-maple/"
            }
        },
        {
            "date": "06-13-2020",
            "title": "CityNews1130",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://vancouver.citynews.ca/2020/06/13/vancouver-teen-app/"
            }
        },
        {
            "date": "05-17-2020",
            "title": "GetConnected",
            "icon": "feather:headphones",
            "link": {
                "text": "Listen to Podcast",
                "url": "https://getconnectedmedia.com/app-show-video-podcast-tech-hoarders-unite/"
            }
        },
        {
            "date": "05-12-2020",
            "title": "DailyHive",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://dailyhive.com/vancouver/apple-wwdc20-student-scholarship"
            }
        },
        {
            "date": "05-04-2020",
            "title": "Vancouver School Board",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://www.vsb.bc.ca/_ci/p/15963"
            }
        },
        {
            "date": "03-06-2020",
            "title": "TurkishKit",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://medium.com/turkishkit/ba%C5%9Far%C4%B1-hikayesi-pranav-karthik-57539fe7be43"
            }
        },
        {
            "date": "12-27-2019",
            "title": "GeekWire",
            "description": "Time Management tips!",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://www.geekwire.com/2019/best-ways-manage-everyday-work-life-tips-tricks-2019-geeks-week/"
            }
        },
        {
            "date": "06-13-2019",
            "title": "Vancouver School Board",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://www.vsb.bc.ca/_ci/p/17030"
            }
        },
        {
            "date": "06-05-2019",
            "title": "DailyHive",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://dailyhive.com/vancouver/apple-ceo-tim-cook-shout-out-vancouver-teen"
            }
        },
        {
            "date": "06-05-2019",
            "title": "Le Journal de Montreal",
            "icon": "feather:send",
            "link": {
                "text": "View Article",
                "url": "https://www.journaldemontreal.com/a-13-ans-ce-developpeur-canadien-attire-lattention-dapple"
            }
        },
        {
            "date": "06-05-2019",
            "title": "Live TV on BTV",
            "icon": "feather:tv"
        },
        {
            "date": "06-05-2019",
            "title": "Live TV on OMNI TV",
            "icon": "feather:tv"
        },
        {
            "date": "06-03-2019",
            "title": "By Tim Cook on Twitter",
            "description": "as part of WWDC 2019",
            "icon": "feather:book",
            "link": {
                "text": "View Tweet",
                "url": "https://twitter.com/tim_cook/status/1135700109931343872"
            }
        },
        {
            "date": "05-31-2019",
            "title": "GeekWire",
            "description": "Featured as Geek of the Week",
            "icon": "feather:gift",
            "link": {
                "text": "Visit GeekWire",
                "url": "https://www.geekwire.com/2019/pranav-karthik/"
            }
        }
    ];
    const timeline = (rawTimeline as Array<TimelineEvent>).sort(
        (a, b) => +new Date(b.date) - +new Date(a.date),
    );

    return {
        props: {
            timeline,
        },
    };
};

export default function TimelinePage({ timeline: rawTimeline }: TimelineProps): JSX.Element {
    const timeline = rawTimeline.map((event) => ({
        ...event,
        // Note: Custom parser needed as Safari on iOS doesn't like the standard `new Date()` parsing
        date: parse(event.date.toString(), 'MM-dd-yyyy', new Date()),
    }));

    return (
        <Layout.Default seo={{ title: 'Press/Media' }}>
            <div className="flex flex-grow min-h-screen pt-16 pb-12">
                <div className="flex-grow flex flex-col justify-center max-w-sm sm:max-w-2xl w-full mx-auto px-0 sm:px-16">
                    <h1 className="flex flex-wrap justify-between mb-2 text-gray-500 dark:text-white text-xl tracking-tight font-bold">
                        <span>Places where I&apos;ve been featured</span>
                    </h1>
                    <ul className="-mb-8" role="list">
                        {timeline.map((event, index) => (
                            <li className="my-1" key={event.title}>
                                <div className="relative pb-8">
                                    {index !== timeline.length - 1 && (
                                        <span
                                            aria-hidden="true"
                                            className="absolute top-1 left-1/2 w-0.5 h-full -ml-px bg-gray-200 dark:bg-gray-600"
                                        />
                                    )}

                                    <div className="relative flex items-center space-x-3 bg-gray-50 bg-opacity-75 dark:bg-gray-900 dark:bg-opacity-75 backdrop-filter backdrop-blur-sm px-2 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-lg">
                                        <div className="relative flex items-center justify-center w-12 h-12 bg-primary-500 bg-opacity-15 backdrop-filter backdrop-blur-sm saturate-200 mx-2 px-1 rounded-full">
                                            <Icon
                                                aria-hidden="true"
                                                className="w-6 h-6 text-primary-500"
                                                icon={event.icon}
                                            />
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <h1 className="flex flex-wrap justify-between mb-2 text-gray-500 dark:text-white text-lg tracking-tight font-bold">
                                                <span>{event.title}</span>
                                                <span className="flex-1 sm:hidden" />
                                                <Pill.Date className="mt-2 sm:mt-0" small={true}>
                                                    {format(event.date, 'PPP')}
                                                </Pill.Date>
                                            </h1>

                                            <p className="my-2 text-gray-300 text-base">
                                                {event.description}
                                            </p>

                                            {event.link && (
                                                <Button.Outline
                                                    className="mt-2"
                                                    href={event.link.url}
                                                    rel="noopener noreferrer"
                                                    small={true}
                                                    target="_blank">
                                                    {event.link.text}
                                                    <Icon
                                                        aria-hidden="true"
                                                        className="ml-3"
                                                        icon="feather:external-link"
                                                    />
                                                </Button.Outline>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </Layout.Default>
    );
}
