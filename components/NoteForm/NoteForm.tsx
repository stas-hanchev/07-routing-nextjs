import * as Yup from "yup";
import css from './NoteForm.module.css';
import type { NoteTag } from "../../types/note";
import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

interface NoteFormProps {
  onClose: () => void;
}

const PostSchema = Yup.object/*.shape*/({
    title: Yup.string()
        .min(3, 'min 3 chars')
        .max(50, 'max 50 chars')
        .required('Title is required!'),
    content: Yup.string()
        .max(500, 'max 500 chars'),
    tag: Yup.mixed<NoteTag>()
        .oneOf(['Work', 'Personal', 'Meeting', 'Shopping', 'Todo'], 'Invalid tag')
        .required('Tag is required!'),
});

interface FormValues {
    title: string;
    content: string;
    tag: NoteTag;
}

const initialValues: FormValues = {
    title: '',
    content: '',
    tag: "Todo",
};

export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
            alert('Post created!');
            onClose();
        }
    });
    
    const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        mutation.mutate(values);
        actions.resetForm();
    }

    return (
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={PostSchema}>
            <Form className={css.form}>
                <div className={css.formGroup}>
                    <label htmlFor="title">Title</label>
                    <Field id="title" type="text" name="title" className={css.input} />
                    <ErrorMessage component='span' name="title" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="content">Content</label>
                    <Field
                        as="textarea"
                        id="content"
                        name="content"
                        rows={8}
                        className={css.textarea}
                    />
                    <ErrorMessage component='span' name="content" className={css.error} />
                </div>

                <div className={css.formGroup}>
                    <label htmlFor="tag">Tag</label>
                    <Field as="select"  id="tag" name="tag" className={css.select}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                    </Field>
                    <ErrorMessage component='span' name="tag" className={css.error} />
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className={css.submitButton}
                        disabled={mutation.isPending}
                    >
                        Create note
                    </button>
                </div>
            </Form>
        </Formik>
    );
}