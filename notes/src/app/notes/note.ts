export class Note {
    constructor(
        public id: number,
        public title: string,
        public body: string,
        public createdAt: string,
        public lastUpdated: string,
    ){}
}