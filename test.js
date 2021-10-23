const token = 'yfukfkgtuoftycyicycycutuyvoytdxitcoyrxi6';

const jwt = require('jsonwebtoken');

(async () => {
  console.log(
    await jwt.decode(
      token,
      //   '-xK5tjTO93UDUdIlWky7_cJtrM4oAGeklSh7FxXHaDuSqA-aB2Bcdg07GUpFh_2H',
      { complete: true }
    )
  );
})();
