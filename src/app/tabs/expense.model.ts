export class Expense {
  constructor(
    public id: string,
    public title: string,
    public amount: number,
    public expenseDate: Date,
    public expenseType: string,
    public image: string | File,
    public imageTimeStamp: Date,
    public notes: string
  ) {}
}
