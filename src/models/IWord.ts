export interface IVariant {
	_id: string;
	name: string;
	translationRu: string;
	translationUz: string;
}

export interface AccessMark {
	min: number;
	max: number;
}

export interface Level {
	accessMark: AccessMark;
	status: string;
	_id: string;
	name: string;
	markForMin: number;
	mark: number;
	index: number;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export interface IImage {
	_id: string;
	url: string;
	key: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export interface IVoice {
	_id: string;
	url: string;
	key: string;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export interface IWord {
	variants: IVariant[];
	status: string;
	_id: string;
	name: string;
	class: string;
	transcript: string;
	translationRu: string;
	translationUz: string;
	level: Level;
	wordMark: number;
	description: string;
	example: string;
	exampleRu: string;
	exampleUz: string;
	image: IImage;
	voice: IVoice;
	createdAt: Date;
	updatedAt: Date;
}

export interface IAddWord {
	name: string;
	class: string;
	transcript: string;
	translationRu: string;
	translationUz: string;
	level: string;
	wordMark: number;
	description: string;
	example: string;
	exampleRu: string;
	exampleUz: string;
	image: string;
	voice: string;
	variants: (string | undefined)[];
}
