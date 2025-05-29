import styles from "./page.module.css";
import HeaderLogin from "@/component/header/HeaderLogin";

export default function Home() {
  return (
      <>
          <HeaderLogin />
          <main>
              <header className={styles.headings}>
                  <h2>Sign in</h2>
                  <p>Log in and view the users</p>
              </header>
              <form className={styles.loginContainer}>
                  <input type="email" className="email_input" id="email" placeholder="E-MAIL"/>
                  <input type="password" id="passworld" className="password_input" placeholder="PASSWORLD"/>
                  <label htmlFor="remember"><input type="checkbox" className="checkbox_login" id="remember"
                                                   name="remember"/> Remember me</label>
                  <input type={"button"} value={"Login"}/>
              </form>
          </main>
      </>

  );
}
