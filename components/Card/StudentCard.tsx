import React from 'react'
export type TStudent = {
  matric: string
  name: string
  department: string
}
interface StudentCardProps {
  student: TStudent
}
const StudentCard = ({ student }: StudentCardProps) => {
  return (
    <div className="my-5 mx-auto w-[90%] max-w-md rounded-md border border-primary p-5 shadow-md">
      <h2 className="text-center text-xl font-bold text-primary">
        {student.name}
      </h2>
      <div className="mt-5 flex items-center justify-between font-semibold opacity-75">
        <p>{student.matric}</p>
        <p>{student.department}</p>
      </div>
    </div>
  )
}

export default StudentCard
