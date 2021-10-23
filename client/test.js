/*var webdriver = require('selenium-webdriver');
function test(){
  var driver = new webdriver.Builder().forBrowser('chrome').build();
  driver.get('http://localhost:3000/').then(function(){
    driver.findElement(webdriver.By.linkText('Automation')).click().then(function(){
      driver.getTitle().then(function(title){
      setTimeout(function(){
        driver.quit();
      }, 5000);
    });
  });
});
}
test();*/

/**
 * Dependency Modules
 */
 var assert = require("assert").strict;
 var webdriver = require("selenium-webdriver");
 require("geckodriver");
 
  // Application Server
 const serverUri = "http://localhost:3000/";
 const appTitle = "soundbond";
 /**
  * Config pour le navigateur Chrome 
  * @type {webdriver}
  */
 var browser = new webdriver.Builder()
 .usingServer()
 .withCapabilities({ browserName: "chrome" })
 .build();
 
  /**
  * Config pour le navigateur Firefox (Commentez la configuration Chrome lorsque vous avez l'intention de tester dans Firefox) 
  * @type {webdriver}
  */
 /*
 var browser = new webdriver.Builder()
  .usingServer()
  .withCapabilities({ browserName: "firefox" })
  .build();
  */
 /**
  * Fonction pour obtenir le titre et le résoudre c'est promis
  * @return {[type]} [description]
  */
  function logTitle() {
     return new Promise((resolve, reject) => {
      browser.getTitle().then(function(title) {
       resolve(title);
      });
     });
    }
    /**
  *  Exemple de cas de test mocha 
  * Pour vérifier si la valeur donnée est présente dans le tableau. 
  */
 describe("Array", function() {
   describe("#indexOf()", function() {
     it("should return -1 when the value is not present", function() {
      assert.equal([1, 2, 3].indexOf(4), -1);
     });
   });
 });
 describe("Home Page", function() {
   /**
    * Scénario de test pour charger notre application et vérifier le titre. 
    */
   it("Charger la page d'accueil et obtenir le titre", function() {
    return new Promise((resolve, reject) => {
     browser
      .get(serverUri)
      .then(logTitle)
      .then(title => {
       assert.strictEqual(title, appTitle);
       resolve();
      })
      .catch(err => reject(err));
    });
   });
   /**
 * Scénario de test pour vérifier si l'élément donné est chargé avec le bouton 
 */
 it("vérifier si l'élément donné est chargé", function() {
   return new Promise((resolve, reject) => {
    browser
     .findElement({ id: "sel-button" })
     .then(elem => resolve())
     .catch(err => reject(err));
   });
 });
 /**
 * Fin d'utilisation des cas de test. 
 * Fermez le navigateur et quittez. 
 */
 
 });
 