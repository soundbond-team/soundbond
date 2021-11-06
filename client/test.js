/**
 * Dependency Modules
 */
var assert = require("assert").strict;
var webdriver = require("selenium-webdriver");
require("geckodriver");
const chrome = require('selenium-webdriver/chrome');
const chromedriver = require('chromedriver');

chrome.setDefaultService(new chrome.ServiceBuilder(chromedriver.path).build());

// Application Server
const serverUri = "http://localhost:3000/";
const appTitle = "soundbond";
/**
 * Config pour le navigateur Chrome
 * @type {webdriver}
 */
var browserC = new webdriver.Builder()
  .usingServer()
  .withCapabilities({ browserName: "chrome" })
  .build();

/**
 * Config pour le navigateur Firefox (Commentez la configuration Chrome lorsque vous avez l'intention de tester dans Firefox)
 * @type {webdriver}
 */

var browserF = new webdriver.Builder()
  .usingServer()
  .withCapabilities({ browserName: "firefox" })
  .build();

/**
 * Fonction pour obtenir le titre et le résoudre c'est promis
 * @return {[type]} [description]
 */
function logTitleC() {
  return new Promise((resolve, reject) => {
    browserC.getTitle().then(function (title) {
      resolve(title);
    });
  });
}

function logTitleF() {
  return new Promise((resolve, reject) => {
    browserF.getTitle().then(function (title) {
      resolve(title);
    });
  });
}
/**
 *  Exemple de cas de test mocha
 */
describe("Home Page", function () {
  /**
   * Scénario de test pour charger notre application et vérifier le titre.
   */
  it("Doit charger la page d'accueil et obtenir le titre avec chrome", function () {
    return new Promise((resolve, reject) => {
      browserC
        .get(serverUri)
        .then(logTitleC)
        .then((title) => {
          assert.strictEqual(title, appTitle);
          resolve();
        })
        .catch((err) => reject(err));
    });
  });

  it("Doit charger la page d'accueil et obtenir le titre avec firefox", function () {
    return new Promise((resolve, reject) => {
      browserF
        .get(serverUri)
        .then(logTitleF)
        .then((title) => {
          assert.strictEqual(title, appTitle);
          resolve();
        })
        .catch((err) => reject(err));
    });
  });
  /**
   * Scénario de test pour vérifier si l'élément donné est chargé avec le bouton
   */
  it("Doit vérifier si l'item (soundbond) est chargé avec chrome", function () {
    return new Promise((resolve, reject) => {
      browserC
        .findElement({ id: "sel-title" })
        .then((elem) => resolve())
        .catch((err) => reject(err));
    });
  });

  it("Doit vérifier si l'item (soundbond) est chargé avec firefoxe", function () {
    return new Promise((resolve, reject) => {
      browserF
        .findElement({ id: "sel-title" })
        .then((elem) => resolve())
        .catch((err) => reject(err));
    });
  });
  /**
   * Fin d'utilisation des cas de test.
   * Fermez le navigateur et quittez.
   */


 after(function() {
  // End of test use this.
  browserC.quit();
  browserF.quit();
 });
 
 });
 

