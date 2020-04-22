import { Command, CommandoClient, CommandoMessage } from 'discord.js-commando';
import { timeLog, embedAuthIcon, doesXExistOnGuild } from '../../utils/functions';
import { CategoryChannel, MessageEmbed, Channel, TextChannel, GuildChannel } from 'discord.js';
import { stripIndents } from 'common-tags';
import { getInitReportChannel, getReportCategory, getSettingsForCurrentGuild, getReportMessageContent } from '../../config';

export default class Report extends Command {
    constructor(client: CommandoClient) {
        super(client, {
            name: 'report',
            group: 'misc',
            aliases: ['rep'],
            memberName: 'report',
            description: 'Initialises a report thread against a player.',
            args: [
                {
                    key: 'reason',
                    prompt: 'Please provide a short explanation of your report.',
                    type: 'string',
                    default: ''
                }
            ],
            examples: [
                `${client.commandPrefix}report I've been abused!`
            ]
        });
    }

    public run(message: CommandoMessage, { reason }: { reason: string }) {
        const reportCategory = getReportCategory(message.guild);
        if (!reportCategory) {
            timeLog('Could not find report channel category, therefore, I cannot create new report channels.');
            return undefined;
        }

        if (message.channel.id !== getInitReportChannel(message.guild).id) {
            return undefined;
        }

        const messageContent = getReportMessageContent(message.guild);

        message.guild.channels.create(`${message.author.username}-${message.author.discriminator}_report`, {
            parent: reportCategory
        }).then(channel => {
            channel.lockPermissions()
                .then(pChannel => {
                    pChannel.updateOverwrite(message.author, {
                        VIEW_CHANNEL: true
                    });
                })
                .catch(console.error);

            if (messageContent) {
                channel.send(stripIndents(messageContent));
            }

            channel.send(`<@${message.author.id}>, use this channel to communicate.`);

            this.client.emit('onReportChannelReceive', channel, message, reason);
        });

        return message.delete();
    }
}