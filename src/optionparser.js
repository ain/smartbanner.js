function valid(name) {
  // TODO: validate against options dictionary
  return name.indexOf('smartbanner:') !== -1 && name.split(':')[1].length > 0;
}

function convertToCamelCase(name) {
  let parts = name.split('-');
  parts.map(function(part, index) {
    if (index > 0) {
      parts[index] = part.charAt(0).toUpperCase() + part.substring(1);
    }
  });
  return parts.join('');
}

export default class OptionParser {

  parse() {
    let metas = document.getElementsByTagName('meta');
    let options = {};
    Array.apply(null, metas).forEach(function(meta) {
      let optionName = null;
      let name = meta.getAttribute('name');
      let content = meta.getAttribute('content');
      if (name && content && valid(name) && content.length > 0) {
        optionName = name.split(':')[1];
        if (optionName.indexOf('-') !== -1) {
          optionName = convertToCamelCase(optionName);
        }
        options[optionName] = content;
      }
    });
    return options;
  }

}
