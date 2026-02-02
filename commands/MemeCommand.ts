import {
    IHttp,
    IModify,
    IPersistence,
    IRead,
} from '@rocket.chat/apps-engine/definition/accessors';
import { ISlashCommand, SlashCommandContext } from '@rocket.chat/apps-engine/definition/slashcommands';
import { IUser } from '@rocket.chat/apps-engine/definition/users';
import { App } from '@rocket.chat/apps-engine/definition/App';

// Popular meme templates with their Imgflip IDs
const POPULAR_MEMES: { [key: string]: { id: string; name: string } } = {
    'drake': { id: '181913649', name: 'Drake Hotline Bling' },
    'distracted': { id: '112126428', name: 'Distracted Boyfriend' },
    'change-my-mind': { id: '129242436', name: 'Change My Mind' },
    'two-buttons': { id: '87743020', name: 'Two Buttons' },
    'everywhere': { id: '347390', name: 'X, X Everywhere' },
    'expanding-brain': { id: '93895088', name: 'Expanding Brain' },
    'is-this': { id: '100777631', name: 'Is This a Pigeon?' },
    'disaster-girl': { id: '97984', name: 'Disaster Girl' },
    'uno': { id: '217743513', name: 'UNO Draw 25 Cards' },
    'always-has-been': { id: '252600902', name: 'Always Has Been' },
    'gru-plan': { id: '131940431', name: "Gru's Plan" },
    'bernie': { id: '91538330', name: 'Bernie Sanders Once Again Asking' },
    'think-about-it': { id: '217743513', name: 'Roll Safe Think About It' },
    'stonks': { id: '52223451', name: 'Stonks' },
    'sad-pablo': { id: '259237855', name: 'Sad Pablo Escobar' },
    'this-is-fine': { id: '55311130', name: 'This Is Fine' },
    'waiting': { id: '61520', name: 'Waiting Skeleton' },
    'panik': { id: '226297822', name: 'Panik Kalm Panik' },
    'buff-doge': { id: '247375501', name: 'Buff Doge vs. Cheems' },
    'trade-offer': { id: '309868304', name: 'Trade Offer' },
};

export class MemeCommand implements ISlashCommand {
    public command = 'meme';
    public i18nParamsExample = 'meme_params_example';
    public i18nDescription = 'meme_description';
    public providesPreview = false;

    constructor(private readonly app: App) {}

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

        if (args.length === 0 || args[0] === 'help') {
            await this.sendHelp(modify, sender, room.id);
            return;
        }

        if (args[0] === 'list') {
            await this.sendMemeList(modify, sender, room.id);
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
                `❌ Unknown meme template: \`${template}\`\n\nUse \`/meme list\` to see available templates.`
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
                `❌ Please provide text for the meme.\n\nUsage: \`/meme ${template} "top text" "bottom text"\``
            );
            return;
        }

        // Generate the meme
        try {
            const memeUrl = await this.generateMeme(http, memeInfo.id, texts[0] || '', texts[1] || '');

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
                    '❌ Failed to generate meme. Please try again.'
                );
            }
        } catch (error) {
            this.app.getLogger().error('Meme generation error:', error);
            await this.sendMessage(
                modify,
                sender,
                room.id,
                '❌ Error generating meme. Please try again later.'
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
        bottomText: string
    ): Promise<string | null> {
        const response = await http.post('https://api.imgflip.com/caption_image', {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            content: this.buildFormData({
                template_id: templateId,
                username: 'imgflip_hubot',
                password: 'imgflip_hubot',
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

    private async sendHelp(modify: IModify, sender: IUser, roomId: string): Promise<void> {
        const helpText = `## 🎭 Meme Generator

**Usage:**
\`\`\`
/meme <template> "top text" "bottom text"
/meme list                    - Show available templates
/meme help                    - Show this help
\`\`\`

**Examples:**
\`\`\`
/meme drake "Using Slack" "Using Rocket.Chat"
/meme change-my-mind "Rocket.Chat is the best"
/meme everywhere "Memes." "Memes everywhere"
/meme distracted "My work" "Me" "New meme plugin"
\`\`\`

**Popular templates:** drake, distracted, change-my-mind, everywhere, uno, always-has-been, this-is-fine, panik, stonks, trade-offer

Use \`/meme list\` for the full list!`;

        await this.sendMessage(modify, sender, roomId, helpText);
    }

    private async sendMemeList(modify: IModify, sender: IUser, roomId: string): Promise<void> {
        const memeList = Object.entries(POPULAR_MEMES)
            .map(([key, value]) => `• \`${key}\` - ${value.name}`)
            .join('\n');

        const message = `## 🎭 Available Meme Templates

${memeList}

**Usage:** \`/meme <template> "top text" "bottom text"\``;

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
