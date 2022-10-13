const moment = require("moment");

async function yearsToQuarters() {
  let quartermon;
  let quarter = moment().quarter();
  let year = moment().year();
  if (quarter === 1) {
    quartermon = `Q${quarter}(1 JAN ${year} - 31 MAR ${year})`;
  } else if (quarter === 2) {
    quartermon = `Q${quarter}(1 APR ${year} - 30 JUN ${year})`;
  } else if (quarter === 3) {
    quartermon = `Q${quarter}(1 JUL ${year} - 30 SEP ${year})`;
  } else {
    quartermon = `Q${quarter}(1 OCT ${year} - 31 DEC ${year})`;
  }
  return quartermon;
}

module.exports = { yearsToQuarters };
