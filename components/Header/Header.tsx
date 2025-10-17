import css from './Header.module.css'
import Link from 'next/link';
import TagsMenu from '../TagsMenu/TagsMenu';




const Header = async() => {
  
  return (
    <header className={css.header}>
      <Link className={css.headerLink} href="/" aria-label="Home">NoteHub</Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}><TagsMenu /></li>
          <li><Link className={css.navigationLink} href="/profile">Profile</Link></li>
          <li><Link className={css.navigationLink} href="/about">About</Link></li>
        </ul>
      </nav>
    </header>
  );
}
export default Header;