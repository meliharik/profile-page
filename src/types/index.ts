export interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  title: string;
  description: string;
  technologies: string[];
  links?: {
    type: 'github' | 'appstore' | 'medium' | 'external';
    url: string;
    label: string;
  }[];
  badge?: {
    text: string;
    type: 'award' | 'date' | 'waitlist';
  };
}

export interface EducationItem {
  degree: string;
  field: string;
  institution: string;
  location: string;
  period: string;
  description?: string;
  gpa?: string;
}

export interface PresentationItem {
  title: string;
  event: string;
  date: string;
  description: string;
  attendees?: string;
  link?: {
    type: 'youtube' | 'spotify' | 'external';
    url: string;
    label: string;
  };
}
