import { useState } from "react";

export function useToggle(){

const [isOpen, SetIsopen] = useState(false)

function open(){
    SetIsopen(true)
}

function closed(){
    SetIsopen(false)
}

function toggle(){
    SetIsopen(prev =>!prev)
}
return{ open , closed , toggle ,isOpen}
}