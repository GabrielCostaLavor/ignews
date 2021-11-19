import styles from './styles.module.scss';
import { SignInButton } from '../SignInButton/index';
import {ActiveLink} from '../ActiveLink/index'
export function Header() {
  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <img src="/images/logo.svg" alt="ig.news" />
        <nav>
          <ActiveLink activeClassName={styles.active} href="/">
            <a>Home</a>
          </ActiveLink>
          {/* prefetch é utilizado para ja fazer o precarregamento dela sabendo que ja pode ser utilizada
          entao vai ganhar muito mais tempo 
            <Link href="/posts" prefetch>
          */}
          <ActiveLink activeClassName={styles.active} href="/posts" >
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}