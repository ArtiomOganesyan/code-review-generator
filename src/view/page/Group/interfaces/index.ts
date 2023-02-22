interface Campus {
  id: number;
  location: string;
}
export interface Student {
  id: number;
  group: { id: number };
  name: string;
}

export interface Group {
  id: number;
  title: string;
  phase: number;
  archive: boolean;
  campus: Campus;
  students: Student[];
}

