export const random = (min=0, max:number):number=>{
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const randomID = ():string=>{
    return Math.random().toString(36).slice(2)
}