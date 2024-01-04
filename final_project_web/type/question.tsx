export default interface Question {
  title: string;
  difficulty: string;
  description: string;
  example: string;
  output: string;
  input: {
    nums: string;
    target: string;
  }
}
