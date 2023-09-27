"use client";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [isReadeyForInstall, setIsReadyForInstall] = useState(false);

  useEffect(() => {
    console.log("cargado useeffect");

    window.addEventListener("beforeinstallprompt ", (event) => {
      event.preventDefault();
      console.log(`👍 BeforeInstallPromptEvent , ${event}`);
      window.deferredPrompt = event;
      setIsReadyForInstall(true);
    });
  }, []);

  async function dowloadApp() {
    console.log('first');
    
    const promtEvent = window.deferredPrompt;
    if (promtEvent) {
      promtEvent.prompt();
      const result = await promtEvent.userChoice;
      window.deferredPrompt = null;
    }
  }

  return (
    <main className={styles.main}>
      <div className="container">
        <h1>APP BARES😎</h1>
        {isReadeyForInstall && <button>Instalar</button>}
      </div>
      <button onClick={dowloadApp}>instalar 2</button>
    </main>
  );
}
