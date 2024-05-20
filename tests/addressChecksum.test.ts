import { isAddress } from '../src/index';

describe('isAddress', () => {
  it('valid checksumed address', () => {
    const input = '0x00000000219ab540356cBB839Cbe05303d7705Fa';
    const output = isAddress(input);

    expect(output).toEqual(true);
  });

  it('valid non checksumed address', () => {
    const input = '0x00000000219ab540356cBB839Cbe05303d7705fa';
    const output = isAddress(input);

    expect(output).toEqual(false);
  });

  it('invalid address', () => {
    const input = '0x00000000219he540356cBB839Cbe05303d7705Fa';
    const output = isAddress(input);

    expect(output).toEqual(false);
  });

  it('invalid length address', () => {
    const input = '0x00000000219';
    const output = isAddress(input);

    expect(output).toEqual(false);
  });

  it('non-prefixed address', () => {
    const input = '00000000219he540356cBB839Cbe05303d7705Fa';
    const output = isAddress(input);

    expect(output).toEqual(false);
  });

  it('all lower case address', () => {
    const input = '0x00000000219ab540356cbb839cbe05303d7705fa';
    const outputChecksum = isAddress(input, true);
    const outputNoChecksum = isAddress(input,false);
    expect(outputChecksum).toEqual(false);
    expect(outputNoChecksum).toEqual(true);
  });

  it('all upper case address', () => {
    const input = '0x00000000219AB540356CBB839CBE05303D7705FA';
    const outputChecksum = isAddress(input, true)
    const outputNoChecksum = isAddress(input, false);
    expect(outputChecksum).toEqual(false);
    expect(outputNoChecksum).toEqual(true);
  });

});
