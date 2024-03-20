export class CarSelected {
    code: string = '';
    color: string = '';
    config: string = '';
    tow: boolean = false;
    yoke: boolean = false;
  
    stepOneIsValid() {
      return !this.areNullOrEmpty([this.code, this.color]);
    }
  
    stepTwoIsValid() {
      return !this.areNullOrEmpty([this.code, this.color, this.config]);
    }
  
    private isNullOrEmpty(test: string){
      return test === null || test.length == 0;
    }
  
    private areNullOrEmpty(tests: string[]){
      for (let test of tests){
        if (this.isNullOrEmpty(test))
          return true;
      }
      return false;
    }
  
  }