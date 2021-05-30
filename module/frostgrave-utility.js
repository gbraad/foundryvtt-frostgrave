/* -------------------------------------------- */
export class FrostgraveUtility {

  static isRanged( subcategory ) {
    if (subcategory == 'Bow' || subcategory == 'Crossbow')
      return true;
    return false;
  }

  /* -------------------------------------------- */
  static getTarget() {
    if (game.user.targets && game.user.targets.size == 1) {
      for (let target of game.user.targets) {
        return target;
      }
    }
    return undefined;
  }
  
  /* -------------------------------------------- */
  static async showDiceSoNice(roll, rollMode = undefined) {
    if (game.modules.get("dice-so-nice") && game.modules.get("dice-so-nice").active) {
      let whisper = null;
      let blind = false;
      rollMode = rollMode ?? game.settings.get("core", "rollMode");
      switch (rollMode) {
        case "blindroll": //GM only
          blind = true;
        case "gmroll": //GM + rolling player
          whisper = ChatUtility.getUsers(user => user.isGM);
          break;
        case "roll": //everybody
          whisper = ChatUtility.getUsers(user => user.active);
          break;
        case "selfroll":
          whisper = [game.user.id];
          break;
      }
      await game.dice3d.showForRoll(roll, game.user, true, whisper, blind);
    }
  }


}
