const codelang:Array<[string, string]> = [
  ['nodejs', `process.stdin.resume();
process.stdin.setEncoding("utf8");
// your code goes here`],
  ['java',`
/*package whatever //do not write package name here */

import java.io.*;

public class GFG {
 public static void main (String[] args) {
    System.out.println("GfG!");
  }
}`
],
  ['python3', `#code
print("GfG")`],
  ['csharp', `using System;
public class GFG{
  static public void Main (){
    //Code
  }
}`],
  ['php', `<?php
//code
?>`],
  ['ruby', '# cook your code here'],
  ['c',`#include <stdio.h>
int main(void) {
  // your code goes here
  return 0;
}`],
  ['cpp',`#include <iostream>
using namespace std;
int main() {
  // your code goes here
  return 0;
}`],
];

export const codelangMap: Map<string, string> = new Map(codelang);
