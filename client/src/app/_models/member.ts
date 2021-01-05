export interface Member {
    id: number;
    userName: string;
    email: string;
    emailConfirmed: boolean;
    firstName: string;
    lastName: string;
    pictureUrl?: any;
    provider: string;
    created: Date;
    phoneNumber: string;
    phoneNumberConfirmed: boolean;
  }