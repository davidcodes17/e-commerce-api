import { random } from "./numbers";

const avatarUrl = (id:number):string=>{
    return "/avatars/"+ id + ".svg"
}

const COUNT = 9 ;

const getAvatar = ()=>{
    return avatarUrl(random(1, COUNT))
}

export default getAvatar