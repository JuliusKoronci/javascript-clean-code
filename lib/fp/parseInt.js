import R from 'ramda';

export default () => {
  console.log(['10', '10', '10', '10'].map(parseInt));
  console.log(R.map(parseInt)(['10', '10', '10', '10']));
}
