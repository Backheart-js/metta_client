type TGender = 1 | 2;

export interface IUserInfo {
    avatarUrl: string;
    fullname: string;
    gender: TGender;
    birthYear: number;
    exerciseIntensity: number;
    weight: number;
    height: number;
}
