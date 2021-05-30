import { FrostgraveUtility } from "../frostgrave-utility.js";
/**
 * Extend the base Actor entity by defining a custom roll data structure which is ideal for the Simple system.
 * @extends {Actor}
 */
export class frostgraveActor extends Actor {

    /**
     * Augment the basic actor data with additional dynamic data.
     */
    prepareData() {
        super.prepareData();

        const actorData = this.data;
        const data = actorData.data;
        const flags = actorData.flags;

        // Make separate methods for each Actor type (character, npc, etc.) to keep
        // things organized.
        if (actorData.type === 'character') this._prepareCharacterData(actorData);
    }

    /**
     * Prepare Character type specific data
     */
    _prepareCharacterData(actorData) {
        const data = actorData.data;

        // Make modifications to data here. For example:

        data.exptotal = data.expscenario + data.expbanked;
    }

    async attackWeapon( weapon ) {

      let target = FrostgraveUtility.getTarget();
      if ( target == undefined) {
        ui.notifications.warn(game.i18n.localize("FROSTGRAVE.SelectTargetNeeded"));
        return;
      }
      
      let stat
      if ( FrostgraveUtility.isRanged( weapon.data.data.subcategory)) {
        stat = this.data.data.stats.shoot;
        console.log("TIR");
      } else {
        stat = this.data.data.stats.fight;
        console.log("CC");
      }
      
      let roll = new Roll("1d20+"+stat.actual);
      let score = roll.evaluate( {async:false}).total;
      await FrostgraveUtility.showDiceSoNice(roll);
      roll.toMessage();
    }

}