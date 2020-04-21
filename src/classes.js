class Humain{
    constructor(){
        console.log('humain Constructor');
        this.name = '';
        this.job = '';
        this.language ='arabic';
    }
    getAge(){
        return 20;
    }

}

export default class Person extends Humain {
    constructor(){
        super();
        console.log('person Constructor');
        this.name= 'mahmoud nassih';
        this.job ='Developper';
    }
    getJob(){
        return this.job;
    }
    get getNames(){
        return this.name;
    }
    
    set setNames(personName){
        this.name = personName;
    }
    static getHeight(){
        return 170;
    }
    
}