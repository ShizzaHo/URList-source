import SettingsState from './index';

test('Toggle the setting', () => {
    SettingsState.toggleSetting("guideStart"); //true
    SettingsState.toggleSetting("guideStart"); //false
    SettingsState.toggleSetting("guideStart"); //true

    expect(SettingsState.getSettings().guideStart).toBe(true);
});