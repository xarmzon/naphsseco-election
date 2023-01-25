export interface IDataObject {
  name: string
  nick_name: string
  department: string
  matric: string
}

export const postsData: Record<string, IDataObject[]> = {
  VICE_PRESIDENT: [
    {
      name: 'MADAMORI MARY IFEOLUWA',
      nick_name: 'IFEH',
      department: 'GEOPHYSICS',
      matric: '18/56FJ054',
    },
    {
      name: 'OLABODE KOFOWOROLA AZEEZAT',
      nick_name: 'ZHEE',
      department: 'INDUSTRIAL CHEMISTRY',
      matric: '18/56EF064',
    },
  ],
  SPORT_SECRETARY: [
    {
      name: 'AWOYEMI EBENEZER OBAFEMI',
      nick_name: 'EMERALDSTONE',
      department: 'PHYSICS',
      matric: '18/56ED039',
    },
  ],
  SOCIAL_SECRETARY: [
    {
      name: 'ODEREMI OLUWAFERANMI EMMANUEL',
      nick_name: 'FERANMITE',
      department: 'INDUSTRIAL CHEMISTRY',
      matric: '19/56EF068',
    },
  ],
  STUDENT_REPRESENTATIVE_COUNCIL__bo__SRC__bc__: [
    {
      department: 'INDUSTRIAL CHEMISTRY',
      name: 'OLOYEDE TEMITOPE LATEEFAT',
      nick_name: 'TEE',
      matric: '19/56EF080',
    },
    {
      department: 'GEOPHYSICS',
      name: 'ADEYEMI VICTOR ABRAHAM',
      nick_name: 'VICKY',
      matric: '19/56FJ013',
    },
    {
      department: 'STATISTICS',
      name: 'AKINTOBI ABDULLAH OLAITAN',
      nick_name: 'SHOWLEE',
      matric: '20/56EG040',
    },
    {
      department: 'CHEMISTRY',
      name: 'OKE MONISOLA HABEEBAT',
      nick_name: 'NIL',
      matric: '20/56EE123',
    },
    {
      department: 'PHYSICS',
      name: 'OLORU ADEMOLA ABDULHAMEED',
      nick_name: 'ESTER',
      matric: '20/56ED078',
    },
    {
      department: 'PHYSICS',
      name: 'BABATUNDE LUKMAN OLAWALE',
      nick_name: 'LUCKHENZY',
      matric: '18/56ED043',
    },
    {
      department: 'GEOLOGY',
      name: 'ILESANMI PRECIOUS OLUWASEGUNFUNMI',
      nick_name: 'SHEGZZ',
      matric: '19/56EA042',
    },
    {
      department: 'GEOLOGY',
      name: 'ADETAYO DAVID AYOMIDE',
      nick_name: 'RAYZOR',
      matric: '19/56EA011',
    },
  ],
}
