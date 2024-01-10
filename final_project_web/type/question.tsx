export default interface QuestionArgs {
  title: string;
  difficulty: string;
  description: string;
  example: string;
  testCases: [
    {
      input: {
        nums: number[];
        target: number;
      };
      output: number[];
    }
  ];
} 
