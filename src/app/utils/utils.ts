

export class Utils {
  static isNumber(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (key.length === 0) return;
    var regex = /^[0-9,\b]+$/;
    if (!regex.test(key)) {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  static modifyNotOffered(value) {
    const answer = value.split('_');
    return `${answer[0]} ${answer[1]}`;
  }
}
