import {APP_PREFERENCE_KEY, Preference} from './preference';

describe('Preference', () => {
  it('Construct', () => {
    const preference = new Preference();

    expect(preference.properties.size()).toBe(0);
    expect(preference.observers.size()).toBe(0);
  });

  it('Set value', () => {
    const preference = new Preference();
    preference.set('bgColor', 'red');

    expect(preference.get('bgColor')).toBe('red');
    expect(preference.observers.get('bgColor')).toBeDefined();
  });

  it('Set value and save it', () => {
    const preference = new Preference();
    preference.set('bgColor', 'red', true);

    expect(preference.get('bgColor')).toBe('red');
    expect(preference.observers.get('bgColor')).toBeDefined();
    expect(localStorage.getItem(APP_PREFERENCE_KEY)).toBe(`{"bgColor":"red"}`);
  });


  it('Remove property', () => {
    const preference = new Preference();
    preference.set('bgColor', 'red', true);

    preference.remove('bgColor', false);

    expect(preference.properties.containsKey('bgColor')).toBeFalsy();
    expect(preference.observers.containsKey('bgColor')).toBeFalsy();
    expect(localStorage.getItem(APP_PREFERENCE_KEY)).toBe(`{"bgColor":"red"}`);
  });


  it('Remove property and persist operation', () => {
    const preference = new Preference();
    preference.set('bgColor', 'red', true);

    preference.remove('bgColor', true);

    expect(preference.properties.containsKey('bgColor')).toBeFalsy();
    expect(preference.observers.containsKey('bgColor')).toBeFalsy();

    console.log(localStorage.getItem(APP_PREFERENCE_KEY));
    expect(localStorage.getItem(APP_PREFERENCE_KEY)).toBe(`{}`);
  });
});
