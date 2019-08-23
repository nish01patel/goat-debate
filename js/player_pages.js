/**
 * player_pages.js
 * 
 * Nish Patel
 * 7/18/19
 * 
 * This file ensures that the pages for the individual players will function as 
 * intended. With this file, cards will be able to be fully shown and users will 
 * be able to interact with the modals and the accordion menus in the modals.
 * 
 */

"use strict";

const isImageBottomVisible = function (image) {
  const imagePosition = image.getBoundingClientRect();
  return (imagePosition.bottom <= window.innerHeight || 
          imagePosition.bottom <= document.documentElement.clientHeight);
};

/*
 * Fully shows a card if the bottom of the image on the card is visible. Each 
 * card has one image.
 */
const showCards = function () {
  const cards = document.getElementsByClassName("card");
  const images = document.getElementsByTagName("img");
  // Matching cards and images have the same index
  for (let i = 0; i < cards.length; i++) {
    if (isImageBottomVisible(images[i])) {
      cards[i].style.backgroundColor = "rgba(185, 182, 182, 0.5)";
      cards[i].style.boxShadow = "black 0px 0px 15px";
      images[i].style.opacity = "1";
    }
  }
};

const openModal = function (modal) {
  modal.style.display = "flex";
  // Ensures the modal is scrolled instead of the body
  document.getElementsByTagName("body")[0].style.overflow = "hidden";
};

const setViewButtons = function () {
  const modals = document.getElementsByClassName("modal");
  const viewButtons = document.getElementsByClassName("view");
  // Matching modals and view buttons have the same index
  for (let i = 0; i < viewButtons.length; i++) {
    viewButtons[i].addEventListener("click", function () {
      openModal(modals[i]);
    });
  }
};

const closeModal = function (modal) {
  modal.style.display = "none";
  // Allows for scrolling once the modal is closed
  document.getElementsByTagName("body")[0].style.overflow = "auto";
};

const closeStatsInfo = function () {
  const statsInfo = document.getElementsByClassName("info-stats");
  for (let i = 0; i < statsInfo.length; i++) {
    statsInfo[i].style.maxHeight = null;
  }
};

const closeBestGamesInfo = function () {
  const bestGamesInfo = document.getElementsByClassName("info-best-games");
  for (let i = 0; i < bestGamesInfo.length; i++) {
    bestGamesInfo[i].style.maxHeight = null;
  }
};

const setCloseButtons = function () {
  const modals = document.getElementsByClassName("modal");
  const closeButtons = document.getElementsByClassName("close");
  // Matching modals and close buttons have the same index
  for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", function () {
      closeModal(modals[i]);
      // modals[1] is the statistics modal 
      if (i == 1) {
        closeStatsInfo();
      }
      // modals[2] is the best games modal
      else if (i == 2) {
        closeBestGamesInfo();
      }
    });
  }
};

/*
 * Shows the passed in info if it is not being shown and hides it if it is being
 * shown
 */
const openAndCloseInfo = function (info) {
  if (!info.style.maxHeight) {
    info.style.maxHeight = info.scrollHeight + "px";
  }
  else {
    info.style.maxHeight = null;
  }
};

const setStatsButtons = function () {
  const statsButtons = document.getElementsByClassName("internal-stats");
  const statsInfo = document.getElementsByClassName("info-stats");
  // Matching buttons and info have the same index
  for (let i = 0; i < statsButtons.length; i++) {
    statsButtons[i].addEventListener("click", function () {
      openAndCloseInfo(statsInfo[i]);
    });
  }
};

const setBestGamesButtons = function () {
  const bestGamesButtons = document.getElementsByClassName("internal-best-games");
  const bestGamesInfo = document.getElementsByClassName("info-best-games");
  // Matching buttons and info have the same index
  for (let i = 0; i < bestGamesButtons.length; i++) {
    bestGamesButtons[i].addEventListener("click", function () {
      openAndCloseInfo(bestGamesInfo[i]);
    });
  }
};

// Opens a player's page on the website Basketball Reference
const openBBallRef = function (playerSpecificURL) {
  window.open('https://www.basketball-reference.com/players/' + 
              playerSpecificURL + '.html');
};

const setMoreStatsButton = function () {
  const moreStatsButton = document.getElementsByClassName("extra-stats")[0];
  const classesSplit = moreStatsButton.className.split(" ");
  moreStatsButton.addEventListener("click", function () {
    openBBallRef(classesSplit[1]);
  });
};

const resizeStatsInfo = function () {
  const statsInfo = document.getElementsByClassName("info-stats");
  for (let i = 0; i < statsInfo.length; i++) {
    if (statsInfo[i].style.maxHeight) {
      statsInfo[i].style.maxHeight = statsInfo[i].scrollHeight + "px";
    }
  }
};

const resizeBestGamesInfo = function () {
  const bestGamesInfo = document.getElementsByClassName("info-best-games");
  for (let i = 0; i < bestGamesInfo.length; i++) {
    if (bestGamesInfo[i].style.maxHeight) {
      bestGamesInfo[i].style.maxHeight = bestGamesInfo[i].scrollHeight + "px";
    }
  }
};

/*
 * If the bottom of an image is not initially visible but is scrolled past,  
 * becoming visible, the card the image belongs to will be fully shown
 */
window.addEventListener("scroll", showCards);

window.addEventListener("resize", function () {
  /* 
   * If the bottom of an image is not initially visible but is after the window
   * is resized, the card the image belongs to will be fully shown
   */
  showCards();
  // Ensures no statistics information is cut off after a window resize
  resizeStatsInfo();
  // Ensures no best games information is cut off after a window resize
  resizeBestGamesInfo();
});

window.addEventListener("load", function () {
  showCards();
  setViewButtons();
  setCloseButtons();
  setStatsButtons();
  setBestGamesButtons();
  setMoreStatsButton();
});