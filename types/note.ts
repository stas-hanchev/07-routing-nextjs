export type NoteTag = 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';

export interface Note {
    id: string;
    title: string;
    content: string;
    createdAt: string; //"2022-01-01T00:00:00Z",
    updatedAt: string;
    tag: NoteTag;
}