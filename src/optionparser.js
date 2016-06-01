function valid(name) {
  // TODO: validate against options dictionary
  return name.indexOf('smartbanner:') !== -1 && name.split(':')[1].length > 0;
}

export default class OptionParser {

  constructor() {
    this.options = this.parse();
  }

  parse() {
    let metas = document.getElementsByTagName('meta');
    if (metas.length === 0) {
      return null;
    }
    let options = {};
    let self = this;
    Array.from(metas).forEach(function(meta) {
      let name = meta.getAttribute('name');
      let content = meta.getAttribute('content');
      if (name && content && valid(name) && content.length > 0) {
        options[name.split(':')[1]] = content;
      }
    });
    return options;
  }


}
