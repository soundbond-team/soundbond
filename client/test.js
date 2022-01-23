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
  describe("home page avec chrome", function() {
    it("Doit charger la page d'accueil et obtenir le titre", function () {
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
  
    /**
     * Scénario de test pour vérifier si l'élément donné est chargé avec le bouton
     */
    it("Doit vérifier si l'item (soundbond) est chargé", function () {
      return new Promise((resolve, reject) => {
        browserC
          .findElement({ id: "sel-title" })
          .then((elem) => resolve())
          .catch((err) => reject(err));
      });
    });
  });
  
  describe("home page avec firefoxe", function(){
    it("Doit charger la page d'accueil et obtenir le titre", function () {
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

    it("Doit vérifier si l'item (soundbond) est chargé ", function () {
      return new Promise((resolve, reject) => {
        browserF
          .findElement({ id: "sel-title" })
          .then((elem) => resolve())
          .catch((err) => reject(err));
      });
    });
  });
 

  describe("test authentification et clique sur les boutons avec chrome", function() {
    it("clique sur le bouton se connecter de la page accueil", function() {
      browserC.get(serverUri);
      browserC.findElement(webdriver.By.id('connecter')).click();
  
      const pageUrlc = browserC.getCurrentUrl();
      assert.notEqual(pageUrlc, serverUri);
    });

    it("soumettre les informations de connexion et un clique sur se connecter", function() {
      browserC.get("http://localhost:3000/login");
      browserC.findElement(webdriver.By.id('username')).sendKeys('max');
      browserC.findElement(webdriver.By.id('password')).sendKeys('max');
      browserC.findElement(webdriver.By.id('login')).click();
      
      const pageUrl = browserC.getCurrentUrl();
      assert.notEqual(pageUrl, "http://localhost:3000/login");
    });
  });

  describe("test authentification et clique sur les boutons avec firefoxe", function() {
    it("clique sur le bouton se connecter de la page accueil", function() {
      browserF.get(serverUri);
      browserF.findElement(webdriver.By.id('connecter')).click();
  
      const pageUrlc = browserF.getCurrentUrl();
      assert.notEqual(pageUrlc, serverUri);
    });

    it("soumettre les informations de connexion et un clique sur se connecter", function() {
      browserF.get("http://localhost:3000/login");
      browserF.findElement(webdriver.By.id('username')).sendKeys('max');
      browserF.findElement(webdriver.By.id('password')).sendKeys('max');
      browserF.findElement(webdriver.By.id('login')).click();
      
      const pageUrl = browserF.getCurrentUrl();
      assert.notEqual(pageUrl, "http://localhost:3000/login");
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
 
