export interface totalWorkExperience {
  years: number;
  months: number;
}

export interface WorkExperienceItemProps {
  _id?: string;
  companyName: string;
  startDate: any;
  endDate: any;
  isCurrentEmployer?: boolean;
  description: string;
}

