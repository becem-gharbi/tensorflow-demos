export {};

declare global {
  interface TeachableMachineResult {
    className: string;
    probability: number;
  }

  interface QnaAnswer {
    text: string;
    startIndex: number;
    endIndex: number;
    score: number;
  }
  interface TeachableMachineConfigModel {
    name: string;
    url: string;
    description: string;
    link?: string;
  }
}
