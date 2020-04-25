export class code {
  title:string;
  statement:string;
  marks:number;
  eventName:string;
  difficultyLevel:string;
  testcases:testcase[];
  sampleIpOps:sampleipop[];
  relatedTopics:[string]
  }

  interface testcase{
    input:string;
    output:string;
    explaination:string;
  }
  interface sampleipop{

    input:string;
    output:string;
    explaination:string;
  }

