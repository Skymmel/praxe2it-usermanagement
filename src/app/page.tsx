import styles from "./page.module.css";

export default function Home() {
  return (
      <main>
          <header className={styles.header}>
          <h2>Users</h2>
          <p>Management</p>
          </header>
          <div className={styles.userList}>
              <div>
                  <div>

                  </div>
                  <b>Username</b> <span>Admin</span>
                  <div className={styles.infos}>
                      <img height={40} width={40}/>
                      <ul>
                          <li>username@company.com</li>
                          <li>2005/12/15 - 19 y.o.</li>
                      </ul>
                  </div>
              </div>
          </div>
      </main>
  );
}
