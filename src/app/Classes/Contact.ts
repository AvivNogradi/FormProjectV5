export class Contact {
   
    constructor(
        public firstName:string,
        public lastName:string,
        public email:string,
        public company:string,
        public jobTitle:string,
        public phone:string,
        public gender:string,
        public birthDate:Date,
        public image:string,
        public id: number,
        public isFavourite: boolean,
        public icons:boolean,
    ) { }
}