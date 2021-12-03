export enum HomePageSegment {
    CHATS,
    USERS,
}

export const homePageSegmentMap = {
    [HomePageSegment.CHATS]: 'Чаты',
    [HomePageSegment.USERS]: 'Пользователи',
};

export const formatHomePageSegment = (segment: HomePageSegment) => homePageSegmentMap[segment];

export const homePageSegments = [
    formatHomePageSegment(HomePageSegment.CHATS),
    formatHomePageSegment(HomePageSegment.USERS),
] as const;
