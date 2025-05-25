export interface CoursesListDataTypes {
  uuid: string;
  title: string;
  students_count: number;
  episodes_count: number;
  duration: number;
  status: {
    label: string;
    status: number;
  };
}

export interface CourseByIdDataTypes {
  uuid: string;
  title: string;
  banner: string;
  thumbnail: string;
  students_count: number;
  episodes_count: number;
  duration: number;
  status: {
    label: string;
    status: number;
  };
  headlines: CourseHeadlinesTypes[];
}

export interface CourseHeadlinesTypes {
  uuid: string;
  display_name: string;
  level: 1;
  episodes: EpisodesTypes[];
}

export interface EpisodesTypes {
  uuid: string;
  title: string;
  priority: number;
}

export interface CoursesMeetingsDataTypes {
  course: {
    title: string;
  };
  meeting_datetime: string;
  question_page: string;
  meet_link: string;
  is_notified: boolean;
}

export type FeedbackCategory =
  | "دانش تخصصی مدرس"
  | "قدرت انتقال محتوای مدرس"
  | "توانایی برقراری ارتباط"
  | "بازخورد مدرس برای پیشرفت"
  | "کاربردی بودن مفاهیم";

export type FeedbackItem = {
  rate: number;
  percent: number;
};

export interface CoursesFeedbackDataTypes {
  count: number;
  summary: Partial<Record<FeedbackCategory, FeedbackItem>>;
}

// تعریف سطوح
export type Level = "0" | "1" | "2" | "3" | "4" | "5" | "6";

// ساختار داده‌ی یک دوره‌ی آکادمی
export interface CourseLevelAcademyItem {
  title: string;
  uuid: string;
  totalStudents: number;
  notStartedStudents: number;
  accountlessStudents: number;
  studentsWithAccount: number;
  stopedStudents: number;
  LevelsDispersion: Record<Level, number>;
}

// دیکشنری از uuid به اطلاعات دوره
export type CoursesLevelAcademyDataTypes = {
  [uuid: string]: CourseLevelAcademyItem;
};
