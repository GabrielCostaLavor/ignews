import styles from './styles.module.scss';
import { SignInButton } from '../SignInButton/index';
import Link from 'next/link'

export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <Link href="/">
            <a className={styles.active}>Home</a>
          </Link>
          {/* prefetch é utilizado para ja fazer o precarregamento dela sabendo que ja pode ser utilizada
          entao vai ganhar muito mais tempo 
            <Link href="/posts" prefetch>
          */}
          <Link href="/posts" >
            <a>Posts</a>
          </Link>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}