export class User {
    public _id: string;
    public name: string;
    public email: string;
    public phone: string;
    public password: string;
    
    public avatar: any;
    
    static Equal(user1: User, user2: User): boolean {
      if (JSON.stringify(user1) === JSON.stringify(user2)) {
        return true;
      }
      return false;
    }
    static Reset(user: User): void {
      user.email = '';
      user.name = '';
      user.phone = '';
    }
  }
  
  export class UserPostParam {
    public users = new Array();
  }
  