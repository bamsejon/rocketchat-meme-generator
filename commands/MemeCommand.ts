import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import {
    ISlashCommand,
    ISlashCommandPreview,
    ISlashCommandPreviewItem,
    SlashCommandContext,
    SlashCommandPreviewItemType,
} from '@rocket.chat/apps-engine/definition/slashcommands';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { App } from '@rocket.chat/apps-engine/definition/App';
import { getTranslations, Translations } from '../i18n/translations';

// Popular meme templates with their Imgflip IDs and preview image URLs
const POPULAR_MEMES: { [key: string]: { id: string; name: string; url: string } } = {
    'drake': { id: '181913649', name: 'Drake Hotline Bling', url: 'https://i.imgflip.com/30b1gx.jpg' },
    'distracted': { id: '112126428', name: 'Distracted Boyfriend', url: 'https://i.imgflip.com/1ur9b0.jpg' },
    'change-my-mind': { id: '129242436', name: 'Change My Mind', url: 'https://i.imgflip.com/24y43o.jpg' },
    'two-buttons': { id: '87743020', name: 'Two Buttons', url: 'https://i.imgflip.com/1g8my4.jpg' },
    'everywhere': { id: '91538330', name: 'X, X Everywhere', url: 'https://i.imgflip.com/1ihzfe.jpg' },
    'expanding-brain': { id: '93895088', name: 'Expanding Brain', url: 'https://i.imgflip.com/1jwhww.jpg' },
    'is-this': { id: '100777631', name: 'Is This a Pigeon?', url: 'https://i.imgflip.com/1o00in.jpg' },
    'disaster-girl': { id: '97984', name: 'Disaster Girl', url: 'https://i.imgflip.com/23ls.jpg' },
    'uno': { id: '217743513', name: 'UNO Draw 25 Cards', url: 'https://i.imgflip.com/3lmzyx.jpg' },
    'always-has-been': { id: '252600902', name: 'Always Has Been', url: 'https://i.imgflip.com/46e43q.png' },
    'gru-plan': { id: '131940431', name: "Gru's Plan", url: 'https://i.imgflip.com/26jxvz.jpg' },
    'bernie': { id: '222403160', name: 'Bernie Sanders Once Again Asking', url: 'https://i.imgflip.com/3oevdk.jpg' },
    'think-about-it': { id: '89370399', name: 'Roll Safe Think About It', url: 'https://i.imgflip.com/1h7in3.jpg' },
    'stonks': { id: '52223451', name: 'Stonks', url: 'https://i.imgflip.com/2yhcnr.jpg' },
    'sad-pablo': { id: '80707627', name: 'Sad Pablo Escobar', url: 'https://i.imgflip.com/1c1uej.jpg' },
    'this-is-fine': { id: '55311130', name: 'This Is Fine', url: 'https://i.imgflip.com/wxica.jpg' },
    'waiting': { id: '4087833', name: 'Waiting Skeleton', url: 'https://i.imgflip.com/2fm6x.jpg' },
    'panik': { id: '226297822', name: 'Panik Kalm Panik', url: 'https://i.imgflip.com/3qqcim.png' },
    'buff-doge': { id: '247375501', name: 'Buff Doge vs. Cheems', url: 'https://i.imgflip.com/43a45p.png' },
    'trade-offer': { id: '309868304', name: 'Trade Offer', url: 'https://i.imgflip.com/54hjww.jpg' },
};

export class MemeCommand implements ISlashCommand {
    public command = 'meme';
    public i18nParamsExample = 'meme_params_example';
    public i18nDescription = 'meme_description';
    public providesPreview = true;

    constructor(private readonly app: App) {}

    public async previewer(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<ISlashCommandPreview> {
        const args = context.getArguments();

        let matchingTemplates: [string, { id: string; name: string; url: string }][];

        if (args.length === 0) {
            // Show all templates (limit to 6 with text+image pairs)
            matchingTemplates = Object.entries(POPULAR_MEMES).slice(0, 6);
        } else {
            const searchTerm = args[0].toLowerCase();

            // Filter templates that match the search term
            matchingTemplates = Object.entries(POPULAR_MEMES)
                .filter(([key, value]) =>
                    key.includes(searchTerm) ||
                    value.name.toLowerCase().includes(searchTerm)
                )
                .slice(0, 6);
        }

        // Get language setting
        const lang = await read.getEnvironmentReader().getSettings().getValueById('language') || 'en';
        const t = getTranslations(lang);

        if (matchingTemplates.length === 0) {
            return {
                i18nTitle: t.noMatchingTemplates,
                items: [{
                    id: 'no-match',
                    type: SlashCommandPreviewItemType.TEXT,
                    value: `${t.noTemplatesMatching} "${args[0]}"`,
                }],
            };
        }

        // Check if image preview is enabled
        const showImagePreview = await read.getEnvironmentReader().getSettings().getValueById('show_image_preview');

        // Create preview items
        const items: ISlashCommandPreviewItem[] = [];
        for (const [key, value] of matchingTemplates) {
            if (showImagePreview) {
                // Add short key name
                items.push({
                    id: `${key}-label`,
                    type: SlashCommandPreviewItemType.TEXT,
                    value: key,
                });
                // Add thumbnail preview using image proxy to resize (60px height)
                const thumbnailUrl = `https://images.weserv.nl/?url=${encodeURIComponent(value.url)}&h=60&fit=contain`;
                items.push({
                    id: key,
                    type: SlashCommandPreviewItemType.IMAGE,
                    value: thumbnailUrl,
                });
            } else {
                // Text only
                items.push({
                    id: key,
                    type: SlashCommandPreviewItemType.TEXT,
                    value: `${key} - ${value.name}`,
                });
            }
        }

        return {
            i18nTitle: t.memeTemplates,
            items,
        };
    }

    public async executePreviewItem(
        item: ISlashCommandPreviewItem,
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const sender = context.getSender();
        const room = context.getRoom();

        if (item.id === 'no-match') {
            return;
        }

        // Handle both text labels (id ends with -label) and images
        const templateKey = item.id.endsWith('-label')
            ? item.id.replace('-label', '')
            : item.id;

        const memeInfo = POPULAR_MEMES[templateKey];
        if (!memeInfo) {
            return;
        }

        // Get language setting
        const lang = await read.getEnvironmentReader().getSettings().getValueById('language') || 'en';
        const t = getTranslations(lang);

        // Show help message with the template name
        await this.sendMessage(
            modify,
            sender,
            room.id,
            `${t.selectedTemplate}: \`${templateKey}\` - ${memeInfo.name}\n\n${t.usage}: \`/meme ${templateKey} "top text" "bottom text"\``
        );
    }

    public async executor(
        context: SlashCommandContext,
        read: IRead,
        modify: IModify,
        http: IHttp,
        persis: IPersistence
    ): Promise<void> {
        const args = context.getArguments();
        const sender = context.getSender();
        const room = context.getRoom();

        // Get language setting
        const lang = await read.getEnvironmentReader().getSettings().getValueById('language') || 'en';
        const t = getTranslations(lang);

        if (args.length === 0 || args[0] === 'help') {
            await this.sendHelp(modify, sender, room.id, t);
            return;
        }

        if (args[0] === 'list') {
            await this.sendMemeList(modify, sender, room.id, t);
            return;
        }

        // Parse: /meme <template> "top text" "bottom text"
        const template = args[0].toLowerCase();
        const memeInfo = POPULAR_MEMES[template];

        if (!memeInfo) {
            await this.sendMessage(
                modify,
                sender,
                room.id,
                `❌ ${t.unknownTemplate}: \`${template}\`\n\n${t.useListToSee}`
            );
            return;
        }

        // Extract quoted text
        const fullArgs = args.slice(1).join(' ');
        const texts = this.extractQuotedTexts(fullArgs);

        if (texts.length === 0) {
            await this.sendMessage(
                modify,
                sender,
                room.id,
                `❌ ${t.pleaseProvideText}\n\n${t.usage}: \`/meme ${template} "top text" "bottom text"\``
            );
            return;
        }

        // Get Imgflip credentials from settings
        const username = await read.getEnvironmentReader().getSettings().getValueById('imgflip_username');
        const password = await read.getEnvironmentReader().getSettings().getValueById('imgflip_password');

        if (!username || !password) {
            await this.sendMessage(
                modify,
                sender,
                room.id,
                `❌ ${t.credentialsNotConfigured}`
            );
            return;
        }

        // Generate the meme
        try {
            const memeUrl = await this.generateMeme(http, memeInfo.id, texts[0] || '', texts[1] || '', username, password);

            if (memeUrl) {
                // Post the meme as a message visible to everyone
                const messageBuilder = modify.getCreator().startMessage()
                    .setRoom(room)
                    .setSender(sender)
                    .setText(`**${memeInfo.name}**`)
                    .addAttachment({
                        imageUrl: memeUrl,
                        title: { value: memeInfo.name },
                    });

                await modify.getCreator().finish(messageBuilder);
            } else {
                await this.sendMessage(
                    modify,
                    sender,
                    room.id,
                    `❌ ${t.failedToGenerate}`
                );
            }
        } catch (error) {
            this.app.getLogger().error('Meme generation error:', error);
            await this.sendMessage(
                modify,
                sender,
                room.id,
                `❌ ${t.errorGenerating}`
            );
        }
    }

    private extractQuotedTexts(input: string): string[] {
        const texts: string[] = [];
        const regex = /"([^"]*)"/g;
        let match;

        while ((match = regex.exec(input)) !== null) {
            texts.push(match[1]);
        }

        // If no quoted text found, try splitting by space for simple cases
        if (texts.length === 0 && input.trim()) {
            const parts = input.trim().split(/\s+/);
            if (parts.length >= 2) {
                // Split roughly in half
                const mid = Math.ceil(parts.length / 2);
                texts.push(parts.slice(0, mid).join(' '));
                texts.push(parts.slice(mid).join(' '));
            } else {
                texts.push(input.trim());
            }
        }

        return texts;
    }

    private async generateMeme(
        http: IHttp,
        templateId: string,
        topText: string,
        bottomText: string,
        username: string,
        password: string
    ): Promise<string | null> {
        const response = await http.post('https://api.imgflip.com/caption_image', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            content: this.buildFormData({
                template_id: templateId,
                username: username,
                password: password,
                text0: topText,
                text1: bottomText,
            }),
        });

        if (response.statusCode === 200 && response.data) {
            const data = typeof response.data === 'string'
                ? JSON.parse(response.data)
                : response.data;

            if (data.success && data.data?.url) {
                return data.data.url;
            }
        }

        return null;
    }

    private buildFormData(params: { [key: string]: string }): string {
        return Object.entries(params)
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    }

    private async sendHelp(modify: IModify, sender: IUser, roomId: string, t: Translations): Promise<void> {
        const helpText = `## 🎭 ${t.helpTitle}

**${t.helpUsage}:**
\`\`\`
/meme <template> "top text" "bottom text"
/meme list
/meme help
\`\`\`

**${t.helpExamples}:**
\`\`\`
/meme drake "Using Slack" "Using Rocket.Chat"
/meme change-my-mind "Rocket.Chat is the best"
/meme everywhere "Memes." "Memes everywhere"
\`\`\`

**${t.helpPopularTemplates}:** drake, distracted, change-my-mind, everywhere, uno, always-has-been, this-is-fine, panik, stonks, trade-offer

${t.helpUseList}`;

        await this.sendMessage(modify, sender, roomId, helpText);
    }

    private async sendMemeList(modify: IModify, sender: IUser, roomId: string, t: Translations): Promise<void> {
        const memeList = Object.entries(POPULAR_MEMES)
            .map(([key, value]) => `• \`${key}\` - ${value.name}`)
            .join('\n');

        const message = `## 🎭 ${t.availableTemplates}

${memeList}

**${t.usage}:** \`/meme <template> "top text" "bottom text"\``;

        await this.sendMessage(modify, sender, roomId, message);
    }

    private async sendMessage(
        modify: IModify,
        sender: IUser,
        roomId: string,
        text: string
    ): Promise<void> {
        const messageBuilder = modify.getCreator().startMessage()
            .setRoom({ id: roomId } as any)
            .setSender(sender)
            .setText(text);

        // Send as ephemeral message (only visible to the user)
        await modify.getNotifier().notifyUser(sender, messageBuilder.getMessage());
    }
}
