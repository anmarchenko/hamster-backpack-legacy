const Parser = {
  'parseItem'(text) {
    const countString = text.split(/\s+/).pop();
    let count = Number.parseInt(countString)
    if (isNaN(count)) {
      count = 1;
    } else {
      text = text.replace(new RegExp(`${countString}$`), '');
    }
    return {name: text, count: count}
  }
};

export default Parser;
