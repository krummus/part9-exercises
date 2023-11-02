export interface CoursePartBase {
    name: string;
    exerciseCount: number;
};

export interface CoursePartBaseWDesc extends CoursePartBase {
    description: string;
};

export interface CoursePartBasic extends CoursePartBaseWDesc {
    kind: "basic";
};

export interface CoursePartGroup extends CoursePartBase {
    groupProjectCount: number;
    kind: "group";
};

export interface CoursePartBackground extends CoursePartBaseWDesc {
    backgroundMaterial: string;
    kind: "background";
};

export interface CoursePartSpecial extends CoursePartBaseWDesc {
    requirements: string[];
    kind: "special"
};

export interface HeaderProps {
    title: string;
};

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial ;

export interface CoursePartListProps {
    parts: CoursePart[];
};

export interface CoursePartProps {
    part: CoursePart;
};