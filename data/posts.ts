export {}

export interface IDataObject {
  name: string
  nick_name: string
  department: string
  matric: string
}

export interface ISRCData {
  department: string
  candidates: IDataObject[]
}

export interface IData {
  PRESIDENT: IDataObject[]
  GENERAL_SECRETARY: IDataObject[]
  ASST_GENERAL_SECRETARY: IDataObject[]
  WELFARE_SECRETARY: IDataObject[]
  FINANCIAL_SECRETARY: IDataObject[]
  PRO: IDataObject[]
  SRC: IDataObject[]
}

export const postsData: IData = {
  PRESIDENT: [
    {
      name: 'YUSUF MOOJEED O.',
      nick_name: 'ACETONE',
      department: 'CHEMISTRY',
      matric: '18/56EE238',
    },
    {
      name: 'IDOWU SAMUEL TEMITOPE',
      nick_name: 'GUSH OF AYOR',
      department: 'STATISTICS',
      matric: '18/56EG064',
    },
  ],
  GENERAL_SECRETARY: [
    {
      name: 'ADEYEMI ABDUSSAMAD A.',
      nick_name: 'PARAGON',
      department: 'PHYSICS',
      matric: '18/56ED024',
    },
  ],
  ASST_GENERAL_SECRETARY: [
    {
      name: 'LUWOYE KAYODE J',
      nick_name: 'SIR KAY',
      department: 'ICH',
      matric: '19/56EF063',
    },
  ],
  WELFARE_SECRETARY: [
    {
      name: 'BAKARE AZEEZ OLAYINKA',
      nick_name: 'OPULENT',
      department: 'MATHEMATICS',
      matric: '19/56EB049',
    },
    {
      name: 'OWOYEMI QUDUS A',
      nick_name: 'MR HUMBLE',
      department: 'STATISTICS',
      matric: '19/56EG109',
    },
  ],
  FINANCIAL_SECRETARY: [
    {
      name: 'ISSA ABDULQUDUS O.',
      nick_name: 'ATOM',
      department: 'PHYSICS',
      matric: '18/56ED064',
    },
  ],
  PRO: [
    {
      name: 'BALOGUN ABDULLAHI O.',
      nick_name: 'HON. GBESH',
      department: 'MATHEMATICS',
      matric: '19/56EB050',
    },
  ],
  SRC: [
    {
      name: 'OLANSILE SAMAD O',
      nick_name: 'COACH',
      department: 'MATHEMATICS',
      matric: '18/56EB082',
    },
    {
      name: 'OLUWATAYO TEMILOLUWA',
      nick_name: 'TEMMY',
      department: 'MATHEMATICS',
      matric: '19/56EB102',
    },
    {
      name: 'OSHINBOLURO TEMITOPE J',
      nick_name: 'BIGGIE MATHS',
      department: 'MATHEMATICS',
      matric: '19/56EB106',
    },
    {
      name: 'SAMBO ADBULAKEEM O',
      nick_name: 'SAMBO',
      department: 'MATHEMATICS',
      matric: '19/56EB120',
    },

    {
      name: 'BOATENG SARAH T',
      nick_name: 'BOATENG',
      department: 'CHEMISTRY',
      matric: '18/56EE087',
    },
    {
      name: 'ODEYEMI OLUWASEGUN',
      nick_name: 'SEGUN',
      department: 'CHEMISTRY',
      matric: '19/56EE142',
    },

    {
      name: 'USMAN SODEEQ G.',
      nick_name: 'SAUCEKID',
      department: 'GEOLOGY',
      matric: '18/56EA069',
    },
    {
      name: 'ABULRAHAMAN KEHINDE',
      nick_name: 'MAYI',
      department: 'GEOLOGY',
      matric: '19/56EA029',
    },

    {
      name: 'OLABODE K AZEEZAT',
      nick_name: 'ZHEE',
      department: 'ICH',
      matric: '18/56EF064',
    },
    {
      name: 'NWAOGU BETTY AMARACHI',
      nick_name: 'GALENA',
      department: 'ICH',
      matric: '19/56EF004',
    },
    {
      name: 'ANINURE TOSIN F',
      nick_name: 'FAYTH',
      department: 'ICH',
      matric: '19/56EF029',
    },

    {
      name: 'OYEDELE ELIJAH A',
      nick_name: 'ELITE',
      department: 'PHYSICS',
      matric: '18/56ED109',
    },
    {
      name: 'OYEGUN VICTOR D',
      nick_name: 'VICTOR',
      department: 'PHYSICS',
      matric: '19/56ED113',
    },

    {
      name: 'BAGBANSORO FARUQ K',
      nick_name: 'BAGBANSORO',
      department: 'STATISTICS',
      matric: '19/56EG055',
    },
  ],
}
