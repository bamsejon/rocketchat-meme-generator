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
            i18nLabel: 'Imgflip Username',
            i18nDescription: 'Your Imgflip username (create free account at imgflip.com)',
        });

        await configuration.settings.provideSetting({
            id: 'imgflip_password',
            type: SettingType.PASSWORD,
            packageValue: '',
            required: true,
            public: false,
            i18nLabel: 'Imgflip Password',
            i18nDescription: 'Your Imgflip password',
        });

        await configuration.slashCommands.provideSlashCommand(new MemeCommand(this));
    }
}
