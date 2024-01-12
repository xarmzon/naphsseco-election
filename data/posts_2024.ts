export interface IDataObject {
  name: string
  nick_name: string
  department: string
  matric: string
  level?: string
}

export const postsData: Record<string, IDataObject[]> = {
  VICE_PRESIDENT: [
    {
      name: 'OSENI AISHA ADERONKE',
      nick_name: 'HASNI',
      department: 'GEOLOGY',
      matric: '20/56EA061',
    },
  ],
  STUDENT_REPRESENTATIVE_COUNCIL__bo__SRC__bc__: [
    {
      name: 'AIYENIMELO SAMUEL OLUWAPELUMI',
      nick_name: 'OLA',
      department: 'STATISTICS',
      matric: '21/56EG011',
      level: '200',
    },
    {
      name: 'AGUNBIADE JAMIU OLADIPUPO',
      nick_name: 'JAY',
      department: 'GEOPHYSICS',
      matric: '20/56FJ007',
      level: '300',
    },

    {
      name: 'SALMAN OPEYEMI SULAIMAN',
      nick_name: 'OKAZAKI',
      department: 'STATISTICS ',
      matric: '21/56EG063',
      level: '200',
    },
    {
      name: 'OLADIPO PRESERVE OLUWADIMIMU',
      nick_name: 'OLUWADIMIMU',
      department: 'GEOLOGY',
      matric: '21/56EA039',
      level: '200',
    },
    {
      name: 'AKINMOLUDUN VICTOR',
      nick_name: 'VICTOR',
      department: 'CHEMISTRY',
      matric: '19/56EE061',
      level: '400',
    },
    {
      name: 'SAMBO ABDULAKEEM OLAKUNLE',
      nick_name: 'OLAKUNLE',
      department: 'MATHEMATICS',
      matric: '19/56EB120',
      level: '400',
    },
    {
      name: 'IDRIS BASHIR ADEBAYO',
      nick_name: 'BASH',
      department: 'PHYSICS',
      matric: '20/56ED050',
      level: '300',
    },
  ],
}
