// @ts-nocheck
/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log("Script started successfully");

let lastPosition = { x: 0, y: 0 };
let lastDirection = "down";
let cguWebsite: any;

WA.onInit()
  .then(() => {
    console.log("Scripting API ready");
    console.log("CA MARCHE");

    //############################################################ Watcher de variable ############################################################

    WA.state.onVariableChange("toto").subscribe((newEventData) => {
      console.log("Updated calendar event data:", newEventData);
    });

    WA.state.onVariableChange("iframe").subscribe((newEventData) => {
      console.log("Updated iframe event data:", newEventData);
      if (!newEventData) {
        closeIframe();
        WA.state.saveVariable("iframe", true);
      }
    });

    WA.state.onVariableChange("waf").subscribe((newEventData) => {
      if (!newEventData) {
        closeWaf();
        WA.state.saveVariable("waf", true);
      }
    });

    WA.state.onVariableChange("deletingevent").subscribe((newEventData) => {
      let data = JSON.parse(newEventData);
      if (newEventData) {
        let tab = WA.player.state.role;
        tab ? tab : (tab = []);
        let index = tab.indexOf(data.salle);
        if (index > -1) {
          tab.splice(index, 1); 
          WA.player.state.role = tab;
          WA.chat.sendChatMessage(
            "Inscription terminée pour " +
              data.title +
              " dans la salle: " +
              data.salle,
            "info"
          );
          console.log("player role updated", tab);
        }
      }
    });

    WA.state.onVariableChange("delayinfo").subscribe((delayInfoJson) => {
      let delayInfo = JSON.parse(delayInfoJson);
      setTimeout(() => {
        let tab = WA.player.state.role;
        tab ? tab : (tab = []);
        let index = tab.indexOf(delayInfo.salle);
        if (index > -1) {
          tab.splice(index, 1); 
          WA.player.state.role = tab;
          WA.chat.sendChatMessage(
            "Inscription terminée pour " +
              delayInfo.title +
              " dans la salle: " +
              delayInfo.salle,
            "info"
          );
          console.log("player role updated", tab);
        }
      }, delayInfo.delay);
    });

    let cgu;

    WA.state.onVariableChange("Cgu").subscribe((newEventData) => {
      if (newEventData) {
        cgu.close();
        WA.state.saveVariable("Cgu", false);
      }
    });

    cguWebsite = WA.ui.website
      .open({
        url: "./src/cgu/index.html",
        position: { vertical: "top", horizontal: "middle" },
        size: { height: "30vh", width: "50vw" },
        margin: { top: "10vh" },
        allowApi: true,
      })
      .then((website) => {
        console.log("Calendrier ouvert avec succès");
        cgu = website;
      });

    window.addEventListener("message", (event) => {
      if (event.data.action === "closeCGU") {
        if (cguWebsite) {
          cguWebsite.close();
          console.log("CGU window closed");
        }
      }
    });

    WA.player.onPlayerMove((moveData) => {
      lastPosition = { x: moveData.x, y: moveData.y };
      lastDirection = moveData.direction;
    });

    WA.room.area.onEnter("jitsiMeetingRoom").subscribe(async () => {
      console.log(`The player ${WA.player.name} has entered the zone.`);
      const playerTags = WA.player.tags; 
      let tab = WA.player.state.role;
      let Access = tab ? tab.includes("salle_cardiologie") : false;

      console.log("Player tags:", playerTags);

      if (
        !playerTags.includes("administrateur") &&
        !playerTags.includes("VIP_cardiologie") &&
        !Access
      ) {
        console.log(
          'Access denied to the jitsiMeetingRoom. You do not have the "admin" role.'
        );

        let teleportX = lastPosition.x;
        let teleportY = lastPosition.y;
        switch (lastDirection) {
          case "down":
            teleportY -= 1;
            break;
          case "up":
            teleportY += 1;
            break;
          case "left":
            teleportX += 1;
            break;
          case "right":
            teleportX -= 1;
            break;
        }
        await WA.player.teleport(teleportX, teleportY);

        WA.ui.displayActionMessage({
          message:
            "Vous n'avez pas le role nécéssaire pour accéder à la zone cardiologie, si le problème persiste veuillez contacter un administrateur",
          callback: () => console.log("The player has confirmed the message."),
          type: "warning",
        });
      } else {
        console.log("Welcome to the jitsiMeetingRoom!");
      }
    });

    WA.room.area.onEnter("book").subscribe(async () => {
      console.log(`The player ${WA.player.name} has entered the zone.`);
      const playerTags = WA.player.tags;

      console.log("Player tags:", playerTags);

      WA.ui.modal.openModal({
        title: "Bibliothèque virtuelle",
        src: "http://154.56.57.33/",
        allow: "fullscreen",
        position: "right",
        allowApi: true,
      });
    });

    WA.room.area.onEnter("jitsiChillZone").subscribe(async () => {
      console.log(`The player ${WA.player.name} has entered the zone.`);
      const playerTags = WA.player.tags; 
      let tab = WA.player.state.role;
      let Access = tab ? tab.includes("salle_neurologie") : false;

      console.log("Player tags:", playerTags);

      if (
        !playerTags.includes("administrateur") &&
        !playerTags.includes("VIP_neurologie") &&
        !Access
      ) {
        console.log(
          'Access denied to the jitsiMeetingRoom. You do not have the "admin" role.'
        );

        let teleportX = lastPosition.x;
        let teleportY = lastPosition.y;
        switch (lastDirection) {
          case "down":
            teleportY -= 1;
            break;
          case "up":
            teleportY += 1;
            break;
          case "left":
            teleportX += 1;
            break;
          case "right":
            teleportX -= 1;
            break;
        }
        await WA.player.teleport(teleportX, teleportY);

        WA.ui.displayActionMessage({
          message:
            "Vous n'avez pas le role nécéssaire pour accéder à la zone neurologie, si le problème persiste veuillez contacter un administrateur",
          callback: () => console.log("The player has confirmed the message."),
          type: "warning",
        });
      } else {
        console.log("Welcome to the jitsiMeetingRoom!");
      }
    });

    WA.room.area.onEnter("from-conference").subscribe(async () => {
      console.log(`The player ${WA.player.name} has entered the zone.`);
      const playerTags = WA.player.tags; 
      let tab = WA.player.state.role;
      let Access = tab ? tab.includes("salle_oncologie") : false;
      console.log("Player tags:", playerTags);

      if (
        !playerTags.includes("administrateur") &&
        !playerTags.includes("VIP_oncologie") &&
        !Access
      ) {
        console.log(
          'Access denied to the jitsiMeetingRoom. You do not have the "admin" role.'
        );

        let teleportX = lastPosition.x;
        let teleportY = lastPosition.y;
        switch (lastDirection) {
          case "down":
            teleportY -= 1;
            break;
          case "up":
            teleportY += 1;
            break;
          case "left":
            teleportX += 1;
            break;
          case "right":
            teleportX -= 1;
            break;
        }
        await WA.player.teleport(teleportX, teleportY);

        WA.ui.displayActionMessage({
          message:
            "Vous n'avez pas le role nécéssaire pour accéder à la zone oncologie, si le problème persiste veuillez contacter un administrateur",
          callback: () => console.log("The player has confirmed the message."),
          type: "warning",
        });
      } else {
        console.log("Welcome to the jitsiMeetingRoom!");
      }
    });

    let wafwouf;

    WA.ui.actionBar.addButton({
      id: "register-btn",
      label: "À propos",
      callback: (event) => {
          console.log("Bouton cliqué", event);
          WA.ui.website.open({
              url: "./src/introduction.html",
              position: {
                  vertical: "middle",
                  horizontal: "middle"
              },
              size: {
                  width: "70%",
                  height: "70%"
              },
              visible: true,
              allowApi: true,
              allowPolicy: "allow-same-origin allow-scripts allow-popups allow-forms"
          }).then((website) => {
              console.log("Page d'introduction ouverte avec succès");
              wafwouf = website
          }).catch((err) => {
              console.error("Erreur lors de l'ouverture de la page d'introduction", err);
          });
      }
  });
  

    const playerTags = WA.player.tags;

    if (playerTags.includes("VIP_oncologie")) {
      WA.player.setOutlineColor(150, 131, 236);
    } else if (playerTags.includes("VIP_cardiologie")) {
      WA.player.setOutlineColor(180, 8, 8);
    } else if (playerTags.includes("VIP_neurologie")) {
      WA.player.setOutlineColor(28, 6, 162);
    }

    //calendar
    let mycalendar;

    //############################################################ Calendar ############################################################

    function openCalendar() {
      WA.ui.website
        .open({
          url: "./src/calendar/calendar.html",
          position: {
            vertical: "middle",
            horizontal: "middle",
          },
          size: {
            width: "90%",
            height: "90%",
          },
          visible: true,
          allowApi: true,
          allowPolicy:
            "allow-same-origin allow-scripts allow-popups allow-forms", 
        })
        .then((website) => {
          console.log("Calendrier ouvert avec succès");
          mycalendar = website;
        })
        .catch((err) => {
          console.error("Erreur lors de l'ouverture du calendrier", err);
        });
    }

    WA.room.onEnterLayer("calendar").subscribe(() => {
      openCalendar();
    });

    WA.room.onLeaveLayer("calendar").subscribe(() => {
      closeIframe();
    });

    function closeIframe() {
      if (mycalendar) {
        mycalendar
          .close()
          .then(() => {
            console.log("Calendrier fermé avec succès");
            mycalendar = null;
          })
          .catch((err) => {
            console.error("Erreur lors de la fermeture du calendrier", err);
          });
      }
    }

    function closeWaf() {
      if (wafwouf) {
        wafwouf
          .close()
          .then(() => {
            console.log("Calendrier fermé avec succès");
            wafwouf = null;
          })
          .catch((err) => {
            console.error("Erreur lors de la fermeture du calendrier", err);
          });
      }
    }

    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

export {};
