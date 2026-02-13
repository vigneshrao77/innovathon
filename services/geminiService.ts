
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export class CurriculumService {
  private ai: GoogleGenAI;

  constructor() {
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  }

  async analyzeCurriculum(syllabusText: string): Promise<AnalysisResult> {
    const response = await this.ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
        Perform a deep NLP-based effectiveness analysis on the following academic syllabus.
        
        SYLLABUS CONTENT:
        ${syllabusText}
        
        INSTRUCTIONS:
        1. Parse the text to identify both the technical modules and the intended learning/course outcomes (COs).
        2. Map these components against current high-demand industry skills (e.g., Cloud, AI, DevOps, Ethics).
        3. Evaluate the "Subject Importance" score (relative weight) for each subject area mentioned. 
           - Assign higher importance to areas with more direct industry applicability.
           - The sum of all importance scores across all subjects MUST equal exactly 100.
        4. Provide an overall readiness score (0-100) based on how well the curriculum prepares students for modern industry roles.
        
        OUTPUT FORMAT (JSON ONLY):
        {
          "overallScore": number,
          "subjects": [
            {
              "subjectName": string,
              "importanceScore": number,
              "industryRelevance": string,
              "mappedSkills": string[]
            }
          ],
          "extractedTopics": string[],
          "industryAlignmentSummary": string,
          "topSkillsCovered": string[]
        }
      `,
      config: {
        responseMimeType: "application/json",
      }
    });

    const resultText = response.text || "{}";
    try {
      const parsed = JSON.parse(resultText);
      
      // Ensure the scores total to 100
      const total = parsed.subjects.reduce((acc: number, s: any) => acc + s.importanceScore, 0);
      if (Math.abs(total - 100) > 0.1 && total > 0) {
        parsed.subjects = parsed.subjects.map((s: any) => ({
          ...s,
          importanceScore: Math.round((s.importanceScore / total) * 100)
        }));
      }
      
      return parsed as AnalysisResult;
    } catch (e) {
      console.error("Failed to parse Gemini response", e);
      throw new Error("Analysis failed. The curriculum content could not be parsed correctly.");
    }
  }
}
