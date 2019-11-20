import 'reflect-metadata';
import { jsonObject, jsonMember, jsonMapMember, TypedJSON, jsonArrayMember } from 'typedjson';

export const testJSON = `{
    "header": [
        "*The \`world_state\` methods available are:*",
        "*These methods return:*"
    ],
    "body": [
        ["\`all_cells()\`", "*List* of cells on the map"],
        ["\`score_cells()\`", "*List* with score cells"]
    ]
}`;

@jsonObject
export class Table {
    @jsonArrayMember(String)
    public header: string[] = ["Column 1"];

    @jsonArrayMember(String, {dimensions: 2})
    public body: string[][] = [["Cell"]];

    public constructor(fields?: {header?: string[], body?: string[][]}) {
        if (fields) {
          Object.assign(this, fields);
        }
      }
}