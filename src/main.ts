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
      const playerTags = WA.player.tags; // Récupérer les tags du joueur
      let tab = WA.player.state.role;

      console.log("Player tags:", playerTags);

      if (
        !playerTags.includes("administrateur") &&
        !playerTags.includes("VIP_cardiologie") &&
        !tab.includes("salle_cardiologie")
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
      const playerTags = WA.player.tags; // Récupérer les tags du joueur
      let tab = WA.player.state.role;


      console.log("Player tags:", playerTags);

      if (
        !playerTags.includes("administrateur") &&
        !playerTags.includes("VIP_neurologie")
        && !tab.includes("salle_neurologie")
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
      const playerTags = WA.player.tags; // Récupérer les tags du joueur
      let tab = WA.player.state.role;

      console.log("Player tags:", playerTags);

      if (
        !playerTags.includes("administrateur") &&
        !playerTags.includes("VIP_oncologie") &&
        !tab.includes("salle_oncologie")
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

    WA.ui.actionBar.addButton({
      id: "register-btn",
      label: "a propos",
      callback: (event) => {
        console.log("Button clicked", event);
        WA.ui.modal.openModal({
          title: "propos",
          src: "./src/introduction.html",
          allow: "fullscreen",
          position: "center",
          allowApi: true,
        });
      },
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

    WA.state.onVariableChange("deletingevent").subscribe((newEventData) => {
      let data = JSON.parse(newEventData);
      if (newEventData) {
        let tab = WA.player.state.role;
        let index = tab.indexOf(data.salle);
        if (index > -1) {
          tab.splice(index, 1); // Supprime le tag
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
        let index = tab.indexOf(delayInfo.salle);
        if (index > -1) {
          tab.splice(index, 1); // Supprime le tag
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
            "allow-same-origin allow-scripts allow-popups allow-forms", // Ajoutez allow-same-origin ici
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

    bootstrapExtra()
      .then(() => {
        console.log("Scripting API Extra ready");
      })
      .catch((e) => console.error(e));
  })
  .catch((e) => console.error(e));

export {};
