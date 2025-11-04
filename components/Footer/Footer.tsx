import css from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Hanchev Stanislav</p>
          <p>
            Contact us:
            <a href="mailto:stas.hanchev@gmail.com" target='_blank'>stas.hanchev@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
