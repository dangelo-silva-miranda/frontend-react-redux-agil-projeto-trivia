import md5 from 'crypto-js/md5';

const toHash = (string) => (
  md5(string).toString()
);

export default toHash;
