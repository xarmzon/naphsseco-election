import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import Layout from '../../components/layout/Layout'
import api, { errorMessage } from '../../libs/fechter'
import readXlsxFile from 'read-excel-file'
import { NextSeo } from 'next-seo'

const InsertUsers = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [studentsData, setStudentsData] = useState<FileList | null>(null)
  const fileRef = useRef<HTMLInputElement | null>(null)

  const insertCandidate = async () => {
    try {
      toast.loading('Loading......')
      setLoading(false)
      const {
        data: { msg },
      } = await api.post('insert', { insertType: 'candidates' })
      toast.dismiss()
      toast.success(msg)
    } catch (err) {
      toast.dismiss()
      toast.error(errorMessage(err))
    }
  }

  const uploadStudents = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!studentsData) {
      toast.error('Please Select a file first')
      return
    }
    try {
      toast.loading('Loading..........')
      setLoading(true)
      const sData = await readXlsxFile(studentsData[0])
      const {
        data: { msg },
      } = await api.post('insert', {
        insertType: 'students',
        students: sData,
      })
      toast.dismiss()
      toast.success(msg)
    } catch (err) {
      console.log(err)
      toast.dismiss()
      toast.error(errorMessage(err))
    }
    setLoading(false)
  }

  return (
    <Layout>
      <NextSeo title="Admin" />
      <div className="flex h-[calc(100vh-180px)] flex-col items-center justify-center space-y-7">
        <button
          disabled={loading}
          className="rounded-lg bg-primary px-5 py-2 text-white "
          onClick={insertCandidate}
        >
          Upload Candidates
        </button>

        <div className="rounded-lg bg-gray-100 p-5 shadow-lg">
          <form
            onSubmit={uploadStudents}
            className="flex flex-col items-center justify-center space-y-5"
          >
            <div>
              <input
                ref={fileRef}
                type="file"
                onChange={(e) => setStudentsData(e.target.files)}
                name="students"
                id="student"
                accept=".xlsx, .csv"
                className="hidden"
              />
              <span
                onClick={() => {
                  const fbt = fileRef?.current
                  if (!loading) fbt?.click()
                }}
                className="cursor-pointer text-yellow-600 underline"
              >
                Select Student Files
              </span>
            </div>
            <div>
              <input
                disabled={loading}
                className="rounded-lg bg-primary px-5 py-2 text-white "
                onChange={(e) => setStudentsData(e.target.files)}
                type="submit"
                value="Upload Students"
              />
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

export default InsertUsers
