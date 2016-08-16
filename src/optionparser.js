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
    let optionName = null;
    for (let i = 0, l = metas.length, meta, name, content; i < l; i++) {
      meta = metas[i];
      name = meta.getAttribute('name');
      content = meta.getAttribute('content');
      if (name && content && valid(name) && content.length > 0) {
        optionName = name.split(':')[1];
        if (optionName.includes('-')) {
          optionName = convertToCamelCase(optionName);
        }
        options[optionName] = content;
      }
    }
    return options;
  }

}
