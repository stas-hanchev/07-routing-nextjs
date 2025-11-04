'use client';

import { useState } from 'react';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { useDebounce } from 'use-debounce';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

export default function NotesClient() {
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [debouncedQuery] = useDebounce(query, 500);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ['notes', page, debouncedQuery],
    queryFn: () => fetchNotes(debouncedQuery, page, 12),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 0;

  const handleSearch = (newQuery: string) => {
    setQuery(newQuery);
    setPage(1);
  };

  const openModal = () => {
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={query} onSearch={handleSearch} />
        {totalPages > 1 && (<Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage}/>)}
        <button className={css.button} onClick={openModal}>Create note +</button>
      </header>
      {notes.length > 0 && (<NoteList notes={notes} />)}
      {isModalOpen && (<Modal onClose={closeModal}>
        <NoteForm onClose={closeModal}></NoteForm>
      </Modal>)}
    </div>
  );
}
