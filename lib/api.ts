import axios from "axios";

import type { Note, NoteTag } from "../types/note";

const BASE_URL = "https://notehub-public.goit.study/api";
// const TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

interface FetchNotesResponse {
    notes: Note[];
    totalPages: number;
}

interface NewNote {
    title: string;
    content: string;
    tag: NoteTag;
}

export async function fetchNotes(keyWord: string, page: number, perPage: number): Promise<FetchNotesResponse> {
    const response = await api.get<FetchNotesResponse>(`/notes`, {
        params: {
            search: keyWord,
            page,
            perPage
        }
    });
    console.log('fetchNotes', response.data);

    return response.data;
}

export async function fetchNoteById(id: string): Promise<Note> {
    const response = await api.get<Note>(`/notes/${id}`);
    console.log('fetchNotesById', response.data);

    return response.data;
}

export async function createNote(payload: NewNote): Promise<Note> {
    const response = await api.post<Note>(`/notes`, payload)
    console.log('createNote', response.data);

    return response.data;
}

export async function deleteNote(id: string): Promise<Note> {
    const response = await api.delete<Note>(`/notes/${id}`);
    console.log('deleteNote', response.data);

    return response.data;
}