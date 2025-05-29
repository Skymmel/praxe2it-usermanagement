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
                  <div className={styles.name}>
                      <b>Wilhelm Skyba</b> <span>Admin</span>
                  </div>
                  <div className={styles.infos}>
                  <img height={40} width={40} src={"https://i.pinimg.com/736x/75/2d/34/752d3412b28c9f87a8b08a717c3e35ef.jpg"}/>
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
