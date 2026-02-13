
export interface SubjectImportance {
  subjectName: string;
  importanceScore: number; // Out of 100
  industryRelevance: string;
  mappedSkills: string[];
}

export interface AnalysisResult {
  overallScore: number;
  subjects: SubjectImportance[];
  extractedTopics: string[];
  industryAlignmentSummary: string;
  topSkillsCovered: string[];
}

export enum AppStep {
  UPLOAD = 'UPLOAD',
  PROCESSING = 'PROCESSING',
  RESULTS = 'RESULTS'
}

export enum ProcessingPhase {
  PDF_PARSING = 'Parsing Syllabus Data...',
  NLP_EXTRACTION = 'NLP Topic & Keyword Extraction...',
  SKILL_MAPPING = 'Subject-to-Skill Mapping...',
  INDUSTRY_COMPARISON = 'Industry Dataset Comparison...',
  IMPORTANCE_CALC = 'Calculating Subject Importance Weights...'
}

export interface SyllabusFile {
  name: string;
  content: string;
  type: string;
}
