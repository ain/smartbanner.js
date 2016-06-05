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
    let options = {};
    Array.from(metas).forEach(function(meta) {
      let name = meta.getAttribute('name');
      let content = meta.getAttribute('content');
      if (name && content && valid(name) && content.length > 0) {
        // TODO: transform price suffixes to camelCase
        options[name.split(':')[1]] = content;
      }
    });
    return options;
  }


}
