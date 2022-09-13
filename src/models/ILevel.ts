export interface AccessMark {
	min: number;
	max: number;
}

export interface ILevel {
	accessMark: AccessMark;
	status: string;
	_id: string;
	name: string;
	markForMin: number;
	mark: number;
	index: number;
	createdAt: Date;
	updatedAt: Date;
}
