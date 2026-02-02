import {
    IAppAccessors,
    ILogger,
    IConfigurationExtend,
    IEnvironmentRead,
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { IAppInfo } from '@rocket.chat/apps-engine/definition/metadata';
import { ISetting, SettingType } from '@rocket.chat/apps-engine/definition/settings';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IUser } from '@rocket.chat/apps-engine/definition/users';

import { MemeCommand } from './commands/MemeCommand';

export class MemeGeneratorApp extends App {
    constructor(info: IAppInfo, logger: ILogger, accessors: IAppAccessors) {
        super(info, logger, accessors);
    }

    public async extendConfiguration(configuration: IConfigurationExtend): Promise<void> {
        // Add Imgflip credentials settings
        await configuration.settings.provideSetting({
            id: 'imgflip_username',
            type: SettingType.STRING,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Imgflip_Username',
            i18nDescription: 'Imgflip_Username_Description',
        });

        await configuration.settings.provideSetting({
            id: 'imgflip_password',
            type: SettingType.PASSWORD,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Imgflip_Password',
            i18nDescription: 'Imgflip_Password_Description',
        });

        await configuration.settings.provideSetting({
            id: 'show_image_preview',
            type: SettingType.BOOLEAN,
            packageValue: true,
            required: false,
            public: false,
            i18nLabel: 'Show_Image_Preview',
            i18nDescription: 'Show_Image_Preview_Description',
        });

        await configuration.settings.provideSetting({
            id: 'language',
            type: SettingType.SELECT,
            packageValue: 'en',
            required: false,
            public: false,
            i18nLabel: 'Language',
            i18nDescription: 'Language_Description',
            values: [
                { key: 'en', i18nLabel: 'English' },
                { key: 'sv', i18nLabel: 'Svenska' },
                { key: 'de', i18nLabel: 'Deutsch' },
                { key: 'fr', i18nLabel: 'Français' },
                { key: 'es', i18nLabel: 'Español' },
            ],
        });

        await configuration.slashCommands.provideSlashCommand(new MemeCommand(this));
    }
}
