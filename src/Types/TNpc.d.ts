import Gender from "./EnumGender"

type NPC = {
   gender: Gender,
   firstName: string,
   lastName: string,
   height: string | number,
   weight: string | number,
   age: number
}