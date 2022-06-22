export interface ColourOption {
    readonly value: string;
    readonly label: string;
    readonly color: string;
  }
  
  export const colourOptions: readonly ColourOption[] = [
    { value: 'Roumain', label: 'Roumain', color:  '#FF8B00' },
    { value: 'Français', label: 'Français', color:  '#FF8B00', },
    { value: 'Anglais', label: 'Anglais', color: '#FF8B00' },
    { value: 'Italien', label: 'Italien', color: '#FF8B00'  },
    { value: 'Russe', label: 'Russe', color: '#FF8B00' },
    { value: 'Espagnol', label: 'Espagnol', color: '#FF8B00'},
    { value: 'Autre', label: 'Autre', color: '#FF8B00' },
  ];

  export const colourOptionsFetes: readonly ColourOption[] = [
    {value: 'Easter', label: 'Easter', color:  '#FF8B00' },
    {  value: 'Noel', label: 'Noel',  color:  '#FF8B00', },
    {value: 'Summer', label: 'Summer', color: '#FF8B00' },
    {value: 'Autre / Other', label: 'Autre / Other', color: '#FF8B00'  },
  ];

  export const fromPerson: readonly ColourOption[] = [
    {value: 'Ejob', label: 'Ejob', color:  '#FF8B00' },
    {  value: 'BestJobs', label: 'BestJobs',  color:  '#FF8B00', },
    {value: 'Public24', label: 'Public24', color: '#FF8B00' },
    {value: 'OLX', label: 'OLX', color: '#FF8B00'  },
    {  value: 'Hipo', label: 'Hipo',  color:  '#FF8B00', },
    {value: ' Website SEO', label: 'Website', color: '#FF8B00' },
    {value: 'Linkedin', label: 'Linkedin', color: '#FF8B00'  },
    {value: 'Jobble', label: 'Jobble', color: '#FF8B00'  },

  ];
