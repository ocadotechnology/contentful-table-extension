import produce from 'immer';

export default class TableData {
  public header: string[] = ['Column 1'];

  public body: string[][] = [['Cell']];

  public constructor(fields?: { header?: string[]; body?: string[][] }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }

  public addRow(): TableData {
    return produce(this, draftState => {
      const numberOfColumns = draftState.header.length;
      const newRow = new Array(numberOfColumns).fill('Cell');
      draftState.body.push(newRow);
    });
  }

  public removeRow(index: number): TableData {
    return produce(this, draftState => {
      draftState.body.splice(index, 1);
    });
  }

  public addColumn(): TableData {
    return produce(this, draftState => {
      draftState.header.push('Column name');
      draftState.body.forEach(row => {
        row.push('Cell');
      });
    });
  }

  public removeColumn(index: number): TableData {
    return produce(this, draftState => {
      draftState.header.splice(index, 1);
      draftState.body.forEach(row => {
        row.splice(index, 1);
      });
    });
  }

  public editBodyCell(rowIndex: number, columnIndex: number, newValue: string): TableData {
    return produce(this, draftState => {
      draftState.body[rowIndex][columnIndex] = newValue;
    });
  }

  public editHeaderCell(index: number, newValue: string): TableData {
    return produce(this, draftState => {
      draftState.header[index] = newValue;
    });
  }

  public serialize(): string {
    return JSON.stringify({
      header: this.header,
      body: this.body
    })
  }
}
