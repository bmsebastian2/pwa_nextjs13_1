"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [isReadeyForInstall, setIsReadyForInstall] = useState(false);
  const [instPromt, setInstProm] = useState();

  useEffect(() => {
    console.log("cargado useeffect");

    let installPrompt = null;
  const installButton = document.querySelector("#install");

    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      installPrompt = event;
      installPrompt && setIsReadyForInstall(true);
      installPrompt && setInstProm(installPrompt);
      installButton.removeAttribute("hidden");
    });
    window.addEventListener("appinstalled", () => {
      console.log("Thank you for installing our app!");
      alert("APP INSTALO");
    });
  }, []);

  async function clickPwa() {
    if (!instPromt) {
      return;
    }
    const result = await instPromt.prompt();

    setInstProm(null);
    setIsReadyForInstall(false);
  }

  return (
    <main>
      <div className="container">
        <h1>APP BARES😎</h1>
      </div>
      <button id="install" hidden>
        Install
      </button>
      {isReadeyForInstall && <button onClick={() => clickPwa()}>app</button>}
    </main>
  );
}
