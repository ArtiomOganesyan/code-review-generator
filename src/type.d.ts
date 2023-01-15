export type Teachers = string[];

type Student = {
  id: number | string;
  name: string;
  groupId: number;
  groupName: string;
};

type Students = Student[];

type Group = { students: Students } | null;

export type Groups = [Group, Group, Group];

export type Columns = [
  string,
  { changeable: boolean; text: string; group: string }[]
][];
