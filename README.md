# Rocket.Chat Meme Generator

A Rocket.Chat App that lets you generate memes using the `/meme` slash command, similar to the Mattermost Memes Plugin.

## Features

- 🎭 **20+ Popular Meme Templates** - Drake, Distracted Boyfriend, Change My Mind, and more
- ⚡ **Simple Slash Command** - Just type `/meme template "text"`
- 🖼️ **Visual Preview** - See template thumbnails while typing
- 🌍 **Multi-language Support** - English, Svenska, Deutsch, Français, Español
- 🌐 **Powered by Imgflip API** - Always up-to-date meme templates
- 👁️ **Preview Before Posting** - Help and list commands are only visible to you

## Installation

### Quick Install

1. **Download** the latest release from [Releases](https://github.com/bamsejon/rocketchat-meme-generator/releases)

2. **Enable Apps in Rocket.Chat:**
   - Log in as administrator
   - Go to **Administration** → **Settings** → **General** → **Apps**
   - Set **Enable the App Framework** to `True`
   - Set **Enable development mode** to `True` (required for private apps)
   - Click **Save changes**

3. **Install the App:**
   - Go to **Administration** → **Apps** → **Private Apps**
   - Click **Upload App**
   - Select the downloaded `.zip` file
   - Click **Install**
   - When prompted, click **Agree** to accept permissions

4. **Configure Settings:**
   - Go to **Administration** → **Apps** → **Meme Generator** → **Settings**
   - Enter your **Imgflip Username** and **Password** (create free account at [imgflip.com](https://imgflip.com))
   - Optionally change **Language** and **Show Image Preview** settings
   - Click **Save**

## Usage

### Basic Command
```
/meme <template> "top text" "bottom text"
```

### Commands
| Command | Description |
|---------|-------------|
| `/meme help` | Show help and examples |
| `/meme list` | Show all available meme templates |
| `/meme drake "text1" "text2"` | Generate a Drake meme |

### Examples

```bash
# Drake Hotline Bling
/meme drake "Using Slack" "Using Rocket.Chat"

# Change My Mind
/meme change-my-mind "Rocket.Chat is the best"

# X, X Everywhere
/meme everywhere "Memes." "Memes everywhere"

# Distracted Boyfriend
/meme distracted "My work" "Me" "This meme plugin"

# This Is Fine
/meme this-is-fine "Everything" "is fine"
```

## Available Templates

| Template | Name |
|----------|------|
| `drake` | Drake Hotline Bling |
| `distracted` | Distracted Boyfriend |
| `change-my-mind` | Change My Mind |
| `two-buttons` | Two Buttons |
| `everywhere` | X, X Everywhere |
| `expanding-brain` | Expanding Brain |
| `is-this` | Is This a Pigeon? |
| `disaster-girl` | Disaster Girl |
| `uno` | UNO Draw 25 Cards |
| `always-has-been` | Always Has Been |
| `gru-plan` | Gru's Plan |
| `bernie` | Bernie Sanders Once Again Asking |
| `think-about-it` | Roll Safe Think About It |
| `stonks` | Stonks |
| `sad-pablo` | Sad Pablo Escobar |
| `this-is-fine` | This Is Fine |
| `waiting` | Waiting Skeleton |
| `panik` | Panik Kalm Panik |
| `buff-doge` | Buff Doge vs. Cheems |
| `trade-offer` | Trade Offer |

## Settings

| Setting | Description |
|---------|-------------|
| **Imgflip Username** | Your Imgflip account username (required) |
| **Imgflip Password** | Your Imgflip account password (required) |
| **Show Image Preview** | Show thumbnail images when typing `/meme` |
| **Language** | Language for messages (en, sv, de, fr, es) |

## Requirements

- Rocket.Chat 6.0 or newer
- Apps Framework enabled
- Administrator access for installation
- Free Imgflip account ([imgflip.com](https://imgflip.com))

## How It Works

This app uses the [Imgflip API](https://imgflip.com/api) to generate memes. When you run the `/meme` command:

1. The template name is matched to an Imgflip template ID
2. Your text is sent to the Imgflip API
3. A meme image is generated and returned
4. The image is posted to the channel

**Note:** Generated memes are hosted on Imgflip's servers and are publicly accessible via their URL.

## Troubleshooting

### "Failed to create app user" / "Misslyckades med att skapa appanvändare"

This error occurs during installation when Rocket.Chat cannot create the app's bot user (`meme-generator.bot`).

**Solutions:**

1. **Clear the Apps Framework cache:**
   - Go to **Administration** → **Apps** → Click the menu (⋮) → **Logs**
   - Look for any errors related to user creation
   - Go to **Administration** → **Settings** → **General** → **Apps**
   - Disable and re-enable the Apps Framework
   - Try installing again

2. **Check for existing bot user:**
   - Go to **Administration** → **Users**
   - Search for `meme-generator.bot`
   - If it exists, delete it and try installing again

3. **Restart Rocket.Chat:**
   ```bash
   # Docker
   docker-compose restart rocketchat

   # Systemd
   sudo systemctl restart rocketchat
   ```

4. **Check database permissions:**
   - Ensure MongoDB has proper write permissions
   - Check MongoDB logs for any errors

5. **Enable debug logging:**
   - Go to **Administration** → **Settings** → **Logs**
   - Set **Log Level** to `2 - Errors and Warnings` or higher
   - Try installing again and check the logs

**Still not working?**

Open an issue at [GitHub Issues](https://github.com/bamsejon/rocketchat-meme-generator/issues) with:
- Rocket.Chat version
- Any error messages from the logs
- Steps you've already tried

## License

MIT

## Credits

- Meme generation powered by [Imgflip](https://imgflip.com/)
- Inspired by the [Mattermost Memes Plugin](https://github.com/mattermost-community/mattermost-plugin-memes)
