export class Transaction {
	constructor(
		private id: string,
		private debitedAccountId: string,
		private creditedAccountId: string,
		private value: number
	) {}

	getId(): string {
		return this.id;
	}
	getDebitedAccountId(): string {
		return this.debitedAccountId;
	}
	getCreditedAccountId(): string {
		return this.creditedAccountId;
	}
	getValue(): number {
		return this.value;
	}
}
