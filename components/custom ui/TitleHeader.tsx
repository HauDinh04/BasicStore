import React from 'react'
import { Separator } from '../ui/separator'
interface titleProps{
    title:string;
}
const TitleHeader:React.FC<titleProps> = ({title}) => {
  return (
    <div className="py-6">
        <h2 className='uppercase font-medium '>{title}</h2>
        <Separator className="bg-black mt-2" />
      </div>
  )
}

export default TitleHeader